import Vue from 'vue'

import router from './routers/index'

import App from './App.vue'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.use(Antd);


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
