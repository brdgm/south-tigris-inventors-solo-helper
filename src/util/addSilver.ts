import { BotResources } from '@/store/state'

/**
 * Add silver to bot supply
 * @param botResources Bot resources
 * @param value Silver value
 * @returns New bot resources
 */
export default function addSilver(botResources: BotResources, value: number) : BotResources {
  const silver = botResources.silver + value
  if (silver < 0) {
    throw new Error('Silver cannot be negative.')
  }
  return {
    silver,
    workers: botResources.workers
  }
}
