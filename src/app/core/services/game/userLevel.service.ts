import { Injectable } from '@angular/core';
import { UserLevelAttributes } from '@core/models/UserLevel';
import { BaseApi, BaseUrl, GET } from '@delon/theme';
import { Observable } from 'rxjs';

export interface UserLevelPOM extends UserLevelAttributes {}

@Injectable({ providedIn: 'root' })
@BaseUrl('/wireframe/level')
export class UserLevelService extends BaseApi {
  /**
   * 查询等级配置 Copy
   * GET /wireframe/level/queryLevel
   *
   */
  @GET('/queryLevel')
  queryLevel(): Observable<UserLevelPOM[]> {
    return null as any;
  }
}
