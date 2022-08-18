import { Injectable } from '@angular/core';
import { BaseApi, BaseUrl, GET, POST, Payload, Body, BaseHeaders, Headers } from '@delon/theme';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@BaseUrl('/user/oss')
export class FileService extends BaseApi {
  /**
   * 头像上传
   * POST /user/oss/avatarUpload
   *
   */
  @POST('avatarUpload')
  avatarUpload(@Body data: FormData): Observable<any> {
    return null as any;
  }

  /**
   * 文件上传
   * POST /user/oss/fileUpload
   *
   */
  @POST('fileUpload')
  fileUpload(@Body data: FormData): Observable<any> {
    return null as any;
  }
}
