import { Component, EventEmitter, forwardRef, Input, OnInit, Output, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AddressService } from '@core/services/user/address.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { OnChangeType } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-address-select',
  templateUrl: './address-select.component.html',
  styleUrls: ['./address-select.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressSelectComponent),
      multi: true
    }
  ]
})
export class AddressSelectComponent extends DestroySubscription implements OnInit, ControlValueAccessor, OnChanges {
  onTouched: any;
  constructor(
    private addressService: AddressService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }

  // form model 的值同步到 component 内部
  writeValue(obj: any): void {
    this.areaId = obj;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  registerOnChange(fn: OnChangeType): void {
    this.onChange = fn;
  }
  onChange: OnChangeType = () => {};

  validateForm!: FormGroup;
  nzOptions: any[] | null = null;
  values: any[] | null = null;
  ProvinceList: any[] = []; //省
  ProvinceData: any[] = [];
  cityList: any[] = []; //市
  cityData: any[] = [];
  regionList: any[] = []; //区
  regionData: any[] = [];
  cityBoolean: boolean = false;
  regionBoolean: boolean = false;
  provinceDisabled: boolean = false;
  form: any = {
    areaId: '',
    provinceName: '',
    cityName: '',
    regionName: ''
  };

  @Input()
  id: string = '';
  @Input()
  areaId: string = '';
  @Input()
  areaDetails: any = [];
  @Output() readonly submitStart = new EventEmitter();
  @Output() readonly submitSuccess = new EventEmitter<boolean>();
  @Output() readonly submitFail = new EventEmitter();
  @Output() readonly submitFinally = new EventEmitter();
  @Output() readonly provinceSelected = new EventEmitter<string>();
  @Output() readonly citySelected = new EventEmitter<string>();
  @Output() readonly regionSelected = new EventEmitter<string>();

  ngOnInit(): void {
    this.getAreaDataProvinceList();
    this.validateForm = this.fb.group({
      areaId: ['', [Validators.required]],
      provinceName: ['', [Validators.required]],
      provinceNameLabel: '',
      cityName: ['', [Validators.required]],
      cityNameLabel: '',
      regionName: ['', [Validators.required]],
      regionNameLabel: ''
    });
  }
  ngOnChanges() {
    this.getDetail();
    if (this.areaDetails.length == 0) {
      this.form.provinceName = '';
      this.form.provinceNameLabel = '';
      this.form.cityName = '';
      this.form.regionName = '';
    }
  }
  getDetail(): void {
    if (this.areaDetails.length == 0) {
      // 清空数据
      this.validateForm = this.fb.group({
        areaId: ['', [Validators.required]],
        provinceName: ['', [Validators.required]],
        provinceNameLabel: '',
        cityName: ['', [Validators.required]],
        cityNameLabel: '',
        regionName: ['', [Validators.required]],
        regionNameLabel: ''
      });
      this.cityData = [];
      this.regionData = [];
    }
    if (this.areaDetails.length == 1) {
      this.regionBoolean = false;
      this.validateForm.patchValue({
        areaId: this.areaDetails[0].value,
        provinceName: this.areaDetails[0].value,
        provinceNameLabel: this.areaDetails[0].label
      });
    }
    if (this.areaDetails.length == 2) {
      this.regionBoolean = false;
      this.validateForm.patchValue({
        areaId: this.areaDetails[1].value,
        provinceName: this.areaDetails[0].value,
        provinceNameLabel: this.areaDetails[0].label,
        cityName: this.areaDetails[1].value,
        cityNameLabel: this.areaDetails[1].label
      });
    }
    if (this.areaDetails.length == 3) {
      this.regionBoolean = true;
      this.validateForm.patchValue({
        areaId: this.areaDetails[2].value,
        provinceName: this.areaDetails[0].value,
        provinceNameLabel: this.areaDetails[0].label,
        cityName: this.areaDetails[1].value,
        cityNameLabel: this.areaDetails[1].label,
        regionName: this.areaDetails[2].value,
        regionNameLabel: this.areaDetails[2].label
      });
    }
    this.form = this.validateForm.value;
    this.submitSuccess.emit(this.form);
    // 有省份
    if (this.areaDetails.length > 0) {
      const params = {
        parentId: this.areaDetails[0].value
      };
      // 获取城市下拉
      this.addressService.getAreaData(params).subscribe(res => {
        this.cityList = res;
        this.cityList.map(item => {
          const obj: any = {};
          obj.label = item.name;
          obj.value = Number(item.id);
          this.cityData.push(obj);
        });
      });
    }
    // 有城市
    if (this.areaDetails.length > 1) {
      this.regionBoolean = true;
      const params = {
        parentId: this.areaDetails[1].value
      };
      // 获取区域下拉
      this.addressService.getAreaData(params).subscribe(res => {
        this.regionList = res;
        this.regionList.map(item => {
          const obj: any = {};
          obj.label = item.name;
          obj.value = Number(item.id);
          this.regionData.push(obj);
        });
      });
    }
  }
  // 获取省份
  getAreaDataProvinceList() {
    this.ProvinceData = [];
    const params = {
      parentId: ''
    };
    // console.log('获取省份res', res);
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
    this.regionList = [];
    //console.log('this.regionData', this.regionData);
    //console.log('this.regionList', this.regionList);

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
    this.form.areaId = value;
    this.form.provinceName = value;
    this.ProvinceData.find(item => {
      if (item.value === value) {
        this.form.provinceNameLabel = item.label;
      }
    });
    // 清空城市、区域
    // 清空、区域
    this.validateForm.patchValue({
      regionName: '',
      regionNameLabel: '',
      cityName: '',
      cityNameLabel: ''
    });
    this.form.regionName = '';
    this.form.regionNameLabel = '';
    this.form.cityName = '';
    this.form.cityNameLabel = '';
    this.onChange(value.toString());
    this.submitSuccess.emit(this.form);
  }
  // 市改变
  cityChange(value: string): void {
    this.regionData = [];
    this.regionBoolean = true;
    const params = {
      parentId: value
    };
    if (this.validateForm.value.cityName) {
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
    this.form.areaId = value;
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

    this.validateForm.value.areaId = value;
    this.onChange(value.toString());
    this.citySelected.emit(this.validateForm.value.areaId);
    this.submitSuccess.emit(this.form);
  }
  // 区改变
  regionChange(value: string): void {
    this.form.areaId = value;
    this.form.regionName = value;
    this.regionData.find(item => {
      if (item.value === value) {
        this.form.regionNameLabel = item.label;
      }
    });
    this.onChange(value.toString());
    this.regionSelected.emit(this.validateForm.value.areaId);
    this.submitSuccess.emit(this.form);
  }
}
