import { ProductImage, ProductImageType } from '@core/services/shop/product.service';

const defaultProductCover = 'src/assets/images/default-product-cover.png';

/**
 * Get product cover from productImages
 *
 * @param productImages
 * @param imageType
 * @param index
 */
export function getProductCover(productImages: string, imageType: ProductImageType, index: number = 0): string {
  const images: ProductImage[] = JSON.parse(productImages || '[]');
  if (!images[index] || !images[index][imageType]) {
    return defaultProductCover;
  }
  return images[index][imageType];
}

/**
 *
 * @desc   对象序列化
 * @param  {Object} obj
 * @return {String}
 */
export const stringifyQueryString = (obj: { [key: string]: any }): string => {
  if (!obj) {
    return '';
  }
  const pairs = [];

  for (const key in obj) {
    const value = obj[key];

    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; ++i) {
        pairs.push(`${encodeURIComponent(`${key}[${i}]`)}=${encodeURIComponent(value[i])}`);
      }
      continue;
    }

    pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
  }

  return pairs.join('&');
};

/**
 * 判断是否为null或undefined
 *
 * @param value
 * @returns {boolean}
 */
export const isNullOrUndefined = (value: any): boolean => {
  return Object.is(value, null) || Object.is(value, undefined);
};

/**
 * 判断是否为null或undefined或空字符串
 *
 * @param value
 * @returns {boolean}
 */
export const isNullOrUndefinedOrEmpty = (value: any): boolean => {
  return Object.is(value, null) || Object.is(value, undefined) || /^\s*$/.test(value);
};

/**
 * 格式换url
 *
 * @param url
 */
export const formatUrl = (url: string): string => {
  if (checkIsUrl(url)) {
    return url;
  }
  return `${location.origin}${url.startsWith('/') ? '' : '/'}${url}`;
};

/**
 * 判断是否为url
 *
 * @param str
 */
export const checkIsUrl = (str: string): boolean => {
  const strRegex =
    '^((https|http|ftp|rtsp|mms)?://)' +
    "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" + //ftp的user@
    '(([0-9]{1,3}.){3}[0-9]{1,3}' + // IP形式的URL- 199.194.52.184
    '|' + // 允许IP和DOMAIN（域名）
    "([0-9a-z_!~*'()-]+.)*" + // 域名- www.
    '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' + // 二级域名
    '[a-z]{2,6})' + // first level domain- .com or .museum
    '(:[0-9]{1,4})?' + // 端口- :80
    '((/?)|' +
    "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
  const re = new RegExp(strRegex);
  return re.test(str);
};

/**
 * 生成创建订单的参数编码
 *
 * @param data
 */
export const generateOrderConfirmParams = (
  data: Array<{ storeId: string; productOrder: Array<{ skuId: string; quantity: number; cover: string; productName: string }> }>
) => {
  return {
    o: btoa(encodeURIComponent(JSON.stringify(data)))
  };
};
