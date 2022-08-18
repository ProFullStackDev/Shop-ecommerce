import { Injectable } from '@angular/core';
import { StationLetterAttributes } from '@core/models/StationLetter';
import { BaseApi, BaseUrl, Body, GET, POST } from '@delon/theme';
import { Observable } from 'rxjs';

export interface StationLetterPOM extends StationLetterAttributes {}

@Injectable({ providedIn: 'root' })
@BaseUrl('/wireframe/stationLetter')
export class StationLetterService extends BaseApi {
  /**
   * 查询我的站内信
   * GET /wireframe/stationLetter/query
   *
   */
  @GET('/query')
  queryLetter(): Observable<StationLetterPOM[]> {
    return null as any;
  }

  /**
   * 已读站内信
   * POST /wireframe/stationLetter/alreadyRead
   *
   */
  @POST('/alreadyRead')
  alreadyRead(@Body data: { id: string }): Observable<any> {
    return null as any;
  }
}
