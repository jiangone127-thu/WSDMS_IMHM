
import { RequestServerClass } from '../../util/request';

export class GisServer {

    public svc: any;
    constructor(params: any, axiosFilterFn?: any) {
        this.svc = new RequestServerClass(params);
        axiosFilterFn.call(this, this.svc.serverObj)
    }

    public getMapConfig () {
        const url = './json/map.json';
        return this.svc.serverObj.get(url);
    }
    public getTyphoonConfig() {
        const url = './json/typhoon.json';
        return this.svc.serverObj.get(url);
    }
    public getThiesenData() {
        const url = './json/thiesen.json';
        return this.svc.serverObj.get(url);
    }
    public getXmlData(){
        const url = '../Xml_Result.xml';
        return this.svc.serverObj.get(url);
    }
    public getXmlPoint(){
        const url = '../Xml_Point.xml';
        return this.svc.serverObj.get(url);
    }


}
