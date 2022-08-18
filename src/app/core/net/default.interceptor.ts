import { isPlatformServer } from '@angular/common';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpParams,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpResponseBase,
  HttpSentEvent,
  HttpUserEvent
} from '@angular/common/http';
import { Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { netResponse } from '@core/net/net.types';
import { SystemUserService } from '@core/system/system-user.service';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ALAIN_I18N_TOKEN } from '@delon/theme';
import { environment } from '@environments/environment';
import { isNullOrUndefinedOrEmpty } from '@shared/utils/utils';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { alainConfig } from '../../global-config.module';

const TOKEN_ERROR_CODE = [2, 3, 4, 5, 6];

function clearEmptyValue(value: any): any {
  if (value instanceof Object) {
    return Object.entries(value).reduce((object, [key, value]) => {
      const clearedValue = clearEmptyValue(value);
      if (!Object.is(clearedValue, undefined)) {
        object[key] = clearedValue;
      }
      return object;
    }, {});
  }
  if (value instanceof Array) {
    return value.map(clearEmptyValue);
  }
  return isNullOrUndefinedOrEmpty(value) ? undefined : value;
}

/**
 * 默认HTTP拦截器，其注册细节见 `app.module.ts`
 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, @Inject(PLATFORM_ID) private platformId: Object, private user: SystemUserService) {}

  private get tokenSrv(): ITokenService {
    return this.injector.get(DA_SERVICE_TOKEN);
  }

  private goTo(url: string): void {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }

  private static checkStatus(ev: HttpResponseBase): void {
    if ((ev.status >= 200 && ev.status < 300) || ev.status === 401) {
      return;
    }
    // const errortext = CODEMESSAGE[ev.status] || ev.statusText;
    // this.notification.error(`请求错误 ${ev.status}: ${ev.url}`, errortext);
  }

  private toLogin(): void {
    // this.notification.error(`未登录或登录已过期，请重新登录。`, ``);
    this.goTo(this.tokenSrv.login_url!);
  }

  private handleData(ev: HttpResponseBase, req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (ev.headers.has('token')) {
      this.tokenSrv.set({ token: ev.headers.get('token') });
    }
    DefaultInterceptor.checkStatus(ev);
    // 业务处理：一些通用操作
    switch (ev.status) {
      case 200:
        // 业务层级错误处理，以下是假定restful有一套统一输出格式（指不管成功与否都有相应的数据格式）情况下进行处理
        // 例如响应内容：
        //  错误内容：{ status: 1, msg: '非法参数' }
        //  正确内容：{ status: 0, response: {  } }
        // 则以下代码片断可直接适用
        if (ev instanceof HttpResponse) {
          const body = ev.body;
          if (body && body.code !== 0) {
            // this.injector.get(NzMessageService).error(body.msg);
            // 注意：这里如果继续抛出错误会被catchError((err: HttpErrorResponse) => this.handleData(err, newReq, next))二次拦截，导致外部实现的 Pipe、subscribe 操作被中断，例如：this.http.get('/').subscribe() 不会触发
            // 如果你希望外部实现，需要手动移除catchError((err: HttpErrorResponse) => this.handleData(err, newReq, next))
            if (TOKEN_ERROR_CODE.includes(body.code)) {
              this.user.logout();
              this.tokenSrv.clear();
              this.goTo(this.tokenSrv.login_url!);
            }
            return throwError({
              ...ev,
              ...ev.body
            });
          } else {
            // 忽略 Blob 文件体
            if (isPlatformServer(this.platformId) || ev.body instanceof Blob) {
              return of(ev);
            }
            // 重新修改 `body` 内容为 `response` 内容
            return of(new HttpResponse<netResponse>({ body: body.data }));
          }
        }
        break;
      case 401:
        this.toLogin();
        break;
      case 403:
      case 404:
      case 500:
        // this.goTo(`/exception/${ev.status}?url=${req.urlWithParams}`);
        break;
      default:
        if (ev instanceof HttpErrorResponse) {
          console.warn('未知错误', ev);
        }
        break;
    }
    if (ev instanceof HttpErrorResponse) {
      return throwError(ev);
    } else {
      return of(ev);
    }
  }

  private getAdditionalHeaders(headers?: HttpHeaders): { [name: string]: string } {
    const res: { [name: string]: string } = {};
    const lang = this.injector.get(ALAIN_I18N_TOKEN).currentLang;
    if (!headers?.has('Accept-Language') && lang) {
      res['Accept-Language'] = lang;
    }
    // add token in every request
    const tokenModel = this.tokenSrv.get();
    const tokenKey = alainConfig.auth?.token_send_key || 'token';
    if (!headers?.has(tokenKey) && tokenModel?.token) {
      res[tokenKey] = tokenModel?.token;
    }

    return res;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith('https://t.tyqoon.co')) {
      return next.handle(req);
    }

    // 统一加上服务端前缀
    let url = req.url;
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      const { baseUrl } = environment.api;
      url = baseUrl + (baseUrl.endsWith('/') && url.startsWith('/') ? url.substring(1) : url);
    }
    const isFormData = req.body instanceof FormData;
    const newBody =
      req.body && !isFormData
        ? Object.entries(req.body).reduce((obj, [key, value]) => {
            const clearedValue = clearEmptyValue(value);
            if (!Object.is(clearedValue, undefined)) {
              obj[key] = value;
            }
            return obj;
          }, {})
        : undefined;
    const newParmas = new HttpParams({
      fromObject: req.params.keys().reduce((obj, key) => {
        const value: any = req.params.get(key);
        const clearedValue = clearEmptyValue(value);
        if (!Object.is(clearedValue, undefined)) {
          obj[key] = value;
        }
        return obj;
      }, {})
    });

    const newReq = req.clone({
      url,
      setHeaders: this.getAdditionalHeaders(req.headers),
      params: newParmas,
      body: newBody
    });
    return next.handle(newReq).pipe(
      mergeMap((ev: HttpResponseBase | HttpSentEvent | HttpProgressEvent | HttpUserEvent<any>) => {
        // 允许统一对请求错误处理
        if (ev instanceof HttpResponseBase) {
          return this.handleData(ev, newReq, next);
        }
        // 若一切都正常，则后续操作
        return of(ev);
      })
      // catchError((err: HttpErrorResponse) => this.handleData(err, newReq, next))
    );
  }
}
