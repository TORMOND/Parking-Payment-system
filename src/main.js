import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
//  import { } from '@fortawesome/free-regular-svg-icons';
 library.add(fas, fab)

createApp(App).use(store).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
