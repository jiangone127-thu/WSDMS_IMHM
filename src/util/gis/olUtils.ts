import Map from 'ol/Map'
import View from 'ol/View'
import { getTopLeft, getWidth } from 'ol/extent'
import { Image as ImageLayer, Tile as TileLayer, Vector as VectorLayer, GML as GMLLayer } from 'ol/layer'
import Graticule from 'ol/layer/Graticule';
import { get as getProjection } from 'ol/proj'
import WMTS from 'ol/source/WMTS'
import WMTSTileGrid from 'ol/tilegrid/WMTS'
import { ImageStatic, Vector as VectorSource } from 'ol/source';
import { Point, Polygon, LineString } from 'ol/geom';
import Feature from 'ol/Feature';
import Overlay from 'ol/Overlay';
import StyleUtils from './styleUtils';
import { Stroke, Style, Fill, Circle } from 'ol/style';
import { WindLayer } from 'ol-wind';
import { EsriJSON, GML, GeoJSON } from 'ol/format';
class OlUtils {

    public map: any;
    private styleUtils: any;

    constructor (config: any) {
        const mapConfig = config.map;
        const projection = getProjection('EPSG:4326');
        const projectionExtent = projection.getExtent();
        this.map = new Map({
            layers: [],
            controls: [],
            target: mapConfig.targetId,  //容器对下ID 所在div id
            view: new View({
                center: mapConfig.defaultExtent.center,// 地图所在中心点
                projection: projection,//投影类别
                zoom: mapConfig.defaultExtent.zoom // 初始化图层
            })
        });
        this.addLayer(config.baseLayers);
        this.addLayer(config.vectorLayers);
        this.styleUtils = new StyleUtils();
        console.log("初始化完成", this.map);


    }


    public addLayer (data: any) {
        if (data instanceof Array) {
            data.forEach((item) => {
                if (item) {
                    switch (item.type) {
                        case "WMTS":
                            this.map.addLayer(this.addWmtsLayer(item));
                            break
                        case "VectorLayer":
                            this.map.addLayer(this.addVectorLayer(item));
                            break
                    }

                }
            })
        } else {
            if (data) {
                switch (data.type) {
                    case "WMTS":
                        this.map.addLayer(this.addWmtsLayer(data));
                        break
                    case "VectorLayer":
                        this.map.addLayer(this.addVectorLayer(data));
                        break
                }
            }
        }
    }

    /*
    泰森多边形雨量分布图，和站点位置
     */
    public addThiesenData (geojson) {
        this.clear("thiesenLayer");
        const esrijsonFormat = new EsriJSON();
        if (geojson) {
            let features = esrijsonFormat.readFeatures(geojson);
            features.forEach((ele) => {
                let prop = ele.getProperties();
                console.log(ele);
                let level = prop.level ? prop.level : 0;
                ele.setStyle(this.styleUtils.getThiesenStyle(level));
            });
            let thiesenLayer = this.findLayer("thiesenLayer");
            thiesenLayer.getSource().addFeatures(features);
        }
    }
    public parseDom () {
        var div = document.createElement('div')
        //var url = './img/gis/小红旗32.gif'
        var childEle = document.createElement('h4')
        childEle.innerText = '覆盖物';
        //childEle.style.backgroundImage = 'url( ' + url + ')'
        //childEle.style.width = '32px'
        //childEle.style.height = '32px'
        div.appendChild(childEle)
        return div.childNodes[0]
    }

    public addPopup (coordinate) {
        let html = this.parseDom() /* `
                <div id="popup" class="ol-popup">
                  <a href="#" id="popup-closer" class="ol-popup-closer"></a>
                  <div id="popup-content">我是测试的</div>
                </div>`; */
        let overlay = new Overlay({
            element: html,
            /* autoPan: true,
            autoPanAnimation: {
                duration: 250
            }, */
            positioning: "bottom-center",
            stopEvent: false,
            offset: [0, -50],
        });
        overlay.setPosition(coordinate);
        this.map.addOverlay(overlay)
    }

    /**
     * emap点位上图
     * @param data 数据列表 {longitude ,latitude ,id ...}
     * @param layer  图层对象
     * @param symbol  点位样式
     */
    public addMarker (data: any, layerId: any): any {
        let eles: any = [];
        const layer = this.findLayer(layerId);
        layer.setZIndex(100)
        if (data instanceof Array) {
            data.forEach((ele) => {
                let pointFeature = new Feature({
                    geometry: new Point([ele.longitude * 1, ele.latitude * 1])
                });
                let style = this.styleUtils.getMakerStyle(ele.symbol);
                pointFeature.setStyle(style);
                //设置回调函数
                pointFeature.setProperties({
                    callback: this.featureCallBack,
                    callbackParams: { feature: pointFeature, item: ele, _this: this }
                });
                eles.push(pointFeature);
            })
        } else {
            let pointFeature = new Feature(new Point([data.longitude * 1, data.latitude * 1]));
            pointFeature.setStyle(
                this.styleUtils.getMakerStyle(data.symbol)
            );
            //设置回调函数
            pointFeature.setProperties({
                callback: this.featureCallBack,
                callbackParams: { feature: pointFeature, item: data, _this: this }
            });
            eles.push(pointFeature);
        }
        layer.getSource().addFeatures(eles);
    }
    /**
     * 设置feature点击回调事件
     * @param ele
     * @param map
     */
    private featureCallBack (ele: any, map?: any) {
        console.log(ele, "ele")
        const point: any = new Point({
            x: ele.item.x * 1,
            y: ele.item.y * 1,
        })
        ele.item.geometry = point
    }


