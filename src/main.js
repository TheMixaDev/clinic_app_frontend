import 'mdb-vue-ui-kit/css/mdb.min.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css'

import Multiselect from 'vue-multiselect'

createApp(App).component('multiselect', Multiselect).component('Datepicker', Datepicker).component('QuillEditor', QuillEditor).use(router).mount('#app')
