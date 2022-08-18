import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AddressService } from '@core/services/user/address.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'address-change',
  templateUrl: './address-change.component.html',
  styleUrls: ['./address-change.component.less'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AddressChangeComponent implements OnInit {
  @Input('id') id: string;
  constructor(private addressService: AddressService, private modal: NzModalRef) {}
  dataList: any[] = [];

  ngOnInit(): void {
    this.getDataList();
  }
  getDataList(): void {
    const params = {
      page: 0,
      rows: 10
    };
    this.addressService
      .getReceiverAddress(params)
      // .pipe(takeUntil(this.destroyStream$))
      .subscribe(res => {
        this.dataList = res.rows;
        this.dataList.forEach(item => {
          item.select = false;
          if (Object.is(item.id, this.id)) {
            item.select = true;
            console.log(item.select);
          }
        });
        // console.log('显示地址信息', this.dataList);
      });
  }
  public selectAddress(data: any) {
    this.modal.destroy({ id: data.id });
  }
}
