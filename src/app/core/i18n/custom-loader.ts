import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { httpParamsFromObject } from '@shared/helpers/http-params';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

const LANG_API = 'https://t.tyqoon.co';

export class CustomLoader implements TranslateLoader {
  cache = {};
  constructor(private http: HttpClient) {}
  getTranslation(lang: string): Observable<any> {
    if (this.cache.hasOwnProperty(lang)) {
      return of(this.cache[lang]);
    }

    return this.http.get(LANG_API, { params: httpParamsFromObject({ lang: lang, _allow_anonymous: 'true' }) }).pipe(
      mergeMap((res: any) => {
        const { data }: { data: any } = res;
        this.cache[lang] = data;
        return of(data);
      })
    );
  }
}
