import { RouteRecordRaw } from 'vue-router'
import createRouterMatomoTracking from '@brdgm/brdgm-commons/src/util/router/createRouterMatomoTracking'
import { name, version, appDeployName } from '@/../package.json'
import AppHome from '@/views/AppHome.vue'
import NotFound from '@/views/NotFound.vue'
import SetupApp from '@/views/SetupApp.vue'
import SetupBot from '@/views/SetupBot.vue'
import RoundStart from '@/views/RoundStart.vue'
import RoundTurnPlayer from '@/views/RoundTurnPlayer.vue'
import RoundTurnBot from '@/views/RoundTurnBot.vue'
import RoundEnd from '@/views/RoundEnd.vue'

const LOCALSTORAGE_KEY = `${name}.route`

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'AppHome',
    component: AppHome
  },
  { 
    path: '/setup',
    name: 'SetupApp',
    component: SetupApp
  },
  {
    path: '/setupBot',
    name: 'SetupBot',
    component: SetupBot
  },
  {
    path: '/round/:round/start',
    name: 'RoundStart',
    component: RoundStart
  },
  {
    path: '/round/:round/turn/:turn/:turnOrderIndex/player',
    name: 'RoundTurnPlayer',
    component: RoundTurnPlayer
  },
  {
    path: '/round/:round/turn/:turn/:turnOrderIndex/bot',
    name: 'RoundTurnBot',
    component: RoundTurnBot
  },
  {
    path: '/round/:round/turn/:turn/:turnOrderIndex/bot/action/:action',
    name: 'RoundTurnBotAction',
    component: RoundTurnBot
  },
  {
    path: '/round/:round/end',
    name: 'RoundEnd',
    component: RoundEnd
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

export default createRouterMatomoTracking(routes, LOCALSTORAGE_KEY, appDeployName, version, 'AppHome')