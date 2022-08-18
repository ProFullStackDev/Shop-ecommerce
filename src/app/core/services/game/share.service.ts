import { Injectable } from '@angular/core';
import { BaseApi, BaseUrl, Body, POST } from '@delon/theme';
import { Observable } from 'rxjs';

@Injectable()
@BaseUrl('/wireframe/share')
export class ShareService extends BaseApi {
  /**
   * 生成分享链接
   * POST /wireframe/share/generate
   *
   */
  @POST('/generate')
  generate(@Body data: { type: number }): Observable<string> {
    return null as any;
  }
}
