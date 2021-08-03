/*
 * @Descripttion:  获取特殊数据
 * @Date: 2019-12-18 10:24:16
 * @LastEditors  : ymy
 * @LastEditTime : 2020-01-14 16:39:25
 */
import { RequestServerClass } from '../../util/request'
const qs = require('qs')
export class SzFireModelServe {
  public rSerivce: any

  constructor(opt: any, axiosFilterFn?: any) {
    this.rSerivce = new RequestServerClass(opt)
    axiosFilterFn.call(this, this.rSerivce.serverObj)
  }


  public getSzModelData(opts) {
    //const url = 'http://192.168.20.209:8593/model/api/forestfrie/fireModel?'+qs.stringify(opts);
    const url = '/model/api/forestfrie/fireModel?'+qs.stringify(opts);
    return this.rSerivce.serverObj.get(url);
  }

}
