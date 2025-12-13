import { BotPersistence, BotResources, State } from '@/store/state'
import { RouteLocation } from 'vue-router'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'
import CardDeck from '@/services/CardDeck'
import Player from '@/services/enum/Player'
import { MAX_TURN } from './getTurnOrder'
import { cloneDeep } from 'lodash'
import getDifficultyLevelSettings from './getDifficultyLevelSettings'
import BotActions from '@/services/BotActions'
import getWorkerCount from './getWorkerCount'
import getTentPlacedInfo from './getTentPlacedInfo'

export default class NavigationState {

  readonly round : number
  readonly turn : number
  readonly turnOrderIndex : number
  readonly player : Player
  readonly action : number
  readonly cardDeck: CardDeck
  readonly botActions? : BotActions
  readonly botResources : BotResources
  readonly tentPlaced : Player[]

  constructor(route: RouteLocation, state: State) {    
    this.round = getIntRouteParam(route, 'round')
    this.turn = getIntRouteParam(route, 'turn')
    this.turnOrderIndex = getIntRouteParam(route, 'turnOrderIndex')
    this.player = (route.name == 'RoundTurnBot' || route.name == 'RoundTurnBotAction') ? Player.BOT : Player.PLAYER
    this.action = getIntRouteParam(route, 'action')

    const lookupTurn = (isRoundEndRoute(route) || isGameEndRoute(route)) ? MAX_TURN : this.turn
    const lookupRound = isGameEndRoute(route) ? 4 : this.round
    const botPersistence = getBotPersistence(state, lookupRound, lookupTurn, this.turnOrderIndex)
    this.cardDeck = CardDeck.fromPersistence(botPersistence.cardDeck)
    this.botResources = cloneDeep(botPersistence.botResources)
    this.tentPlaced = getTentPlacedInfo(state, lookupRound, lookupTurn, this.turnOrderIndex).tentPlaced

    if (this.player == Player.BOT) {
      this.botActions = BotActions.drawCard(this.cardDeck, botPersistence.botResources, this.tentPlaced.includes(Player.BOT))
    }
  }

}

function getBotPersistence(state:State, round:number, turn:number, turnOrderIndex:number) : BotPersistence {
  const roundData = state.rounds.find(item => item.round==round)

  // get from previous turn
  const lastTurn = roundData?.turns.toSorted((item1,item2) => item1.turn==item2.turn ? item1.turnOrderIndex - item2.turnOrderIndex : item1.turn - item2.turn)
      .findLast(item => item.turn < turn || (item.turn == turn && item.turnOrderIndex < turnOrderIndex))
  if (lastTurn) {
    return lastTurn.botPersistence
  }

  // get initial card deck prepared for this round
  const initialCardDeck = roundData?.initialCardDeck ?? CardDeck.new(round, state.setup.difficultyLevel).toPersistence()

  // get botResources from previous round
  let botResources : BotResources
  if (round > 1) {
    // from previous round: add 3 silver, start with new workers
    const previousRoundBotResource = getBotPersistence(state, round-1, MAX_TURN, 0).botResources
    botResources = {
      silver: previousRoundBotResource.silver + 3,
      workers: getWorkerCount(round)
    }
  }
  else {
    botResources = {
      silver: 3 + (getDifficultyLevelSettings(state.setup.difficultyLevel).additionalSetupSilver ?? 0),
      workers: getWorkerCount(round)
    }
  }
  return {
    cardDeck: initialCardDeck,
    botResources: botResources
  }
}

function isRoundEndRoute(route:RouteLocation) : boolean {
  return route.name == 'RoundEnd'
}

function isGameEndRoute(route:RouteLocation) : boolean {
  return route.name == 'GameEnd'
}
