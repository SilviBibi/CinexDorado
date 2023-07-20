import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App)
app.use(createPinia(), VueAxios, axios) // 👈
app.mount('#app')
