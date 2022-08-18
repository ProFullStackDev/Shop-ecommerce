import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AddressService } from '@core/services/user/address.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { NzMessageService } from 'ng-zorro-antd/message';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.less']
})
export class AddressFormComponent extends DestroySubscription implements OnInit {
  constructor(
    private addressService: AddressService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }
  validateForm!: FormGroup;
  nzOptions: any[] | null = null;
  values: any[] | null = null;
  ProvinceList: any[] = []; //省
  ProvinceData: any[] = [];
  cityList: any[] = []; //市
  cityData: any[] = [];
  regionList: any[] = []; //区
  regionData: any[] = [];
  areaDetails: any[] = []; //标识省市区层级：areaDetails.length：1 2 3
  cityBoolean: boolean = false;
  regionBoolean: boolean = false;
  form: any = {
    areaId: '',
    provinceName: '',
    provinceNameLabel: '',
    cityName: '',
    cityNameLabel: '',
    regionName: '',
    regionNameLabel: ''
  };

  @Input()
  id: any;
  @Output() readonly submitStart = new EventEmitter();
  @Output() readonly submitSuccess = new EventEmitter<boolean>();
  @Output() readonly submitFail = new EventEmitter();
  @Output() readonly submitFinally = new EventEmitter();
  run(val: string) {}
  ngOnInit(): void {
    this.getAreaDataProvinceList();
    this.validateForm = this.fb.group({
      consignee: ['', [Validators.required]],
      address: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      phone: ['', [this.phoneValidator]],
      isDefault: [false],
      areaId: [''],
      provinceName: ['', [Validators.required]],
      cityName: [''],
      regionName: ['']
    });
    if (this.id) {
      this.getDetail();
    }
  }

