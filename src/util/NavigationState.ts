import { State } from '@/store/state'
import { RouteLocation } from 'vue-router'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'
import CardDeck from '@/services/CardDeck'
import Player from '@/services/enum/Player'

export default class NavigationState {

  readonly round : number
  readonly turn : number
  readonly turnOrderIndex : number
  readonly player : Player
  readonly action : number
  readonly cardDeck: CardDeck

  constructor(route: RouteLocation, state: State) {    
    this.round = getIntRouteParam(route, 'round')
    this.turn = getIntRouteParam(route, 'turn')
    this.turnOrderIndex = getIntRouteParam(route, 'turnOrderIndex')
    this.player = (route.name == 'RoundTurnPlayer') ? Player.PLAYER : Player.BOT
    this.action = getIntRouteParam(route, 'action')
    this.cardDeck = CardDeck.new(1, state.setup.difficultyLevel)
  }

}
