
import { createApp } from 'vue'
import App from './App.vue'

import { createMemoryHistory, createRouter } from 'vue-router'

import List from './components/List.vue'
import Learning from './components/Learning.vue'
import New from './components/New.vue'
import Quiz from './components/Quiz.vue'
import Edit from './components/Edit.vue'

const routes = [
  { path: '/', component: List },
  { path: '/learn' , component: Learning} , 
  { path: '/new' , component: New} , 
  { path: '/quiz' , component: Quiz } , 
  { path: '/edit' , component: Edit}
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

createApp(App)
    .use(router)
    .mount('#app')
