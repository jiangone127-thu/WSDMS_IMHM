import { RequestServerClass } from '../../util/request';

export class DisasterServer {

    public svc: any;
    constructor (params: any, axiosFilterFn?: any) {
        this.svc = new RequestServerClass(params);
        axiosFilterFn.call(this, this.svc.serverObj)
    }

    public trafficModel (opts) {
        const url = `/traffic/simulation/GEO?callback=message&{%22CaseID%22:11,%22CaseType%22:${opts.sceneName},%22IncidentID%22:${opts.IncidentID},%22LinkID%22:21,%22Direction%22:${opts.Direction},%22Occupation%22:${opts.Occupation},%22Rain(mm)%22:${opts.Rain},%22Fog(km)%22:${opts.Fog},%22Gis%22:D:/jiaotong/data/road/,%22Version%22:%221.0%22}&_=1604288100890`
        return this.svc.serverObj.get(url);
    }


    public getDizhen (opts) {
        const url = `/huopo/api/postgresql/DistasterModel()?Coordinates= 112.857875293%2C23.132018&Parameter=2018-01-30T10%3A30%3A40+EPSG%3A4326+${opts.model}+${opts.level}+${opts.rainfall}`
        return this.svc.serverObj.get(url)
    }
    public getDizhendata (opts) {
        const url = `/dizhen/Service.asmx/eqmodels?gml=<?xml version="1.0" encoding="UTF-8"?><gml:FeatureCollection xmlns:fme="http://www.safe.com/gml/fme" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:gml="http://www.opengis.net/gml" xsi:schemaLocation="http://www.safe.com/gml/fme eqp.xsd"><eqparam modeltype="10"><EQID>20190106233315</EQID><longitude>${opts.longitude}</longitude><latitude>${opts.latitude}</latitude><magnitude>${opts.magnitude}</magnitude><angle>${opts.angle}</angle><depth>${opts.depth}</depth></eqparam></gml:FeatureCollection>`
        return this.svc.serverObj.get(url)
    }
    /* public BuildingDown(file){
        const url = `/Building/JZWDT01/demo/file9`
        return this.svc.serverObj.post(url,file)
    } */
    public DamageAnaylse () {
        let t: any = new Date().getTime();
        const url = `/Building/JZWDT01/file/DamageAssessmentResult.gml?t=` + t;
        return this.svc.serverObj.get(url)
    }
    // 监测预警-预警信息-雨情真实列表信息
    public getTyphoonRainList () {
        const url = '/warnapi/dashboard-foshan-service/tLcobtData/v1/getFqYqData';//
        return this.svc.serverObj.get(url + '?type=YQ'
            + '&pageNum=' + '&pageSize=' + '&overValueData=' +
            + '&t=' + new Date().getTime());
    }
    public getFlood (data: any) {
        const url = '/flood/modelcall/model'
        return this.svc.serverObj.post(url, data)
    }




}