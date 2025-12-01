import { BotResources } from '@/store/state'

/**
 * Add silver to bot supply
 * @param botResources Bot resources
 * @param value Silver value
 * @returns New bot resources
 */
export default function addSilver(botResources: BotResources, value: number) : BotResources {
  return {
    silver: (botResources.silver + value)
  }
}
