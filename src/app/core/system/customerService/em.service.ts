import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SystemUserService } from '@core/system/system-user.service';
import { setPasswordComponent } from '@routes/member/modify/setup-password/setup-password.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ModalOptions, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { get } from 'scriptjs';
// @ts-ignore
let easemobim = window.easemobim || {};

@Injectable({
  providedIn: 'root'
})
export class EmService {
  confirmModal?: NzModalRef; // For testing by now
  constructor(
    private readonly user: SystemUserService,
    private message: NzMessageService,
    private modal: NzModalService,
    private router: Router
  ) {}

  public getScript() {
    get('//102849.kefu.easemob.com/webim/easemob.js?configId=f565379a-ead0-45df-a7bb-7cbbee628fa3', () => {});
    get('https://cdn.triple-a.io/widgets/triplea-ecommerce-payment-v1.1/js/app.js', () => {});
  }

  // 删除cookie
  public clearCookie() {
    const keys = document.cookie.match(/[^ =;]+(?==)/g);
    // console.log(keys, document.domain);
    if (keys) {
      // console.log(`${keys[0]}=0;path=/;domain=http://102849.kefu.easemob.com;expires=${new Date(0).toUTCString()}`);
      for (let i = keys.length; i--; ) {
        // document.cookie = `${keys[i]}=0;path=/;expires=${new Date(0).toUTCString()}`; // 清除当前域名下的,例如：m.ratingdog.cn
        // document.cookie = `${keys[i]}=0;path=/;domain=${document.domain};expires=${new Date(0).toUTCString()}`; // 清除当前域名下的，例如 .m.ratingdog.cn
        document.cookie = `${keys[i]}=0;path=/;domain=http://102849.kefu.easemob.com;expires=${new Date(0).toUTCString()}`; // 清除一级域名下的或指定的，例如 .ratingdog.cn
      }
    }
  }

  createEditModal(modalConfig: ModalOptions): NzModalRef {
    const modal = this.modal.create({
      nzMaskClosable: false,
      nzOnCancel: () => {
        modal.close();
      },
      nzOnOk: content => {
        modal.updateConfig({
          nzOkLoading: true,
          nzCancelDisabled: true
        });
        content
          .validate()
          .subscribe(() => {
            modal.destroy();
            this.user.updateUserInfo();
          })
          .add(() => {
            modal.updateConfig({ nzOkLoading: false, nzCancelDisabled: false });
          });
        return false;
      },
      ...modalConfig
    });
    return modal;
  }

  // 判断是否登录
  // @ts-ignore
  public load(userInfo: any) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    this.clearCookie();
    // console.log(this.user.isLogin(), 'userInfo', userInfo);
    const myuser = userInfo;
    const islogin = this.user.isLogin();
    // @ts-ignore
    easemobim.config = {
      configId: 'f565379a-ead0-45df-a7bb-7cbbee628fa3',
      // 访客信息（可选）
      visitor: {
        // trueName: myuser.username,
        // userLevel: myuser.userLevel,
        // mobileArea: myuser.mobileArea,
        // point: myuser.point,
        // avatar: myuser.avatar,
        // email: myuser.email,
        // address: myuser.address
        nickName: myuser ? myuser?.username : '',
        trueName: myuser ? myuser.username : '',
        phone: myuser ? myuser.mobile : '',
        email: myuser ? myuser.email : '',
        id: myuser ? myuser.id : ''
      },
      onready() {
        console.log('onready');
      },
      onopen() {
        console.log('onopen');
        if (!islogin) {
          this.confirmModal = that.modal.confirm({
            // nzTitle: 'Do you Want to delete these items?',this.router.navigateByUrl('/login')
            nzContent: '请先登录以获得更好的服务',
            nzOnOk: () =>
              new Promise((resolve, reject) => {
                // setTimeout(Math.random() > 0 ? resolve : reject, 1000);
                resolve(1);
              })
                .then(() => that.router.navigateByUrl('/login'))
                .catch(() => console.log('Oops errors!'))
          });
          // that.createEditModal({
          //   nzTitle: '登录获得更好的服务'
          // });
          // that.message.error('请先进行登录');
          // easemobim.bind({ configId: '' });
          return;
        }
      }
    };
  }

  public openPopup() {
    easemobim.bind({ configId: 'f565379a-ead0-45df-a7bb-7cbbee628fa3' });
  }

  // @ts-ignore
  public sendProduct(products: any, url: string) {
    if (!this.user.isLogin()) {
      this.confirmModal = this.modal.confirm({
        // nzTitle: 'Do you Want to delete these items?',this.router.navigateByUrl('/login')
        nzContent: '请先登录以获得更好的服务',
        nzOnOk: () =>
          new Promise((resolve, reject) => {
            // setTimeout(Math.random() > 0 ? resolve : reject, 1000);
            resolve(1);
          })
            .then(() => this.router.navigateByUrl('/login'))
            .catch(() => console.log('Oops errors!'))
      });
      return;
    }
    // If the user is login
    this.openPopup();
    const data = JSON.parse(products.productImages);
    // console.log('sendProduct', products.name);
    const product = products;
    const title = '我正在看：';
    easemobim.sendExt({
      ext: {
        imageName: 'product.png',
        type: 'custom',
        msgtype: {
          track: {
            title: title,
            price: `￥${product.price}`,
            desc: product.name,
            img_url: data[0].source,
            item_url: url
          }
        }
      }
    });

    // send product to customerService
  }

  // @ts-ignore
  public orderDetail(products: any, orderItem?: any) {
    console.log(orderItem, '1111111111', products);
    if (!this.user.isLogin()) {
      this.confirmModal = this.modal.confirm({
        // nzTitle: 'Do you Want to delete these items?',this.router.navigateByUrl('/login')
        nzContent: '请先登录以获得更好的服务',
        nzOnOk: () =>
          new Promise((resolve, reject) => {
            // setTimeout(Math.random() > 0 ? resolve : reject, 1000);
            resolve(1);
          })
            .then(() => this.router.navigateByUrl('/login'))
            .catch(() => console.log('Oops errors!'))
      });
      return;
    }
    this.openPopup();
    const product = products;
    const title = '我的订单：';
    easemobim.sendExt({
      ext: {
        // imageName: 'mallImage3.png',
        imageName: 'order.png',
        type: 'order',
        msgtype: {
          track: {
            title: title,
            order_title: product.sn,
            price: `￥${product.price}`,
            desc: product.orderItems ? product.orderItems[0].productName : orderItem[0].orderItem.name,
            img_url: product.orderItems ? product.orderItems[0].thumbnail : orderItem[0].orderItem.thumbnail
            // item_url: data[0].source
          }
        }
      }
    });
  }
}
