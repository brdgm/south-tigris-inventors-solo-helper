import Player from '@/services/enum/Player'
import TentSpace from '@/services/enum/TentSpace'
import { State } from '@/store/state'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'

/**
 * Get information about placed tents this round.
 * @param state Game state
 * @param round Current round
 * @param turn Current turn
 * @param turnOrderIndex Current turn order index
 * @returns Tent placed information
 */
export default function getTentPlacedInfo(state : State, round : number, turn : number, turnOrderIndex : number) : TentPlacedInfo {
  const roundData = state.rounds.find(item => item.round==round)
  const turns = roundData?.turns.filter(item => item.turn < turn || (item.turn == turn && item.turnOrderIndex < turnOrderIndex)) ?? []
  
  const tentPlaced = turns.filter(item => item.tentPlaced != undefined).map(item => item.player) ?? []
  const playerSpace = turns.find(item => item.player == Player.PLAYER && item.tentPlaced != undefined)?.tentPlaced
  const botSpace = turns.find(item => item.player == Player.BOT && item.tentPlaced != undefined)?.tentPlaced

  const botAdditionalDiceSchemeCard = (botSpace == TentSpace.HIRE_CAMEL)
  const botAdditionalWorkerSchemeCard = (botSpace == TentSpace.ENVOY)

  const tentSpaces = getAllEnumValues(TentSpace )
  const playerIndex = playerSpace ? tentSpaces.indexOf(playerSpace) : -1
  const botIndex = botSpace ? tentSpaces.indexOf(botSpace) : -1
  const firstPlayer = botIndex < playerIndex ? Player.BOT : Player.PLAYER

  return { tentPlaced,  firstPlayer, botAdditionalDiceSchemeCard, botAdditionalWorkerSchemeCard }
}

export interface TentPlacedInfo {
  tentPlaced: Player[]
  firstPlayer: Player
  botAdditionalDiceSchemeCard: boolean
  botAdditionalWorkerSchemeCard: boolean
}
