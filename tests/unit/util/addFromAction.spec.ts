import addFromAction from '@/util/addFromAction'
import { expect } from 'chai'
import mockBotResources from '../helper/mockBotResources'

describe('util/addFromAction', () => {
  it('addWorkshopTile', () => {
    expect(addFromAction(mockBotResources({workshopTiles: 2}), { workshopTile: true } )).to.eql(mockBotResources({workshopTiles: 3}))
  })

  it('addInventionTile', () => {
    expect(addFromAction(mockBotResources({inventionTiles: 1}), { inventionTile: true } )).to.eql(mockBotResources({inventionTiles: 2}))
  })

  it('addBuiltDevice', () => {
    expect(addFromAction(mockBotResources({builtDevices: 4}), { builtDevice: true } )).to.eql(mockBotResources({builtDevices: 5}))
  })

  it('addPublishedDevice', () => {
    expect(addFromAction(mockBotResources({publishedDevices: 3}), { publishedDevice: true } )).to.eql(mockBotResources({publishedDevices: 4}))
  })  
})