  getDetail(): void {
    const params = {
      id: this.id
    };
    this.addressService
      .getReceiverAddressDetails(params)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(res => {
        this.form = res;
        const { areaDetails } = res;
        this.areaDetails = areaDetails;
        if (areaDetails.length == 1) {
          this.validateForm.patchValue({
            ...res,
            provinceName: areaDetails[0].value,
            provinceNameLabel: areaDetails[0].label
          });
          this.form.areaId = areaDetails[0].value;
        }
        if (areaDetails.length == 2) {
          this.validateForm.patchValue({
            ...res,
            provinceName: areaDetails[0].value,
            provinceNameLabel: areaDetails[0].label,
            cityName: areaDetails[1].value,
            cityNameLabel: areaDetails[1].label
          });
          this.form.areaId = areaDetails[1].value;
        }
        if (areaDetails.length == 3) {
          this.validateForm.patchValue({
            ...res,
            provinceName: areaDetails[0].value,
            provinceNameLabel: areaDetails[0].label,
            cityName: areaDetails[1].value,
            cityNameLabel: areaDetails[1].label,
            regionName: areaDetails[2].value,
            regionNameLabel: areaDetails[2].label
          });
          this.form.areaId = areaDetails[2].value;
        }
        // 有省份
        if (res.provinceName) {
          const params = {
            parentId: areaDetails[0].value
          };
          // 获取城市下拉
          this.addressService
            .getAreaData(params)
            .pipe(takeUntil(this.destroyStream$))
            .subscribe(res => {
              this.cityList = res;
              this.cityList.map(item => {
                const obj: any = {};
                obj.label = item.name;
                obj.value = Number(item.id);
                this.cityData.push(obj);
              });
            });
          // this.form.areaId = this.validateForm.value.areaId;
        }
        // 有城市
        if (areaDetails.length == 3) {
          const params = {
            parentId: areaDetails[1].value
          };
          // 获取区域下拉
          this.addressService
            .getAreaData(params)
            .pipe(takeUntil(this.destroyStream$))
            .subscribe(res => {
              this.regionList = res;
              this.regionList.map(item => {
                const obj: any = {};
                obj.label = item.name;
                obj.value = Number(item.id);
                this.regionData.push(obj);
              });
            });
        }
        // this.form.areaId = this.validateForm.value.areaId;
      });
  }
  // 获取省份
  getAreaDataProvinceList() {
    this.ProvinceData = [];
    const params = {
      parentId: ''
    };
    this.addressService
      .getAreaData(params)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(res => {
        this.ProvinceList = res;
        this.ProvinceList.map(item => {
          const obj: any = {};
          obj.label = item.name;
          obj.value = Number(item.id);
          this.ProvinceData.push(obj);
        });
      });
  }
  // 省份改变
  provinceChange(value: string): void {
    this.cityData = [];
    this.regionData = [];
    const params = {
      parentId: value
    };
    if (this.validateForm.value.provinceName) {
      this.addressService
        .getAreaData(params)
        .pipe(takeUntil(this.destroyStream$))
        .subscribe(res => {
          this.cityList = res;
          this.cityList.map(item => {
            const obj: any = {};
            obj.label = item.name;
            obj.value = Number(item.id);
            this.cityData.push(obj);
          });
        });
    }
    this.form.provinceName = value;
    this.ProvinceData.find(item => {
      if (item.value === value) {
        this.form.provinceNameLabel = item.label;
      }
    });
    // 清空城市、区域
    this.validateForm.patchValue({
      cityName: '',
      cityNameLabel: '',
      regionName: '',
      regionNameLabel: ''
    });
    this.form.cityName = '';
    this.form.cityNameLabel = '';
    this.form.regionName = '';
    this.form.regionNameLabel = '';
    this.form.areaId = value.toString();
  }
  // 市改变
  cityChange(value: string): void {
    this.regionData = [];
    const params = {
      parentId: value
    };
    if (this.validateForm.value.cityName && value) {
      this.addressService
        .getAreaData(params)
        .pipe(takeUntil(this.destroyStream$))
        .subscribe(res => {
          this.regionList = res;
          this.regionList.map(item => {
            const obj: any = {};
            obj.label = item.name;
            obj.value = Number(item.id);
            this.regionData.push(obj);
          });
        });
    }
    this.form.cityName = value;
    this.cityData.find(item => {
      if (item.value === value) {
        this.form.cityNameLabel = item.label;
      }
    });
    // 清空、区域
    this.validateForm.patchValue({
      regionName: '',
      regionNameLabel: ''
    });
    this.form.regionName = '';
    this.form.regionNameLabel = '';

    this.form.areaId = value.toString();
  }
  // 区改变
  regionChange(value: string): void {
    this.form.regionName = value;
    this.regionData.find(item => {
      if (item.value === value) {
        this.form.regionNameLabel = item.label;
      }
    });
    this.form.areaId = value.toString();
  }
  // 手机校验
  phoneValidator = (control: FormControl): ValidationErrors => {
    if (!control.value) {
      return { required: true };
    } else if (!/^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(control.value)) {
      return { error: true };
    }
    return {};
  };
  submit(): void {
    const formData = this.validateForm.value;
    formData.areaId = this.form.areaId.toString();
    delete formData.provinceName;
    delete formData.cityName;
    delete formData.regionName;

    this.submitStart.emit();

    if (this.validateForm.valid) {
      if (this.id) {
        formData.id = this.id;
        this.addressService
          .updateReceiverAddress(formData)
          .pipe(takeUntil(this.destroyStream$))
          .subscribe(
            () => {
              this.submitSuccess.emit(!this.id);
            },
            error => {
              this.message.error(error.message);
              this.submitFail.emit();
            }
          )
          .add(() => {
            this.submitFinally.emit();
          });
      } else {
        this.addressService
          .saveReceiverAddress(formData)
          .pipe(takeUntil(this.destroyStream$))
          .subscribe(
            () => {
              this.submitSuccess.emit(true);
            },
            error => {
              this.message.error(error.message);
              this.submitFail.emit();
            }
          )
          .add(() => {
            this.submitFinally.emit();
          });
      }
    } else {
      this.submitFinally.emit();
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
