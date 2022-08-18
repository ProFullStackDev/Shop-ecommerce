import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressService } from '@core/services/user/address.service';
import {takeUntil} from "rxjs/operators";
import {DestroySubscription} from "@shared/helpers/destroy-subscription";

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.less'],
  providers: [AddressService]
})
export class AddressListComponent extends DestroySubscription implements OnInit {
  constructor(private router: Router, private addressService: AddressService) {
    super();
  }
  page: number = 0;
  rows: number = 24;
  dataList: any[] = [];
  isVisible: boolean = false;
  deleteId: string = '';
  submitForm(): void {}

  ngOnInit(): void {
    this.getDataList();
  }
  getDataList(): void {
    const params = {
      page: 0,
      rows: 10
    };
    this.addressService.getReceiverAddress(params).pipe(takeUntil(this.destroyStream$)).subscribe(res => {
      this.dataList = res.rows;
    });
  }
  toAddressAdd(): void {
    this.router.navigateByUrl('/member/address/add');
  }
  toDelete(ids: string) {
    this.isVisible = true;
    this.deleteId = ids;
  }
  handleOk(): void {
    this.isVisible = false;
    const params = {
      id: this.deleteId
    };
    this.addressService.delReceiverAddress(params).pipe(takeUntil(this.destroyStream$)).subscribe(res => {
      // 删除成功刷新数据
      this.getDataList();
    });
  }
  handleCancel(): void {
    this.isVisible = false;
  }
}
