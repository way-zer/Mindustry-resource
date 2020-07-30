import { request } from '@@/plugin-request/request';

const host = '';

export function getInfo(md5: string) {
  return request(`${host}/map/${md5}/info`);
}

export function getPreviewSrc(md5: string) {
  return `${host}/map/${md5}/preview`;
}
