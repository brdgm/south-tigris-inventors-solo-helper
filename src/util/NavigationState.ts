import { State } from '@/store/state'
import { RouteLocation } from 'vue-router'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'

export default class NavigationState {

  readonly round : number
  readonly turn : number
  readonly turnOrderIndex : number
  readonly action : number

  constructor(route: RouteLocation, state: State) {    
    this.round = getIntRouteParam(route, 'round')
    this.turn = getIntRouteParam(route, 'turn')
    this.turnOrderIndex = getIntRouteParam(route, 'turnOrderIndex')
    this.action = getIntRouteParam(route, 'action')
  }

}
