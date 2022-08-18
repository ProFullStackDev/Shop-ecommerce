import { Location } from '@angular/common'; //路由返回
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AddressService } from '@core/services/user/address.service';
import { BillService, BillType, BillContentType } from '@core/services/user/bill.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { BILL_HEADER_TYPE, BILL_TYPE, BILL_CONTENT_TYPE } from '@shared/pipes/dict/bill.dict';
import { NzMessageService } from 'ng-zorro-antd/message';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.less']
})
export class InvoiceEditComponent extends DestroySubscription implements OnInit {
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
  areaDetails: any[] = []; //标识省市区层级：areaDetails.length：1 2 3
  provinceBoolean: boolean = true;
  showCityBoolean: boolean = false;
  showRegionBoolean: boolean = false;
  billType = BILL_TYPE;
  billHeaderType = BILL_HEADER_TYPE;
  billContentType = BILL_CONTENT_TYPE;
  id: string = '';
  type: number = 0; //发票类型
  contentType: number = 0; //发票内容
  vatRegistrationNumberType: number = 0; //抬头类型
  form: any = {
    dTYPE: 'VatSpecialFapiaoTitle',
    type: this.type, //发票类型
    contentType: this.contentType, //发票内容
    vatRegistrationNumberType: this.vatRegistrationNumberType, //抬头类型
    // 抬头信息
    title: '',
    registeredAddress: '',
    registeredPhone: '',
    vatRegistrationNumber: '',
    bankAccount: '',
    bankName: '',
    //收票信息
    billingAccountName: '',
    billingAccountPhone: '',
    billingAccountEmail: '',
    billingAccountAddress: '',
    // 地区
    areaName: '',
    provinceName: '',
    provinceNameLabel: '',
    cityName: '',
    cityNameLabel: '',
    regionName: '',
    regionNameLabel: ''
  };
  hasVat: boolean = false;
  vatInfo: any = {};
  normalInfo: any = {};
  headerList: any = [];
  normalHeaderList: any = [];
  incorporatedheaderList: any = [];

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      id: this.id,
      type: this.type,
      dTYPE: 'VatSpecialFapiaoTitle',
      vatRegistrationNumberType: this.vatRegistrationNumberType,
      contentType: this.contentType,
      // 抬头信息
      title: [null, [Validators.required]],
      registeredAddress: null,
      registeredPhone: null,
      vatRegistrationNumber: null,
      bankAccount: null,
      bankName: null,

      // 收票信息
      billingAccountName: [null, [Validators.required]],
      billingAccountPhone: [null, [Validators.required]],
      billingAccountEmail: null,
      billingAccountAddress: [null, [Validators.required]],
      billingAccountAreaName: [null, [Validators.required]]
    });
    this.activatedRoute.queryParams.pipe(takeUntil(this.destroyStream$)).subscribe(query => {
      this.id = query.id;
    });
    this.getVatBill();
    this.getHeaderList();
  }
  getVatBill() {
    const params = {};
    this.billService
      .getUserVatFapiao(params)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(res => {
        if (res) {
          this.hasVat = true;
          this.vatInfo = res;
        } else {
          this.hasVat = false;
        }
      });
  }
  getDetail(): void {
    const params = {
      id: this.id
    };
    this.billService.getUserFapiaoDetails(params).subscribe(res => {
      this.form = res;
      this.normalInfo = res;
      this.areaDetails = res.areaDetails;
      // 区分个人和单位
      if (res.vatRegistrationNumber) {
        this.vatRegistrationNumberType = 1;
      } else {
        this.vatRegistrationNumberType = 0;
      }
    });
  }
  validate(): void {
    if (this.validateForm.valid) {
      this.submit();
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  submit(): void {
    const formData = this.validateForm.value;
    formData.id = this.id;
    formData.billingAccountAreaName =
      this.editComform.provinceNameLabel + this.editComform.cityNameLabel + this.editComform.regionNameLabel;
    this.billService
      .updateUserFapiao(formData)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        () => {
          this.message.success('编辑成功');
          setTimeout(() => {
            this.router.navigateByUrl('/member/invoice/list');
          }, 1000);
        },
        error => {
          this.message.error(error.message);
        }
      )
      .add(() => {});
  }
  typeChange(type: number): void {
    this.form.type = type;
    if (type == BillType.VAT_NORMAL_Bill) {
      //普通发票
      this.getDetail();
    } else {
      //专用发票
      if (this.hasVat) {
        this.form.contentType = BillContentType.PRODUCT_DETAIL;
        this.validateForm.patchValue({
          title: this.vatInfo.title,
          vatRegistrationNumber: this.vatInfo.vatRegistrationNumber,
          registeredAddress: this.vatInfo.registeredAddress,
          registeredPhone: this.vatInfo.registeredPhone,
          bankName: this.vatInfo.bankName,
          bankAccount: this.vatInfo.bankAccount
        });
        this.form.billingAccountName = this.vatInfo.name;
        this.form.billingAccountPhone = this.vatInfo.phone;
        this.form.billingAccountAddress = this.vatInfo.address;
        this.areaDetails = this.vatInfo.areaDetails;
      } else {
        this.validateForm.patchValue({
          title: this.normalInfo.title,
          vatRegistrationNumber: this.normalInfo.vatRegistrationNumber,
          registeredAddress: this.normalInfo.registeredAddress,
          registeredPhone: this.normalInfo.registeredPhone,
          bankName: this.normalInfo.bankName,
          bankAccount: this.normalInfo.bankAccount
        });
      }
    }
  }
  contentTypeChange(type: number): void {
    this.form.contentType = type;
  }
  vatRegistrationNumberTypeChange(type: number): void {
    this.vatRegistrationNumberType = type;
    if (this.vatRegistrationNumberType == 0) {
      this.headerList = this.normalHeaderList;
      this.validateForm.setControl('vatRegistrationNumber', new FormControl(null));
    } else {
      this.headerList = this.incorporatedheaderList;
      this.validateForm.setControl('vatRegistrationNumber', new FormControl(null, [Validators.required]));
    }
  }
  submitSuccess(form: any) {
    this.editComform = form;
  }
  @ViewChild('editCompoent') editCom: any;
  editComform: any = {
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
  submitComponent() {
    this.editCom.submit();
  }
  goBack() {
    this.location.back();
  }
  getHeaderList(): void {
    const params = {
      page: 0,
      rows: 300
    };
    this.billService
      .getFapiaoTitle(params)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(res => {
        res.rows.forEach((item: any) => {
          if (Object.is(item.type, 0)) {
            //个人
            this.normalHeaderList.push(item);
          } else {
            //单位
            this.incorporatedheaderList.push(item);
          }
        });
      });
  }
  checkHeader(key: number) {
    let headerInfo = this.headerList[key];
    this.validateForm.patchValue({
      title: headerInfo.title,
      vatRegistrationNumber: headerInfo.vatRegistrationNumber,
      registeredAddress: headerInfo.registeredAddress,
      registeredPhone: headerInfo.registeredPhone,
      bankName: headerInfo.bankName,
      bankAccount: headerInfo.bankAccount
    });
  }
}
