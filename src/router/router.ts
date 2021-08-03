import Vue from 'vue';
import Router from 'vue-router';
import layoutMain from "@/views/theme/classic/LayoutMain.vue";
/**
 * 解决导航栏重复点击路由报错
*/
import homeView from '@/views/theme/home.vue'
import fireView from '@/views/theme/fireassembly/fireView.vue'
import trafficView from '@/views/theme/traffic/trafficView.vue'
import earthquakeView from '@/views/theme/earthquake/earthquakeView.vue'
import waterLoggingView from '@/views/theme/water-logging/waterLoggingView.vue'
import ArchitectureView from '@/views/theme/Architecture/ArchitectureView.vue'
import Addressdisaster from '@/views/theme/Addressdisaster/AddressdisasterView.vue'
import fireModelView from '@/views/theme/fire/fireView.vue'
import fsfireView from '@/views/theme/fs-disaster/fireView.vue'
// 英文版——EN
import homeView_EN from '@/views/theme/home-new.vue'
import DMCMS from '@/views/theme/fs-disaster/fireView_EN.vue'
import DMSCOOS from '@/views/theme/fireassembly/fireassembly_EN/fireView_EN.vue'
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return (originalPush.call(this, location) as any).catch((err) => err)
}

Vue.use(Router);
const constantRoutes = [
  {
    path: '/',
    component: layoutMain,
    redirect: '/home'
  },
  {
    path: '/home',
    component: homeView,
  },
  // 英文版入口
  {
    path: '/homeEN',
    component: homeView_EN,
  },
  // 交通模型
  {
    path: '/trafficView',
    component: trafficView,
  },
  // 地震模型
  {
    path: '/earthquakeView',
    component: earthquakeView,
  },
  // 洪涝模型
  {
    path: '/waterLoggingView',
    component: waterLoggingView,
  },
  // 建筑倒塌模型
  {
    path: '/ArchitectureView',
    component: ArchitectureView,
  },
  // 地质
  {
    path: '/Addressdisaster',
    component: Addressdisaster,
  },
  // 火灾模型
  {
    path: '/fireModelView',
    component: fireModelView,
  },
  //
  {
    path: '/fireView',
    component: fireView,
  },
  // 灾害链-佛山市
  {
    path: '/fsfireView',
    component: fsfireView,
  },
  // DMCMS
  {
    path: '/DMCMS',
    component: DMCMS,
  },
  // DMSCOOS
  {
    path: '/DMSCOOS',
    component: DMSCOOS,
  }
];
const createRouter = () =>
  new Router({
    mode: 'hash', // require service support
    base: process.env.BASE_URL,
    routes: constantRoutes,
  });
const router = createRouter();

export default router;
