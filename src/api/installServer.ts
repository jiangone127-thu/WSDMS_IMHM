const publicPath = require('../config/index').jsonPath;
const serverPath = require('../config/index').servePath;
import injectFilter from '../filter/RequireFilter'
import { GisServer } from './service/GisServer';
import { DisasterServer } from './service/DisasterServer';
import { SzFireModelServe } from '@/api/service/szFireModelServe'

const gisServer = new GisServer({ baseURL: publicPath }, injectFilter);
const disasterServer = new DisasterServer({ baseURL: ''}, injectFilter);
const szFireModelServe = new SzFireModelServe({ baseURL: '/sz' },injectFilter);


export {

    gisServer,
    disasterServer,
    szFireModelServe
};
