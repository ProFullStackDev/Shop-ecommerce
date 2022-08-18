import { HttpParams } from '@angular/common/http';
import { cleanObject } from '@shared/helpers/clean-object';

export const httpParamsFromObject = <T>(object: T, clearEmptyValues = true): HttpParams => {
  const preparedData = clearEmptyValues ? cleanObject<T>(object) : object;
  return new HttpParams({ fromObject: preparedData });
};
