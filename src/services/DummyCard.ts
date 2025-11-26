import Guild from './enum/Guild'
import InfluencePlace from './enum/InfluencePlace'
import WorkerSpace from './enum/WorkerSpace'

export default interface DummyCard {
  id: number
  influencePlace: InfluencePlace
  shipMovement: number
  increaseCostWorkerSpace: WorkerSpace
  increaseCostGuild: Guild
  blockGuildWorkerSpaces: WorkerSpace[]
}
