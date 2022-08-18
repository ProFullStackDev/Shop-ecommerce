import * as moment from 'moment';

export const setFormat = (val: any, datePipe: any) => {
  if (datePipe.locale === 'cn-TR') {
    return moment(val).format('YYYY-MM-DD HH:mm');
  }

  return datePipe.transform(val, 'YYYY-MM-dd HH:mm:ss');
};
