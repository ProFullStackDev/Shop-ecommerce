import { Location } from '@angular/common'; //路由返回
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AfterSalesQueryParams,
  AftersalesService,
  AfterSalesGuaranteeParams,
  AfterSalesGuaranteePOM,
  AfterSalesDetailsItem,
  AfterSalesDetailsPOM,
  AftersalesType,
  AfterSalesItem,
  AftersalesMethod,
  AftersalesStatus
} from '@core/services/user/aftersales.service';
import { FileService } from '@core/services/user/file.service';
import { OrderItems, UserOrderService, OrderStatus } from '@core/services/user/order.service';
import { environment } from '@environments/environment';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { DictKey, DictPipe } from '@shared/pipes/dict/dict.pipe';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile, NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { forkJoin, Observable, filter, startWith, take, takeUntil, map, EMPTY } from 'rxjs';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

@Component({
  selector: 'app-apply-aftersales',
  templateUrl: './aftersales-apply.component.html',
  styleUrls: ['./aftersales-apply.component.less'],
  providers: [DictPipe, UserOrderService]
})
export class AftersalesApplyComponent extends DestroySubscription implements OnInit {
  constructor(
    private aftersalesService: AftersalesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private message: NzMessageService,
    private dict: DictPipe,
    private userOrderService: UserOrderService,
    private location: Location,
    private fileService: FileService
  ) {
    super();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(takeUntil(this.destroyStream$)).subscribe(params => {
      this.tabIndex = params.type || 0;
      this.storeId = params.storeId || '1';
      this.orderId = params.orderId;
      this.orderSn = params.orderSn;
      this.guaranteeParams = { orderId: this.orderId, storeId: this.storeId };
      this.getDetails();
    });
  }

  tableSpan = {
    product: 9,
    checkBox: 2,
    number: 4,
    price: 3,
    type: 3,
    status: 4,
    operation: 4
  };
  loading = { submit: false, table: false };
  orderId: string = '';
  orderSn: string = '';
  DictKey = DictKey;
  queryParams: AfterSalesQueryParams;
  guaranteeParams: AfterSalesGuaranteeParams;
  guaranteePom: AfterSalesGuaranteePOM;
  orderItems: OrderItems[] = [];
  afterSalesDetails: AfterSalesDetailsPOM[] = [];
  afterSalesDetailsItem: AfterSalesDetailsItem[] = [];
  detailsItem: AfterSalesDetailsItem[] = [];
  validateForm = this.fb.group({
    reason: [null, Validators.required],
    consignee: [null],
    areaId: [null],
    address: [null],
    phone: [null],
    method: [0, [Validators.required]],
    bank: [null],
    account: [null]
  });
  tips: any = '';
  tabIndex = 0;
  isCheckAll = false;
  isAllDisabled = true;
  isTimeOut = false;
  aftersalesType = [
    this.dict.transform(AftersalesType.REPLACE, DictKey.AFTERSALES_TYPE, 'label'),
    this.dict.transform(AftersalesType.RETURNS, DictKey.AFTERSALES_TYPE, 'label'),
    this.dict.transform(AftersalesType.REFUND, DictKey.AFTERSALES_TYPE, 'label')
  ];
  AftersalesStatus: AftersalesStatus;
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
  storeId = '1';
  afterSalesItems: AfterSalesItem[] = [];
  refundAmount = 0;
  afterSalesType = AftersalesType.REPLACE;
  aftersalesMethod = [
    { label: this.dict.transform(AftersalesMethod.ORIGIN, DictKey.AFTERSALES_METHOD, 'label'), value: AftersalesMethod.ORIGIN },
    { label: this.dict.transform(AftersalesMethod.ONLINE, DictKey.AFTERSALES_METHOD, 'label'), value: AftersalesMethod.ONLINE },
    { label: this.dict.transform(AftersalesMethod.OFFLINE, DictKey.AFTERSALES_METHOD, 'label'), value: AftersalesMethod.OFFLINE },
    { label: this.dict.transform(AftersalesMethod.DEPOSIT, DictKey.AFTERSALES_METHOD, 'label'), value: AftersalesMethod.DEPOSIT }
  ];
  isShow = false;
  fileList: NzUploadFile[] = [];
  file: NzUploadFile;
  previewImage: string | undefined = '';
  previewVisible = false;
  isVisible = false;
  showAddress = true;
  orderDetailIndex = 0;
  isRefund = false;

