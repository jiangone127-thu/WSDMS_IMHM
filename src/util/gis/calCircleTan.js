
let component = ComponentBase.extend({
    /**
 * 计算外切圆
 * ele 轨迹点element
 * type 类型 默认中国
 */
    _getForecastCircleTan: async function (ele, type) {
        const self = this;
        type = type ? type : '中国';
        const path = this.tf.forecastLines[ele._tfbh][type];
        const pathGeojson = path.geometry.asGeoJson().coordinates[0];
        const pathLine = turf.lineString(pathGeojson);
        let polygonSymbol = RenderUtil.object2Symbol(this.options.forecast.polygonStyle);
        const startPoint = [parseFloat(ele.geometry.x), parseFloat(ele.geometry.y)];
        const prop = ele._data.properties;
        const realTime = new Date(prop.time.replace("T", " "));
        let forecast = null;
        prop.forecast.forEach((f) => {
            if (f.region === '中国') {
                forecast = f;
            }
        });
        let pointListLength = 0;
        let circlePoly = null;
        let circleGeojsonList = [];
        let circleList = [];
        forecast.features.forEach((feature, index) => {
            const time = new Date(feature.properties.time.replace("T", " "));
            const timeDiff = (time - realTime) / (1000 * 60 * 60);
            let radius = self._calRadiusByTimeDiff(timeDiff);
            if (radius > 0) {
                const center = g2.sfs.GeometryFactory.createGeometryFromGeoJson(
                    feature.geometry,
                    this.options.dataSpatialReference
                );
                radius = self._calRadius(center, radius * 1000);
                const circle = new g2.sfs.Circle({
                    radius,
                    center,
                    spatialReference: this.options.dataSpatialReference,
                });

                let insideFlag = turf.booleanPointInPolygon(startPoint, circle.asGeoJson());
                if (!insideFlag) {
                    circleList.push(circle);
                    circleGeojsonList.push(circle.asGeoJson());
                    pointListLength++
                }
            }
        });
        let pointList = new Array(pointListLength * 2 + 1);
        // 循环预测点 创建圆
        circleList.forEach((circle, index) => {
            const circleGeojson = circle.asGeoJson().coordinates;
            circlePoly = circle.asGeoJson();
            const polygon = turf.polygon(circleGeojson);
            let point = null;
            let point1, point2;// 第一个圆算出的两个切点
            if (index === 0) {// 第一个圆，计算圆和实际点的正切（两个）
                const pointArray = startPoint;
                pointList[0] = pointArray;
                point = turf.point(pointArray);
                var tangents = turf.polygonTangents(point, polygon);
                tangents.features.forEach((feature, i) => {
                    const pos = g2.sfs.GeometryFactory.createGeometryFromGeoJson(
                        feature.geometry,
                        self.options.dataSpatialReference
                    );
                    if (i == 0) {
                        point1 = [pos.x, pos.y];
                        pointList[1] = point1;
                    } else {
                        point2 = [pos.x, pos.y];
                        pointList[pointList.length - 1] = point2;
                    }
                });


            } else {// 之后每一个圆 计算和前面一个圆的2两个正切点 各自的正切点
                // TODO 待改，先按简单算法走通流程
                point = pointList[index];
                let insideFlag = turf.booleanPointInPolygon(point, polygon);
                let posGeometry;
                if (!insideFlag) {
                    var tangents = turf.polygonTangents(point, polygon);
                    let intersects_first_1 = { intersects: {}, feature: {} },
                        intersects_first_2 = { intersects: {}, feature: {} }, intersects_first_final = null;
                    tangents.features.forEach((feature, i) => {
                        var line1 = turf.lineString([point, feature.geometry.coordinates]);
                        var intersects = turf.lineIntersect(line1, pathLine);
                        if (i === 0) {
                            intersects_first_1.intersects = intersects;
                            intersects_first_1.feature = feature;
                        } else if (i === 1) {
                            intersects_first_2.intersects = intersects;
                            intersects_first_2.feature = feature;
                        }
                    });
                    if ((intersects_first_1.intersects.features && intersects_first_1.intersects.features.length <= 0) && (intersects_first_2.intersects.features && intersects_first_2.intersects.features.length > 0)) {
                        intersects_first_final = intersects_first_1;
                    } else if ((intersects_first_1.intersects.features && intersects_first_1.intersects.features.length > 0) && (intersects_first_2.intersects.features && intersects_first_2.intersects.features.length <= 0)) {
                        intersects_first_final = intersects_first_2;
                    } else if ((intersects_first_1.intersects.features && intersects_first_1.intersects.features.length <= 0) && (intersects_first_2.intersects.features && intersects_first_2.intersects.features.length <= 0)) { // 计算出的两个切点 都和预警线不相交的情况下，判断角度大的
                        let coords1 = intersects_first_1.feature.geometry.coordinates;
                        let coords2 = intersects_first_2.feature.geometry.coordinates;
                        let angle_1 = this._calAngleByThreePoints({ x: point[0], y: point[1] }, {
                            x: pointList[index - 1][0],
                            y: pointList[index - 1][1]
                        }, { x: coords1[0], y: coords1[1] });
                        let angle_2 = this._calAngleByThreePoints({ x: point[0], y: point[1] }, {
                            x: pointList[index - 1][0],
                            y: pointList[index - 1][1]
                        }, { x: coords2[0], y: coords2[1] });
                        if (angle_1 >= angle_2) {
                            intersects_first_final = intersects_first_1;
                        } else {
                            intersects_first_final = intersects_first_2;
                        }
                    } else {
                        intersects_first_final = intersects_first_1;
                    }
                    posGeometry = intersects_first_final.feature.geometry;
                } else {
                    posGeometry = { coordinates: point };
                }
                pointList[index + 1] = posGeometry.coordinates;

                let point2 = pointList[pointList.length - index];
                insideFlag = turf.booleanPointInPolygon(point2, polygon);

                if (!insideFlag) {
                    let intersects_second_1 = { intersects: {}, feature: {} },
                        intersects_second_2 = { intersects: {}, feature: {} }, intersects_second_final = null;

                    var tangents = turf.polygonTangents(point2, polygon);
                    // console.log(tangents);
                    tangents.features.forEach((feature, i) => {
                        var line1 = turf.lineString([point2, feature.geometry.coordinates]);
                        var intersects = turf.lineIntersect(line1, pathLine);
                        if (i === 0) {
                            intersects_second_1.intersects = intersects;
                            intersects_second_1.feature = feature;
                        } else if (i === 1) {
                            intersects_second_2.intersects = intersects;
                            intersects_second_2.feature = feature;
                        }
                    });
                    if ((intersects_second_1.intersects.features && intersects_second_1.intersects.features.length <= 0) && (intersects_second_2.intersects.features && intersects_second_2.intersects.features.length > 0)) {
                        intersects_second_final = intersects_second_1;
                    } else if ((intersects_second_1.intersects.features && intersects_second_1.intersects.features.length > 0) && (intersects_second_2.intersects.features && intersects_second_2.intersects.features.length <= 0)) {
                        intersects_second_final = intersects_second_2;
                    } else if ((intersects_second_1.intersects.features && intersects_second_1.intersects.features.length <= 0) && (intersects_second_2.intersects.features && intersects_second_2.intersects.features.length <= 0)) { // 计算出的两个切点 都和预警线不相交的情况下，判断角度大的
                        let coords1 = intersects_second_1.feature.geometry.coordinates;
                        let coords2 = intersects_second_2.feature.geometry.coordinates;
                        let angle_1 = this._calAngleByThreePoints({
                            x: point2[0],
                            y: point2[1]
                        }, {
                            x: pointList[pointList.length - index + 1][0],
                            y: pointList[pointList.length - index + 1][1]
                        }, { x: coords1[0], y: coords1[1] });
                        let angle_2 = this._calAngleByThreePoints({
                            x: point2[0],
                            y: point2[1]
                        }, {
                            x: pointList[pointList.length - index + 1][0],
                            y: pointList[pointList.length - index + 1][1]
                        }, { x: coords2[0], y: coords2[1] });
                        if (angle_1 >= angle_2) {
                            intersects_second_final = intersects_second_1;
                        } else {
                            intersects_second_final = intersects_second_2;
                        }
                    } else {
                        intersects_second_final = intersects_second_1;
                    }
                    posGeometry = intersects_second_final.feature.geometry;
                } else {
                    posGeometry = { coordinates: point2 };
                }
                pointList[pointList.length - index - 1] = posGeometry.coordinates;
                //====================================================================
                // 如果是最后一个圆，需要取后半截弧，加到pointList里面
                if (index === forecast.features.length - 1) {
                    circlePoly = circle.asGeoJson();
                }
            }
        });

        var lineString = turf.lineString(pointList);
        var polygon = turf.lineToPolygon(lineString);

        let unionList = [polygon.geometry].concat(circleGeojsonList);
        const union = this._getUnionGeometryByTurf(unionList);
        const geometry = this._getG2GeometryFromGeojson(union);
        const tanEle = new g2.sfs.Element({
            geometry, symbol: polygonSymbol
        });
        this.tf.Layer_forecast[ele._tfbh].add(tanEle);
    },
    _calRadius: function (point, radius) {
        let pi = Math.PI / 180.0;
        let p2x = point.x - 2 / pi * Math.asin((Math.sin(radius / 2 / 6378.137 / 1000) / Math.cos(pi * point.y)));
        return Math.abs(p2x - point.x);
    },
    _calRadiusByTimeDiff: function (timeDiff) {
        let radius = null;
        if (timeDiff > 0 && timeDiff <= 12) {
            radius = 100;
        }
        else if (timeDiff > 12 && timeDiff <= 24) {
            radius = 150;
        }
        else if (timeDiff > 24 && timeDiff <= 36) {
            radius = 165;
        }
        else if (timeDiff > 36 && timeDiff <= 48) {
            radius = 180;
        }
        else if (timeDiff > 48 && timeDiff <= 60) {
            radius = 195;
        }
        else if (timeDiff > 60 && timeDiff <= 72) {
            radius = 210;
        }
        else if (timeDiff > 72 && timeDiff <= 84) {
            radius = 225;
        }
        else if (timeDiff > 84 && timeDiff <= 96) {
            radius = 240;
        }
        else if (timeDiff > 96) {
            radius = 270;
        }
        return radius;
    },
    _getUnionGeometryByTurf: function (list) {
        let geometry = null;
        for (let i = 0; i < list.length; i++) {
            let polygon = turf.polygon(list[i].coordinates);
            if (i === 0) {
                geometry = polygon;
            } else {
                geometry = turf.union(geometry, polygon);
            }
        }
        return geometry.geometry;
    },

    _getG2GeometryFromGeojson: function (geom) {
        const gemoetry = g2.sfs.GeometryFactory.createGeometryFromGeoJson(
            geom,
            this.options.dataSpatialReference
        );
        return gemoetry;
    },

    _calAngleByThreePoints: function (A, B, C) {
        var AB = Math.sqrt(Math.pow(A.x - B.x, 2) + Math.pow(A.y - B.y, 2));
        var AC = Math.sqrt(Math.pow(A.x - C.x, 2) + Math.pow(A.y - C.y, 2));
        var BC = Math.sqrt(Math.pow(B.x - C.x, 2) + Math.pow(B.y - C.y, 2));
        var cosA = (
            Math.pow(AB, 2) + Math.pow(AC, 2) - Math.pow(BC, 2)
        ) / (
                2 * AB * AC
            );
        var angleA = Math.round(Math.acos(cosA) * 180 / Math.PI);
        return angleA;
    },

    /**
         * 各个机构预报信息展示
         */
    _drawForecasts: function (element) {
        var thisObj = this;
        if (!thisObj.tf.forecastPoints[element._tfbh]) {
            thisObj.tf.forecastPoints[element._tfbh] = {};
        }
        if (!thisObj.tf.forecastLines[element._tfbh]) {
            thisObj.tf.forecastLines[element._tfbh] = {};
        }
        if (!thisObj.tf.forecastPolygons[element._tfbh]) {
            thisObj.tf.forecastPolygons[element._tfbh] = {};
        }
        if (!thisObj.tf.Layer_forecast[element._tfbh]) {
            thisObj.tf.Layer_forecast[element._tfbh] = thisObj._createLayer(thisObj.options.layerOrder.typhoonForecast, this.map);
        } else {
            thisObj._forecastsClearByTfbh(element._tfbh);
        }
        let tfInfo = this.tf.paths[element._tfbh];
        let name, nameEn;
        if (tfInfo) {
            if ((tfInfo.name == '-') || (tfInfo.name == '')) {
                name = tfInfo.ename;
            } else {
                name = tfInfo.name;
            }
            nameEn = tfInfo.ename;
        }
        for (var i = 0; i < element._data.properties.forecast.length; i++) {
            var item = element._data.properties.forecast[i];

            /*添加预测路径*/
            var path = new g2.sfs.Path({
                spatialReference: thisObj.options.spatialReference
            }
            );
            //todo 必须显式严格声明,fixed ts-gis 2.0 beta bug;
            path.addPoint(new g2.sfs.Point({
                x: parseFloat(element.geometry.x),
                y: parseFloat(element.geometry.y),
                spatialReference: thisObj.options.spatialReference
            }));
            for (var j = 0; j < item.features.length; j++) {
                var subitem = item.features[j];
                //下述geometry可能不是geometry对象
                var point = new g2.sfs.Point({
                    x: subitem.geometry.coordinates[0],
                    y: subitem.geometry.coordinates[1],
                    spatialReference: thisObj.options.spatialReference
                });
                //var markerSymbol = thisObj.getStrongStyle(subitem.properties.speed);
                var objStyle = thisObj._getTyphoonPointStyle(subitem.properties.speed);
                var markerSymbol = new g2.sfs.SimpleMarkerSymbol({
                    fillColor: new g2.sfs.Color.fromHex(objStyle.fillColor),
                    borderColor: new g2.sfs.Color.fromHex(objStyle.borderColor),//"#80808C"
                    size: objStyle.radius - 1
                });
                var pointMarker = new g2.sfs.Element({ geometry: point, symbol: markerSymbol });
                subitem.region_ab = item.region_ab;
                subitem.region = item.region;
                subitem.tfName = name;
                subitem.tfNameEn = nameEn;
                subitem.tfbh = element._tfbh;
                pointMarker.data_user = subitem;
                pointMarker._forecast = 1;//ts-gis hiTest无法区分图层

                if (this.tf.forecastPoints[element._tfbh][subitem.region] == undefined) {
                    this.tf.forecastPoints[element._tfbh][subitem.region] = [];
                }
                this.tf.forecastPoints[element._tfbh][subitem.region].push(pointMarker);
                this.tf.Layer_forecast[element._tfbh].add(pointMarker);
                this.tf.Layer_forecast[element._tfbh].showElement(pointMarker, this.options.forecast.org[subitem.region].display);
                // this.tf.Layer_forecast.add(pointMarker);
                // this.tf.Layer_forecast.showElement(pointMarker, this.options.forecast.org[subitem.region].display);
                path.addPoint(point);
            }
            var polyline = new g2.sfs.Polyline({
                spatialReference: thisObj.options.spatialReference
            });
            polyline.addGeometry(path);
            var ploylineSymbol = thisObj._getRegineColor(item.region);
            var polylineElement = new g2.sfs.Element({ geometry: polyline, symbol: ploylineSymbol });
            this.tf.Layer_forecast[element._tfbh].add(polylineElement);
            this.tf.Layer_forecast[element._tfbh].showElement(polylineElement, this.options.forecast.org[subitem.region].display);
            // this.tf.Layer_forecast.add(polylineElement);
            // this.tf.Layer_forecast.showElement(polylineElement, this.options.forecast.org[subitem.region].display);            
            this.tf.forecastLines[element._tfbh][item.region] = polylineElement;
        }
    },
    /**
 * 机构预报信息清除
 */
    _forecastsClearByTfbh: function (tfbh) {
        if (!this.tf.Layer_forecast) return;
        this.tf.Layer_forecast[tfbh].clear();
        // for (var i = 0; i < this.tf.forecastPoints[tfbh].length; i++) {
        //     this.tf.Layer_forecast.remove(this.tf.forecastPoints[tfbh][i]);
        // }
        // for (var j = 0; j < this.tf.forecastPoints[tfbh].length; j++) {
        //     this.tf.Layer_forecast.remove(this.tf.forecastPoints[tfbh][j]);
        // }        
        this.tf.forecastPoints[tfbh] = {};
        this.tf.forecastLines[tfbh] = {};
        this.tf.forecastPolygons[tfbh] = {};

    },
     /*
     * 根据风速获取台风点样式对象
     * @param speed  风速,单位 米/秒（m/s）
     */
    _getTyphoonPointStyle: function (speed) {
        speed = speed ? speed : 0;
        var obj = this._getTyphoonGrade(speed);
        var pointStyle = {
            fillColor: obj.color,
            borderColor: '#80808C',
            weight: 0.5,
            opacity: 153,
            fillOpacity: 255,
            // lineCap:'round',
            fill: true,
            // zIndexOffset:5
            radius: 5
        };
        return pointStyle;

    },
    
    _getRegineColor: function (regionCode) {
        var color = null;
        color = this.options.forecast.org[regionCode.trim()].rgb;
        if (color == undefined) {

            color = this.options.forecast.org['null'];
        }
        color = new g2.sfs.Color.fromHex(color);
        //线型为2——DashDotDot
        var polylineSymbol = new g2.sfs.SimpleLineSymbol({
            color: color,
            width: this.options.forecast.lineStyle.width,
            style: this.options.forecast.lineStyle.style
        });
        polylineSymbol.color.a = this.options.forecast.lineStyle.opacity;
        return polylineSymbol;
    },
})