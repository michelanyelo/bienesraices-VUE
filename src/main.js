import './assets/main.css'
// mdi icons
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// firebase
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './config/firebase'


import App from './App.vue'
import router from './router'

const app = createApp(App)

// vuetify
const vuetify = createVuetify({
  components,
  directives,
})

// firebase
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()]
})

app.use(vuetify)

app.use(createPinia())
app.use(router)

app.mount('#app')
