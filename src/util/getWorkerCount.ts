/**
 * Get starting worker count for a round.
 * @param round Round
 * @returns Worker count
 */
export default function getWorkerCount(round : number) : number {
  if (round < 3) {
    return 2
  }
  else {
    return 3
  }
}