  showModal(index: number): void {
    this.orderDetailIndex = index;
    this.fileList = [];
    let file: NzUploadFile;
    let i = 0;
    this.orderItems[index].orderItem.images.forEach(item => {
      i++;
      file = { uid: `${i}`, name: '', url: item };
      this.fileList.push(file);
    });
    this.isVisible = true;
  }

  handleCancel() {
    this.fileList = [];
    this.isVisible = false;
  }

  handleOk() {
    if (this.fileList.length > 0) {
      this.fileList.forEach(item => {
        this.orderItems[this.orderDetailIndex].orderItem.images.push(item.url);
      });
    } else {
      this.orderItems[this.orderDetailIndex].orderItem.images = [];
    }
    this.isVisible = false;
  }

  get uploadAction() {
    return `${environment.api.baseUrl}/shop/storage/fileStore`;
  }

  uploadChange(info: NzUploadChangeParam): void {
    if (info.file.status === 'done') {
      this.message.success('上传成功');
      this.fileList.filter(item => Object.is(item.uid, info.file.uid))[0].url = info.file.response[0];
    } else if (info.file.status === 'error') {
      this.message.error('上传失败');
    }
  }

  removeFile = (file: NzUploadFile) => {
    const index = this.fileList.findIndex(item => Object.is(item.uid, file.uid));
    this.fileList.splice(index, 1);
    return index != -1 ? true : false;
  };

  uploadData = () => {
    return { dir: 'aftersales' };
  };

  handlePreview = async (file: NzUploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };

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

  submitComponent() {
    this.editCom.submit();
  }

  methodChange(val: number) {
    if (Object.is(2, val)) {
      this.isShow = true;
      this.validateForm.setControl('bank', new FormControl(null, [Validators.required]));
      this.validateForm.setControl('account', new FormControl(null, [Validators.required]));
    } else {
      this.isShow = false;
      this.validateForm.setControl('bank', new FormControl(null));
      this.validateForm.setControl('account', new FormControl(null));
    }
  }

  provinceSelected(id: string) {
    // console.log('id', id);
  }
  citySelected(id: string) {}
  regionSelected(id: string) {}
  submitSuccess(id: boolean) {}

  tabIndexChange(index: number) {
    switch (index) {
      case 0:
        this.afterSalesType = AftersalesType.REPLACE;
        // this.isTimeOut = !this.guaranteePom.afterSalesReplacement;
        this.validateForm.setControl('areaId', new FormControl(null, [Validators.required]));
        this.validateForm.setControl('address', new FormControl(null, [Validators.required]));
        this.validateForm.setControl('consignee', new FormControl(null, [Validators.required]));
        this.validateForm.setControl('phone', new FormControl(null, [Validators.required]));
        this.showAddress = true;
        break;
      case 1:
        this.afterSalesType = AftersalesType.RETURNS;
        // this.isTimeOut = !this.guaranteePom.afterSalesReturns;
        this.validateForm.setControl('areaId', new FormControl(null, [Validators.required]));
        this.validateForm.setControl('address', new FormControl(null, [Validators.required]));
        this.validateForm.setControl('consignee', new FormControl(null, [Validators.required]));
        this.validateForm.setControl('phone', new FormControl(null, [Validators.required]));
        this.showAddress = true;
        break;
      default:
        this.afterSalesType = AftersalesType.REFUND;
        // this.isTimeOut = !this.guaranteePom.afterSalesRepair;
        this.validateForm.setControl('areaId', new FormControl(null));
        this.validateForm.setControl('address', new FormControl(null));
        this.validateForm.setControl('consignee', new FormControl(null));
        this.validateForm.setControl('phone', new FormControl(null));
        this.showAddress = false;
        break;
    }
  }
  checkAllChange() {
    this.orderItems.forEach(item => {
      if (!item.disabled) {
        if (this.isCheckAll) {
          item.applyCheck = true;
        } else {
          item.applyCheck = false;
        }
      }
    });
  }
  get contentHTML(): SafeHtml {
    switch (this.tabIndex) {
      case 0:
        this.tips = this.guaranteePom?.replacementTips || '';
        break;
      case 1:
        this.tips = this.guaranteePom?.returnsTips || '';
        break;
      default:
        this.tips = this.guaranteePom?.refundTips || '';
        break;
    }
    return this.sanitizer.bypassSecurityTrustHtml(this.tips);
  }