    public setCenter (center: any, level: any) {
        this.map.getView().setCenter(center);
        if (level) {
            this.map.getView().setZoom(level);
        }
    }

    public zoomToExtent (layerId: any) {
        let layer = this.findLayer(layerId);
        if (layer) {
            this.map.getView().fit(layer.getSource().getExtent());
        }
    }

    public addImageLayer (ele) {
        this.removeLayer(ele.id);
        const imageStatic = new ImageStatic(
            {
                url: ele.url,
                imageExtent: ele.extent
            }
        );
        const vector = new ImageLayer({
            source: imageStatic,
        });
        vector.set("id", ele.id);
        this.map.addLayer(vector);
    }
    /**
     * 添加点线面要素
     * @param json url地址
     */
    public addFeaturesLayer (json: any, type: any) {
        const vector = new VectorLayer({
            source: new VectorSource({
                url: json,
                format: new GeoJSON(),
            }),
            style: (feature: any) => {
                if (type == "After") {
                    return this.styleUtils.getHuapo(feature.get("risklevel"))
                }
                if (type == "Before") {
                    return new Style({
                        stroke: new Stroke({
                            color: "#07e08c", // '#bdbdbd','#818181',//'#a0a0a0',
                            width: 3
                        })
                    })
                }
            },
        })
        vector.set('id', 'fireline')
        this.map.addLayer(vector)
    }
    public addGeometry (json: any, layerId: string, type: string, cb?: any) {
        const GeojsonFormat = new GeoJSON();
        if (json) {
            let features = GeojsonFormat.readFeatures(json.json);
            let style: any;
            let fill: any;
            if (type == "earthquake") style = this.styleUtils.getEarthQuakeStyle(json.id);
            else if (type == "Huapo" && json.id) style = this.styleUtils.getHuapo(json.id);
            else {
                if (json.id == 4) { fill = new Fill({ color: 'rgba(129,18,5,0.2)' }) }
                else if (json.id == 3) { fill = new Fill({ color: 'rgba(247,51,20,0.2)' }) }
                else if (json.id == 2) { fill = new Fill({ color: 'rgba(247,131,20,0.2)' }) }
                else if (json.id == 1) { fill = new Fill({ color: 'rgba(247,218,20,0.2)' }) }
                else if (json.id == 0) { fill = new Fill({ color: 'rgba(20,247,25,0.2)' }) } //rgba(20,247,25,0.2
                else {
                    fill = new Fill({ color: 'rgba(96,233,255,0.2)' })
                }
                style = new Style({ fill: fill, stroke: new Stroke({ color: '#faf6f6', width: 1 }) })
            }
            //设置样式
            features.forEach((ele) => {
                ele.setStyle(style);
            })
            let layer = this.findLayer(layerId);
            layer.getSource().addFeatures(features);
        }

    }
    /* public addEsriJsonData(json,layerId):void{
         this.clear(layerId);
         const esrijsonFormat = new (ol as any).format.EsriJSON();
         if (json) {
             let features = esrijsonFormat.readFeatures(json);
             const style:any=new (ol as any).style.Style({
                 fill: new (ol as any).style.Fill({
                     color: 'rgba(96,233,255,0.2)',

                 }),
                 stroke: new (ol as any).style.Stroke({
                     color: '#2cdfff', // '#bdbdbd','#818181',//'#a0a0a0',
                     width: 1
                 })
             })
             //设置样式
             features.forEach((ele) => {
                 ele.setStyle(style);
             })
             let layer = this.findLayer(layerId);
             layer.source.addFeatures(features);
         }
     }*/

    /**
     * 添加佛山轮廓
     */
    public addFoshanBoundary () {
        let vector = new VectorLayer({
            source: new VectorSource({
                url: './json/foshan.geojson',
                format: new EsriJSON()
            }),
            zIndex: 4,
            style: (feature) => {
                return this.styleUtils.getBoundaryStyle(feature.get('CityName'));
            }
        });
        this.map.addLayer(vector);
    }

    public changeBaseLayer (type: string) {
        const vec: any = this.findLayer("tdt_vec");
        const cva: any = this.findLayer("tdt_cva");
        const img: any = this.findLayer("tdt_img");
        const cia: any = this.findLayer("tdt_cia");
        const yzt: any = this.findLayer("ZRZYT_YXDT");
        console.log(yzt)
        switch (type) {
            case "vec":
                vec.setVisible(true);
                cva.setVisible(true);
                img.setVisible(false);
                cia.setVisible(false);
                yzt.setVisible(false);
                break
            case "img":
                yzt.setVisible(false);
                vec.setVisible(false);
                cva.setVisible(false);
                img.setVisible(true);
                cia.setVisible(true);
                break
            case "YZ":
                vec.setVisible(false);
                cva.setVisible(false);
                img.setVisible(false);
                cia.setVisible(false);
                yzt.setVisible(true);
                break

        }

    }

