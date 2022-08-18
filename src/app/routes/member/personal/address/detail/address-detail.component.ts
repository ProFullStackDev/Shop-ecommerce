import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as md5 from 'md5';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AddressService } from '@core/services/user/address.service';
import {takeUntil} from "rxjs/operators";
import {DestroySubscription} from "@shared/helpers/destroy-subscription";

@Component({
  selector: 'app-address-detail',
  templateUrl: './address-detail.component.html',
  styleUrls: ['./address-detail.component.less']
})
export class AddressDetailComponent extends DestroySubscription implements OnInit {
  constructor(
    private addressService: AddressService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }
  editId: string = '';
  @ViewChild('editCompoent') editCom: any;

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(takeUntil(this.destroyStream$)).subscribe(query => {
      this.editId = query.id;
    });
  }
  submitComponent() {
    this.editCom.submit();
  }
  submitStart() {
    // console.log('submitStart');
  }
  submitSuccess(id: boolean) {
    if (id) {
      this.message.success('编辑成功');
    } else {
      this.message.success('新增成功');
    }
    setTimeout(() => {
      this.router.navigateByUrl('/member/address/list');
    }, 1000);
  }
}
