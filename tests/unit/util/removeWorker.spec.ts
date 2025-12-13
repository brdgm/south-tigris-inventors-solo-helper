import removeWorker from '@/util/removeWorker'
import { expect } from 'chai'
import mockBotResources from '../helper/mockBotResources'

describe('util/removeWorker.spec', () => {
  it('removeWorker.spec', () => {
    expect(removeWorker(mockBotResources({silver: 4, workers: 1}))).to.eql(mockBotResources({silver: 4, workers: 0}))
  })
})
