import { Location } from '@angular/common'; //路由返回
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '@core/services/user/review.service';
import { environment } from '@environments/environment';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
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
  selector: 'app-review-add',
  templateUrl: './review-add.component.html',
  styleUrls: ['./review-add.component.less']
})
export class ReviewAddComponent extends DestroySubscription implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private message: NzMessageService,
    private reviewService: ReviewService,
    private location: Location
  ) {
    super();
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      content: [null, [Validators.required]]
    });
    this.route.queryParams.pipe(takeUntil(this.destroyStream$)).subscribe(queryParams => {
      console.log(queryParams);
      this.productId = queryParams.productId;
      this.storeId = queryParams.storeId;
      this.orderItemId = queryParams.orderItemId;
      this.specifications = queryParams.specifications;
      this.name = queryParams.name;
      this.thumbnail = queryParams.thumbnail;
    });
  }
  score = 5;
  productId: string;
  storeId: string;
  orderItemId: string;
  specifications: string;
  name: string;
  thumbnail: string;
  validateForm!: FormGroup;
  loading = {
    submit: false
  };
  fileList: NzUploadFile[] = [];
  file: NzUploadFile;
  previewImage: string | undefined = '';
  previewVisible = false;

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
    return { dir: 'review' };
  };

  handlePreview = async (file: NzUploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };

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
    this.loading.submit = true;
    const formData = this.validateForm.value;
    let images: any[] = [];
    if ((this.fileList, length > 0)) {
      this.fileList.forEach(item => {
        images.push(item.url);
      });
    }
    this.reviewService
      .saveProductReview({
        ...formData,
        images: JSON.stringify(images),
        score: this.score,
        productId: this.productId,
        storeId: this.storeId,
        orderItemId: this.orderItemId,
        specifications: this.specifications
      })
      .subscribe(
        () => {
          this.message.success('评论成功');
          setTimeout(() => {
            this.router.navigate(['/member/review/list']);
          }, 500);
        },
        error => {
          console.error(error);
          this.message.error(error.message);
        }
      )
      .add(() => {
        this.loading.submit = false;
      });
  }

  goBack() {
    this.location.back();
  }
}
