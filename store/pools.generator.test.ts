import { BracketGenerator } from './pools'

describe('pools generator', () => {
  test('test round robin generator', () => {
    expect(BracketGenerator.roundrobin([], 'pool1')).toEqual([])
    expect(BracketGenerator.roundrobin(['a', 'b', 'c'], 'pool1')).toEqual([
      {
        id: '',
        n: 0,
        fighter1Id: 'a',
        fighter2Id: 'b',
        poolId: 'pool1',
      },
      {
        id: '',
        n: 1,
        fighter1Id: 'a',
        fighter2Id: 'c',
        poolId: 'pool1',
      },
      {
        id: '',
        n: 2,
        fighter1Id: 'b',
        fighter2Id: 'c',
        poolId: 'pool1',
      },
    ])
  })
})
