import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vue3GoogleLogin from 'vue3-google-login'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vue3GoogleLogin, {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_API,
  prompt: 'consent', 
  prompt_parent_id: 'prompt',
  cancel_on_tap_outside: false
})

// app.component('AlertMessage', AlertMessage);
// app.component('FormGroup', FormGroup);

app.mount('#app')
