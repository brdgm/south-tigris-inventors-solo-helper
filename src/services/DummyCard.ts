import Guild from './enum/Guild'
import WorkerSpace from './enum/WorkerSpace'

export default interface DummyCard {
  id: number
  influenceBlue: number
  influenceOrange: number
  influenceBlack: number
  shipMovement: number
  increaseCostWorkerSpace: WorkerSpace
  increaseCostGuild: Guild
  blockGuildWorkerSpaces: WorkerSpace[]
}
