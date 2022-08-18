import { Location } from '@angular/common'; //路由返回
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService, DeliveryPOM } from '@core/services/common.service';
import { AftersalesService, AfterSalesDetailsPOM, AftersalesStatus, AftersalesType } from '@core/services/user/aftersales.service';
import { environment } from '@environments/environment';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { DictKey, DictPipe } from '@shared/pipes/dict/dict.pipe';
import { NzImageService } from 'ng-zorro-antd/image';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile, NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { takeUntil } from 'rxjs/operators';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

@Component({
  selector: 'app-sales-detail',
  templateUrl: './aftersales-detail.component.html',
  styleUrls: ['./aftersales-detail.component.less'],
  providers: [AftersalesService]
})
export class AftersalesDetailComponent extends DestroySubscription implements OnInit {
  constructor(
    private aftersalesService: AftersalesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private commonService: CommonService,
    private message: NzMessageService,
    private location: Location,
    private nzImageService: NzImageService
  ) {
    super();
  }
  isVisible: boolean = false;
  afterSalesID: string = '';
  title: boolean = false;
  detailInfo: AfterSalesDetailsPOM;
  DictKey = DictKey;
  AftersalesStatus = AftersalesStatus;
  AftersalesType = AftersalesType;
  validateForm = this.fb.group({
    deliveryId: [null, [Validators.required]]
  });
  loading = { submit: false };
  deliveryList: DeliveryPOM[] = [];
  isLoading = false;
  fileList: NzUploadFile[] = [];
  file: NzUploadFile;
  previewImage: string | undefined = '';
  previewVisible = false;
  trackingNoList: Array<{ id: number; controlInstance: string }> = [];

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(takeUntil(this.destroyStream$)).subscribe(query => {
      this.afterSalesID = query.afterSalesID;
      this.getDetail();
      this.addField();
    });
  }

  addField(): void {
    const id = this.trackingNoList.length > 0 ? this.trackingNoList[this.trackingNoList.length - 1].id + 1 : 0;

    const control = {
      id: id,
      controlInstance: `trackingNo${id}`
    };
    const index = this.trackingNoList.push(control);
    this.validateForm.addControl(this.trackingNoList[index - 1].controlInstance, new FormControl(null, Validators.required));
  }

  removeField(i: { id: number; controlInstance: string }): void {
    if (this.trackingNoList.length > 1) {
      const index = this.trackingNoList.indexOf(i);
      this.trackingNoList.splice(index, 1);
      this.validateForm.removeControl(i.controlInstance);
    }
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

  getDetail() {
    const params = {
      afterSalesID: this.afterSalesID
    };
    // 获取详情
    this.aftersalesService
      .getAfterSalesDetails(params)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(res => {
        this.detailInfo = res;
        console.log(res, '1111111111111111111');
        if (this.detailInfo.afterSales.status === AftersalesStatus.APPROVED) {
          this.getDeliveryList('');
        }
      });
  }

  getDeliveryList(value: string) {
    this.isLoading = true;
    const params = {
      page: 0,
      rows: 300,
      name: value
    };
    // 获取详情
    this.commonService
      .queryDelivery(params)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(res => {
        this.deliveryList = res.rows;
      })
      .add(() => {
        this.isLoading = false;
      });
  }

  goCancel() {
    this.isVisible = true;
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    this.cancel();
  }

  cancel(): void {
    this.loading.submit = true;
    const params = {
      afterSalesID: this.afterSalesID
    };
    // 获取详情
    this.aftersalesService
      .delAfterSalesOrder(params)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(res => {
        this.isVisible = false;
        this.message.success('取消成功');
        this.getDetail();
      })
      .add(() => {
        this.loading.submit = false;
      });
  }

  validate(): void {
    if (this.validateForm.valid) {
      if (this.fileList.length === 0) {
        this.message.warning('请上传物流凭证！');
        return;
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

  submit() {
    this.loading.submit = true;
    const images: any[] = [];
    this.fileList.map(item => {
      images.push(item.url);
    });
    let trackingNo: string = '';
    Object.keys(this.validateForm.value).forEach((key: any) => {
      if (key.includes('trackingNo')) {
        trackingNo += `${this.validateForm.value[key]},`;
      }
    });
    if (trackingNo.length > 0) {
      trackingNo = trackingNo.substring(0, trackingNo.length - 1);
    }
    const params = {
      deliveryId: this.validateForm.value['deliveryId'],
      trackingNo: trackingNo,
      afterSalesId: this.afterSalesID,
      images: images
    };
    // 获取详情
    this.aftersalesService
      .saveAfterSalesTrackingNo(params)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(res => {
        this.message.success('提交成功');
        this.getDetail();
      })
      .add(() => {
        this.loading.submit = false;
      });
  }

  goBack() {
    this.location.back();
  }

  goAftersalesPreview(index: number): void {
    this.preview(this.detailInfo.afterSalesDetailsItem[index].afterSalesItem.images);
  }

  goDeliverPreview() {
    this.preview(this.detailInfo.afterSales.images);
  }

  preview(images: any) {
    if (images) {
      const imageList = JSON.parse(images).map((item: any) => {
        return { src: item };
      });
      this.nzImageService.preview(imageList, { nzZoom: 1.5, nzRotate: 0 });
    } else {
      this.message.info('暂无凭证');
    }
  }
}