    /**
     * 添加wmts图层
     * @param param
     */
    private addWmtsLayer (param) {
        const projection = getProjection('EPSG:4326');
        const projectionExtent = projection.getExtent();
        let resolutions = new Array()
        let matrixIds = new Array()
        if (param.resolutions) {
            resolutions = param.resolutions;
            for (let z = 0, len = resolutions.length; z < len; ++z) {
                matrixIds[z] = z;
            }
        } else {
            const size = getWidth(projectionExtent) / 256
            for (let z = 0; z < 21; ++z) {
                resolutions[z] = size / Math.pow(2, z)
                matrixIds[z] = z
            }
        }
        const wmtsLayer = new TileLayer({
            opacity: 1,
            id: param.id,//'img',
            visible: param.visible,
            source: new WMTS({
                url: param.url,//'http://t0.tianditu.gov.cn/img_c/wmts?tk=4f62e1d82bd46e2ff470b291c2260156',
                layer: param.layer,//'img',
                id: param.id,//'img',
                matrixSet: param.matrixSet,// 'c',
                format: param.format,//'tiles',
                projection: projection,
                tileGrid: new WMTSTileGrid({
                    origin: getTopLeft(projectionExtent),
                    resolutions: resolutions,
                    matrixIds: matrixIds
                }),
                wrapX: true
            })
        })
        return wmtsLayer;

    }

    private addVectorLayer (param) {
        const source = new VectorSource();
        const vector = new VectorLayer({
            source: source,
        });
        vector.set("id", param.id);
        if (param.zIndex) {
            vector.setZIndex(param.zIndex * 1);
        }
        return vector;
    }

    private findLayer (id) {
        const layers: any = this.map.getLayers();
        let result: any;
        layers.forEach((ele) => {
            if (ele.get("id") == id) {
                result = ele;
            }
        })
        return result;
    }

    /**
     * 添加经纬线
     */
    public addGraticule () {
        let graticuleLayer = new Graticule({
            // the style to use for the lines, optional.
            id: "graticuleLayer",
            strokeStyle: new Stroke({
                color: 'rgba(255,120,0,0.9)',
                width: 2,
                lineDash: [0.5, 4]
            }),
            showLabels: true,
            wrapX: false
        });
        this.map.addLayer(graticuleLayer);
    }

    public clear (id: any): any {
        if (id) {
            const layer = this.findLayer(id);
            if (layer) {
                layer.getSource().clear();
            }
        } else {
            const lays = this.map.getLayers();
            lays.forEach((element: any) => {
                if (element instanceof VectorLayer) {
                    element.getSource().clear();
                }
            })
        }
    }

    public removeLayer (id: any) {
        let layer = this.findLayer(id);
        if (layer) {
            this.map.removeLayer(layer);
        }
    }

    public removeOverlay (id: string) {
        if (id) {
            const overlay = this.map.getOverlayById(id);
            if (overlay) {
                this.map.removeOverlay(overlay);
            }
        } else {
            const overlays = this.map.getOverlays();
            console.log(overlays);
            console.log(overlays.getArray());
            if (overlays && overlays.getArray().length > 0) {
                overlays.getArray().forEach((ele) => {

                    this.map.removeOverlay(ele);
                })
            }
        }

    }
    public addLine (data, layerId) {
        const layer = this.findLayer(layerId);
        let geoms: any = []
        data.forEach(element => {
            let feature = new Feature({
                geometry: new LineString(element.posList)
            });
            feature.setStyle(this.styleUtils.getTraffic(element.mins));
            geoms.push(feature)
        })
        layer.getSource().addFeatures(geoms)
    }

    public showOlWind (data) {
        console.log(eval(data))
        let windLayer: any = new WindLayer(eval(data), {
            forceRender: false,
            windOptions: {
                // colorScale: scale,
                // velocityScale: 5 / 100,
                //  paths: 8000,
                // eslint-disable-next-line no-unused-vars
                colorScale: () => {
                    // console.log(m);
                    return '#ff473c';
                },
                // width: 5,
                // colorScale: scale,
                globalAlpha: 0.9,
                generateParticleOption: false,
                maxAge: 90,
                paths: 8000,
                velocityScale: 1 / 25,
                lineWidth: 3,  //粒子路径宽度
                frameRate: 40, //帧率（ms）
                particleMultiplier: 1 / 30 //粒子路径数量的系数
            },
            // map: map,
            projection: 'EPSG:4326'
        });
        windLayer.set("id", "olWindLayer");


        this.map.addLayer(windLayer);

        console.log(this.findLayer('olWindLayer'));

    }


}

export default OlUtils
