// 请参考：https://ng-alain.com/docs/i18n
import { Platform } from '@angular/cdk/platform';
import { registerLocaleData } from '@angular/common';
import ngEn from '@angular/common/locales/en';
import ngJa from '@angular/common/locales/ja';
import ngKo from '@angular/common/locales/ko';
import ngRu from '@angular/common/locales/ru';
import ngVi from '@angular/common/locales/vi';
import ngZh from '@angular/common/locales/zh';
import { Injectable, LOCALE_ID } from '@angular/core';
import {
  DelonLocaleService,
  SettingsService,
  ja_JP as delonJa,
  ko_KR as delonKo,
  en_US as delonEN,
  zh_CN as delonZhCn,
  _HttpClient,
  AlainI18nBaseService
} from '@delon/theme';
import { AlainConfigService } from '@delon/util/config';
import { TranslateService } from '@ngx-translate/core';
import { zhCN as dfZhCn, enGB, ko, vi, ja, ru } from 'date-fns/locale';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzI18nService, en_GB, zh_CN as zorroZhCN, ko_KR, vi_VN, ja_JP, ru_RU } from 'ng-zorro-antd/i18n';
import { Observable } from 'rxjs';

interface LangConfigData {
  abbr: string;
  text: string;
  ng: NzSafeAny;
  zorro: NzSafeAny;
  date: NzSafeAny;
  delon: NzSafeAny;
  code: string;
}

const DEFAULT = 'en-GB';

const LANGS: { [key: string]: LangConfigData } = {
  'zh-CN': {
    text: '简体中文',
    ng: ngZh,
    code: 'cn',
    zorro: zorroZhCN,
    date: dfZhCn,
    delon: delonZhCn,
    abbr: '🇨🇳'
  },
  'en-GB': {
    text: 'English',
    ng: ngEn,
    code: 'en',
    zorro: en_GB,
    date: enGB,
    delon: delonEN,
    abbr: '🇬🇧'
  },
  'cn-TR': {
    text: '繁體中文',
    ng: ngZh,
    code: 'tr',
    zorro: zorroZhCN,
    date: dfZhCn,
    delon: delonZhCn,
    abbr: '🇨🇳'
  },
  'ko-KR': {
    text: 'Korean',
    ng: ngKo,
    code: 'kr',
    zorro: ko_KR,
    date: ko,
    delon: delonKo,
    abbr: ''
  },
  'vi-VN': {
    text: 'Vietnamese',
    ng: ngVi,
    code: 'vn',
    zorro: vi_VN,
    date: vi,
    delon: delonEN,
    abbr: ''
  },
  'ja-JP': {
    text: 'Japanese',
    ng: ngJa,
    code: 'jp',
    zorro: ja_JP,
    date: ja,
    delon: delonJa,
    abbr: ''
  },
  'ru-RU': {
    text: 'Russian',
    ng: ngRu,
    code: 'ru',
    zorro: ru_RU,
    date: ru,
    delon: delonEN,
    abbr: ''
  }
};

@Injectable({ providedIn: 'root' })
export class I18NService extends AlainI18nBaseService {
  protected override _defaultLang = DEFAULT;
  private _langs = Object.keys(LANGS).map(code => {
    const item = LANGS[code];
    return { code, text: item.text, abbr: item.abbr };
  });

  constructor(
    private http: _HttpClient,
    private translate: TranslateService,
    private settings: SettingsService,
    private nzI18nService: NzI18nService,
    private delonLocaleService: DelonLocaleService,
    private platform: Platform,
    cogSrv: AlainConfigService
  ) {
    super(cogSrv);

    this._defaultLang = DEFAULT;
    this.use(localStorage.getItem('current-lang') || DEFAULT, {});
  }

  private getDefaultLang(): string {
    if (!this.platform.isBrowser) {
      return DEFAULT;
    }
    if (this.settings.layout.lang) {
      return this.settings.layout.lang;
    }
    let res = (navigator.languages ? navigator.languages[0] : null) || navigator.language;
    const arr = res.split('-');
    return arr.length <= 1 ? res : `${arr[0]}-${arr[1].toUpperCase()}`;
  }

  loadLangData(lang: string): Observable<NzSafeAny> {
    return this.http.get(`assets/tmp/i18n/${lang}.json?_allow_anonymous=true`);
  }

  use(lang: string, data: Record<string, string>): void {
    if (this._currentLang === lang) return;

    this._data = this.flatData(data, []);

    const item = LANGS[lang];

    registerLocaleData(item.ng);
    this.nzI18nService.setLocale(item.zorro);
    this.nzI18nService.setDateLocale(item.date);
    this.delonLocaleService.setLocale(item.delon);
    this.translate.use(item.code);
    this._currentLang = lang;
    localStorage.setItem('current-lang', lang);
    this._change$.next(lang);
  }

  getLangs(): Array<{ code: string; text: string; abbr: string }> {
    return this._langs;
  }
}
