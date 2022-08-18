import { Injectable } from '@angular/core';
import { Users } from '@core/models/Users';
import { BaseApi, BaseUrl, GET, Query, POST, Body } from '@delon/theme';
import { Observable } from 'rxjs';

export enum VerifyCodeType {
  Register = 'Register',
  Login = 'Login'
}

export enum SmsMethod {
  Register = 'register', // 注册
  ModifyThePassword = 'modifyThePassword', // 修改密码
  ResetPassword = 'resetPassword', // 重置密码
  ModifyTheMobilePhone = 'modifyTheMobilePhone', // 修改手机号码
  LoginByMobilePhone = 'loginByMobilePhone', //通过手机号码进行登录
  ChangePinCode = 'changePinCode' // 更改支付密码登录
}

export interface VerifyCode {
  captchaId: string;
  picture: string;
}

export interface LoginParams {
  username: string; // 用户名
  password: string; // 密码
  captchaId: string; // 验证码ID
  captchaCode: string; // 验证码
}

export interface ChangePasswordParams {
  oldPassword: string; // 旧密码
  newPassword: string; // 新密码
}

export interface setupPasswordParams {
  oldPinCode?: string; // 旧密码
  newPinCode: string; // 支付密码
  smsCode?: string; // SMcode
}

export interface RegisterParams extends LoginParams {
  email: string; // 邮箱
  mobileArea: string; //手机区号
  mobile: string; // 手机号码
  smsCode: string; //短信验证码
}

export interface UsersPOM extends Users {
  mobileArea: string; // 手机区号
  vipLevel: number;
  sumPerformance: string;
  isSettingPaymentKey: boolean; //是否设置支付密码
}

@Injectable({ providedIn: 'root' })
@BaseUrl('/user/basic')
export class BasicService extends BaseApi {
  /**
   * 获取验证码(Get verification code)
   * GET /user/basic/getVerifyCode
   *
   * @param type  验证码类型/VerifyCodeType (Register:注册,Login:登录)
   */

  @GET('/getVerifyCode')
  getVerifyCode(@Query('type') type: VerifyCodeType): Observable<VerifyCode> {
    return null as any;
  }

  /**
   * 获取验证码(Get verification code)
   * GET /user/basic/getVerifyCode
   *
   * @param type  验证码类型/VerifyCodeType (Register:注册,Login:登录)
   */

  //  @GET('/getVerifyCode')
  //  getVerifyCode(@Query('type') type: VerifyCodeType): Observable<VerifyCode> {
  //    return null as any;
  //  }

  /**
   * 登录(login)
   * POST /user/basic/login
   *
   * @param {LoginParams} data
   */
  @POST('/login')
  login(@Body data: LoginParams): Observable<any> {
    return null as any;
  }

  /**
   * 注册(Register)
   * POST /user/basic/register
   *
   * @param {RegisterParams} data
   */
  @POST('/register')
  register(@Body data: RegisterParams): Observable<any> {
    return null as any;
  }

  /**
   * 手机号注册(Register)
   * POST /user/basic/
   *
   * @param {RegisterParams} data
   */
  @POST('/registerForMobile')
  registerForMobile(@Body data: RegisterParams): Observable<any> {
    return null as any;
  }

  /**
   * 手机号注册(Register)
   * POST /user/basic/
   *
   * @param {RegisterParams} data
   */
  @POST('/register_v2')
  registerV2(@Body data: RegisterParams): Observable<any> {
    return null as any;
  }

  /**
   * 获取用户信息(GetUserInfo)
   * GET /user/basic/getUserInfo
   *
   */
  @GET('/getUserInfo')
  getUserInfo(): Observable<UsersPOM> {
    return null as any;
  }

  /**
   * 修改密码
   * POST /user/basic/changePassword
   *
   * @param {changePasswordParams} data
   */
  @POST('/changePassword')
  changePassword(@Body data: ChangePasswordParams): Observable<any> {
    return null as any;
  }

  /**
   * 设置支付密码
   * POST /user/basic/changePinCode
   *
   * @param {setupPassword} data
   */
  @POST('/changePinCode')
  setupPassword(@Body data: setupPasswordParams): Observable<any> {
    return null as any;
  }

  /**
   * send change mobile sms
   * POST /user/basic/sendChangeMobileSms
   *
   */
  @POST('/sendChangeMobileSms')
  sendChangeMobileSms(@Body data: { mobileArea: string; mobile: string }): Observable<any> {
    return null as any;
  }

  /**
   * user change mobile
   * POST /user/basic/changeMobile
   *
   */
  @POST('/changeMobile')
  changeMobile(@Body data: { mobileArea: string; mobile: string; smsCode: string }): Observable<any> {
    return null as any;
  }

  /**
   * send change user email verify code
   * POST /user/basic/sendChangeEmailCode
   *
   */
  @POST('/sendChangeEmailCode')
  sendChangeEmailCode(@Body data: { email: string }): Observable<any> {
    return null as any;
  }

  /**
   * user change email
   * POST /user/basic/changeEmail
   *
   */
  @POST('/changeEmail')
  changeEmail(@Body data: { emailCode: string; email: string }): Observable<any> {
    return null as any;
  }

  /**
   * bind user recommender
   * POST /basic/bindRecommender
   *
   */
  @POST('/bindRecommender')
  bindRecommender(@Body data: { recommenderId: string }): Observable<any> {
    return null as any;
  }

  /**
   * add user recharge 添加用户充值记录
   * POST /user/basic/recharge
   *
   */
  @POST('/recharge')
  recharge(@Body data: { actualAmountPaid: number }): Observable<{ id: string }> {
    return null as any;
  }

  /**
   * 获取验证码
   * POST /user/basic/queryMobileSms
   *
   */
  @POST('/queryMobileSms')
  queryMobileSms(@Body data: { method: SmsMethod; mobileArea: string; mobile: string }): Observable<any> {
    return null as any;
  }

  /*
  POST /user/basic/sendEmail
  */

  @POST('/sendEmail')
  SendEmailVerifyCodeParam(@Body data: { email: string; type: string }): Observable<any> {
    return null as any;
  }

  /**
   * 忘记密码
   * POST /user/basic/forgetThePassWord
   *
   */
  @POST('/forgetThePassWord')
  forgetThePassWord(@Body data: { mobileArea: string; mobile: string; smsCode: string; newPassword: string }): Observable<any> {
    return null as any;
  }

  /**
   * 通过手机号码进行登录
   * POST /user/basic/loginByMobilePhone
   *
   */
  @POST('/loginByMobilePhone')
  loginByMobilePhone(@Body data: { mobileArea: string; mobile: string; smsCode: string }): Observable<any> {
    return null as any;
  }
}
