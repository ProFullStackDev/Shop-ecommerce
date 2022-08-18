import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AddressService } from '@core/services/user/address.service';
import { BillService } from '@core/services/user/bill.service';
import {takeUntil} from "rxjs/operators";
import {DestroySubscription} from "@shared/helpers/destroy-subscription";

@Component({
  selector: 'app-header-detail',
  templateUrl: './header-detail.component.html',
  styleUrls: ['./header-detail.component.less']
})
export class HeaderDetailComponent extends DestroySubscription implements OnInit {
  constructor(
    private addressService: AddressService,
    private billService: BillService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }
  validateForm!: FormGroup;
  titleId: string = '';
  type: number = 0;
  vatRegistrationNumberType: number = 0; //抬头类型
  form: any = {
    id: this.titleId,
    title: '',
    vatRegistrationNumber: '',
    registeredAddress: '',
    registeredPhone: '',
    bankName: '',
    bankAccount: ''
  };
  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(takeUntil(this.destroyStream$)).subscribe(query => {
      this.titleId = query.id;
    });
    this.getDetail(this.titleId);
    this.validateForm = this.fb.group({
      id: this.titleId,
      type: this.type,
      title: ['', [Validators.required]],
      vatRegistrationNumber: ['', [Validators.required]],
      registeredPhone: [''],
      registeredAddress: [''],
      bankAccount: [''],
      bankName: ['']
    });
  }
  getDetail(ids: string): void {
    if (ids) {
      const params = {
        id: this.titleId
      };
      this.billService.getFapiaoTitleDetails(params).pipe(takeUntil(this.destroyStream$)).subscribe(res => {
        this.form = res;
        this.validateForm.patchValue({
          ...res
        });
        // 区分个人和单位
        if (res.vatRegistrationNumber) {
          this.vatRegistrationNumberType = 1;
        } else {
          this.vatRegistrationNumberType = 0;
        }
      });
    }
  }
  validate(): void {
    if (this.validateForm.valid) {
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
    if (formData.title || formData.vatRegistrationNumber) {
      if (this.titleId) {
        this.billService
          .updateFapiaoTitle(formData)
          .pipe(takeUntil(this.destroyStream$))
          .subscribe(
            () => {
              this.message.success('编辑成功');
              setTimeout(() => {
                this.router.navigateByUrl('/member/header-manage/list');
              }, 1000);
            },
            error => {
              this.message.error(error.message);
            }
          )
          .add(() => {});
      } else {
        this.billService
          .saveFapiaoTitle(formData)
          .pipe(takeUntil(this.destroyStream$))
          .subscribe(
            () => {
              this.message.success('新增成功');
              setTimeout(() => {
                this.router.navigateByUrl('/member/header-manage/list');
              }, 1000);
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
  vatRegistrationNumberTypeChange(type: number): void {
    this.vatRegistrationNumberType = type;
  }
}