  validate(): void {
    if (this.validateForm.valid) {
      this.afterSalesItems = [];
      this.refundAmount = 0;
      this.orderItems.forEach(item => {
        if (!item.disabled && item.applyCheck) {
          this.refundAmount += item.applyQuantity * item.orderItem.price;
          this.afterSalesItems.push({
            quantity: item.applyQuantity,
            orderItemId: item.orderItem.id.toString(),
            images: item.orderItem.images
          });
        }
      });
      if (this.afterSalesItems.length === 0) {
        this.message.warning('请勾选商品！');
        return;
      }
      for (let index = 0; index < this.afterSalesItems.length; index++) {
        if (this.afterSalesItems[index].images.length == 0) {
          this.message.warning('请上传已勾选商品的凭证！');
          return;
        }
      }
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
    this.loading.submit = true;
    const formData = this.validateForm.value;
    let parmas = {
      ...formData,
      storeId: this.storeId,
      orderSn: this.orderSn,
      afterSalesType: this.afterSalesType,
      refundAmount: this.refundAmount,
      afterSalesItem: this.afterSalesItems
    };
    this.aftersalesService
      .saveAfterSales(parmas)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        () => {
          this.message.success('申请成功');
          setTimeout(() => {
            this.router.navigateByUrl('/member/aftersales/list');
          }, 800);
        },
        error => {
          this.message.error(error.message);
        }
      )
      .add(() => {
        this.loading.submit = false;
      });
  }

  getDetails() {
    this.loading.table = true;
    forkJoin([
      this.userOrderService.getOrderDetails(this.orderId),
      this.aftersalesService.getAfterSalesList({ page: 0, rows: 300, orderSn: this.orderSn }),
      this.aftersalesService.getAfterSalesGuarantee({
        ...this.guaranteeParams
      })
    ])
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        ([orders, aftersales, guarantee]) => {
          this.guaranteePom = guarantee;
          switch (this.tabIndex) {
            case 0:
              this.afterSalesType = AftersalesType.REPLACE;
              // this.isTimeOut = !this.guaranteePom.afterSalesReplacement;
              break;
            case 1:
              this.afterSalesType = AftersalesType.RETURNS;
              // this.isTimeOut = !this.guaranteePom.afterSalesReturns;
              break;
            default:
              this.afterSalesType = AftersalesType.REFUND;
              // this.isTimeOut = !this.guaranteePom.afterSalesRepair;
              break;
          }
          this.afterSalesDetails = aftersales.rows;
          //合并相同的商品
          this.afterSalesDetails.forEach(item => {
            if ([AftersalesStatus.APPROVED, AftersalesStatus.COMPLETED, AftersalesStatus.PENDING].includes(item.afterSales.status)) {
              item.afterSalesDetailsItem.forEach(deatilItem => {
                deatilItem.status = item.afterSales.status;
                deatilItem.type = item.afterSales.dtype;
                deatilItem.id = item.afterSales.id;
                this.detailsItem.push(deatilItem);
                let isExist = false;
                this.afterSalesDetailsItem.forEach(dItem => {
                  if (Object.is(`${deatilItem.orderItemId}`, `${dItem.orderItemId}`)) {
                    isExist = true;
                    dItem.afterSalesItem.quantity += deatilItem.afterSalesItem.quantity;
                  }
                });
                if (!isExist) {
                  this.afterSalesDetailsItem.push(deatilItem);
                }
              });
            }
          });
          //判断是否可以申请退款
          if ([OrderStatus.PendingReview, OrderStatus.PendingShipment, OrderStatus.Shipped].includes(orders.orders.status)) {
            this.isRefund = true;
          }
          //判断哪些商品可以申请
          this.orderItems = orders.item.map(item => {
            let disabled = false;
            item.orderItem.images = [];
            this.afterSalesDetailsItem.forEach(dItem => {
              if (Object.is(`${item.orderItem.id}`, `${dItem.orderItemId}`)) {
                if (dItem.afterSalesItem.quantity >= item.orderItem.quantity) {
                  disabled = true;
                } else {
                  item.orderItem.quantity = item.orderItem.quantity - dItem.afterSalesItem.quantity;
                }
              }
            });
            if (!disabled) {
              this.isAllDisabled = false;
            }
            return { ...item, applyQuantity: item.orderItem.quantity, disabled: disabled };
          });
        },
        error => {
          console.log(error);
        }
      )
      .add(() => {
        this.loading.table = false;
      });
  }

  goBack() {
    this.location.back();
  }
}
