import firebase from 'firebase/app'

import { schedulerStore } from './'
import { Match } from '~/types/models'

describe('store/scheduler', () => {
  beforeEach(async () => {
    firebase.database().ref('/').remove()
    await schedulerStore.init()
    await schedulerStore.init2()
  })

  test('test scheduling mechanics', async () => {
    const matches: Match[] = [
      { n: 0, fighter1: 'F1', fighter2: 'F2' },
      { n: 1, fighter1: 'F1', fighter2: 'F3' },
      { n: 2, fighter1: 'F1', fighter2: 'F4' },
      { n: 3, fighter1: 'F2', fighter2: 'F3' },
      { n: 4, fighter1: 'F2', fighter2: 'F4' },
      { n: 5, fighter1: 'F3', fighter2: 'F4' },
    ]
    expect(schedulerStore.getCurrentMatch).toBeNull()
    expect(schedulerStore.getNextMatch).toBeNull()
    await schedulerStore.next()
    await schedulerStore.addMatches(matches)
    expect(schedulerStore.getStats).toEqual({ upcoming: 6, done: 0 })

    expect(schedulerStore.getCurrentMatch).toEqual(matches[0])
    expect(schedulerStore.getNextMatch).toEqual(matches[1])

    await schedulerStore.next()
    expect(schedulerStore.getCurrentMatch).toStrictEqual(matches[1])
    expect(schedulerStore.getStats).toEqual({ upcoming: 5, done: 1 })

    await schedulerStore.previous()
    expect(schedulerStore.getCurrentMatch).toStrictEqual(matches[0])
    expect(schedulerStore.getStats).toEqual({ upcoming: 6, done: 0 })
  })

  test('test cycling through scheduling', async () => {
    const matches: Match[] = [
      { n: 0, fighter1: 'F1', fighter2: 'F2' },
      { n: 1, fighter1: 'F1', fighter2: 'F3' },
      { n: 2, fighter1: 'F1', fighter2: 'F4' },
    ]
    schedulerStore.addMatches(matches)

    await schedulerStore.previous()
    expect(schedulerStore.getCurrentMatch).toStrictEqual(matches[0])
    await schedulerStore.next()
    expect(schedulerStore.getCurrentMatch).toStrictEqual(matches[1])
    await schedulerStore.next()
    expect(schedulerStore.getCurrentMatch).toStrictEqual(matches[2])
    await schedulerStore.next()
    expect(schedulerStore.getCurrentMatch).toStrictEqual(matches[2])
    await schedulerStore.previous()
    expect(schedulerStore.getCurrentMatch).toStrictEqual(matches[1])
    await schedulerStore.previous()
    expect(schedulerStore.getCurrentMatch).toStrictEqual(matches[0])
    await schedulerStore.previous()
  })
})

// test('generate round robin schedule', () => {
//   const fighters: string[] = ['F1', 'F2', 'F3', 'F4']

//   const result: Match[] = [
//     { n: 0, fighter1: 'F1', fighter2: 'F2' },
//     { n: 1, fighter1: 'F1', fighter2: 'F3' },
//     { n: 2, fighter1: 'F1', fighter2: 'F4' },
//     { n: 3, fighter1: 'F2', fighter2: 'F3' },
//     { n: 4, fighter1: 'F2', fighter2: 'F4' },
//     { n: 5, fighter1: 'F3', fighter2: 'F4' },
//   ]

//   const fights: Match[] = BracketGenerator.roundrobin(fighters)
//   expect(fights).toEqual(result)
// })
//
