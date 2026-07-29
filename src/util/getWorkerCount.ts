/**
 * Get starting worker count.
 * The bot always has all 3 workers available - the actual number of workers it can place
 * is limited by the number of worker scheme cards in its deck (which depends on difficulty level).
 * @returns Worker count
 */
export default function getWorkerCount() : number {
  return 3
}
