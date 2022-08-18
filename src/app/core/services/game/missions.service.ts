import { Injectable } from '@angular/core';
import { UserMissionsAttributes } from '@core/models/UserMissions';
import { BaseApi, BaseUrl, Body, GET, POST } from '@delon/theme';
import { Observable } from 'rxjs';

export interface UserMissionsPOM extends UserMissionsAttributes {
  icon: string;
  name: string;
  rewardPoint: string;
  remark: string;
  progress: number;
  completed: boolean;
}

@Injectable({ providedIn: 'root' })
@BaseUrl('/wireframe/missions')
export class UserMissionsService extends BaseApi {
  /**
   * 查询我的任务
   * GET /wireframe/missions/queryAll
   *
   */
  @GET('/queryAll')
  queryAll(): Observable<UserMissionsPOM[]> {
    return null as any;
  }

  /**
   * 完成任务
   * POST /wireframe/missions/complete
   *
   */
  @POST('/complete')
  complete(@Body data: { missionsId: string }): Observable<any> {
    return null as any;
  }
}
