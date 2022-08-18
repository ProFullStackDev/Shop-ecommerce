import { Location } from '@angular/common'; //路由返回
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AddressService } from '@core/services/user/address.service';
import { BillService } from '@core/services/user/bill.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { BILL_STATUS } from '@shared/pipes/dict/bill.dict';
import { NzMessageService } from 'ng-zorro-antd/message';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-increase-list',
  templateUrl: './increase-list.component.html',
  styleUrls: ['./increase-list.component.less']
})
export class IncreaseListComponent extends DestroySubscription implements OnInit {
  constructor(
    private billService: BillService,
    private addressService: AddressService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
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
  areaDetails: any[] = []; //标识省市区层级：AreaDetails.length：1 2 3
  provinceBoolean: boolean = true;
  showCityBoolean: boolean = false;
  showRegionBoolean: boolean = false;
  detailBoolean: boolean = false;
  editId: string = '';
  id: string = '';
  isVisible: boolean = false;
  updateBoolean: boolean = false;
  billStatus = BILL_STATUS;

  @ViewChild('editCompoent') editCom: any;
  form: any = {
    type: 0,
    // 地区
    areaId: '',
    provinceName: '',
    provinceNameLabel: '',
    cityName: '',
    cityNameLabel: '',
    regionName: '',
    regionNameLabel: ''
  };
  ngOnInit(): void {
    // 详情列表
    this.getList();
    this.validateForm = this.fb.group({
      reviewStatus: [0],
      title: ['', [Validators.required]],
      name: ['', [Validators.required]],
      bankAccount: ['', [Validators.required]],
      bankName: ['', [Validators.required]],
      registeredAddress: ['', [Validators.required]],
      registeredPhone: ['', [Validators.required]],
      vatRegistrationNumber: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      areaId: ['', [Validators.required]]
    });
  }
  getList() {
    const params = {}; //可不传参数
    this.billService
      .getUserVatFapiao(params)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(res => {
        if (res) {
          this.id = res.id;
          this.areaDetails = res.areaDetails;
          this.validateForm.patchValue({
            ...res
          });
          this.detailBoolean = true;
        } else {
          this.validateForm.reset(); //清空表单
        }
      });
  }
  submitComponent() {
    this.editCom.submit();
  }
  validate(): void {
    const formData = this.validateForm.value;
    if (this.validateForm.valid) {
      // 校验通过
      if (!this.updateBoolean) {
        this.billService
          .saveUserVatFapiao(formData)
          .pipe(takeUntil(this.destroyStream$))
          .subscribe(
            () => {
              this.message.success('新增成功');
              this.getList();
              this.detailBoolean = true;
            },
            error => {
              this.message.error(error.message);
            }
          )
          .add(() => {});
      } else {
        formData.id = this.id;
        console.log(formData);
        this.billService
          .updateUserVatFapiao(formData)
          .pipe(takeUntil(this.destroyStream$))
          .subscribe(
            () => {
              this.message.success('修改成功');
              this.getList();
              this.detailBoolean = true;
            },
            error => {
              this.message.error(error.message);
            }
          )
          .add(() => {});
      }
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  provinceSelected(id: string) {
    // console.log('id', id);
  }
  citySelected(id: string) {}
  regionSelected(id: string) {}
  submitSuccess(id: boolean) {}
  updateBtn() {
    this.detailBoolean = false;
    this.updateBoolean = true;
  }
  deleteBtn() {
    this.isVisible = true;
  }
  handleOk(): void {
    const params = {
      id: this.id
    };
    this.billService
      .delUserVatFapiao(params)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(res => {
        this.message.success('删除成功');
        this.isVisible = false;
        this.detailBoolean = false;

        this.validateForm.reset(); //清空表单
        this.areaDetails = [];
      });
  }
  handleCancel(): void {
    this.isVisible = false;
  }

  goBack() {
    this.location.back();
  }
}
