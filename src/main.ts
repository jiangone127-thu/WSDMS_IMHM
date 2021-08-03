import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store/index';
import 'babel-polyfill';


// 全局注册echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;
import 'element-ui/packages/theme-chalk/lib/index.css';
import 'ol/ol.css';
import * as ElementUI from 'element-ui';

Vue.prototype.$Bus = new Vue();
Vue.config.productionTip = false;

Vue.use(ElementUI);
// @ts-ignore
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
