import { BracketGenerator, Match, Scheduler } from './bracketsGenerator'

test('generate round robin schedule', () => {
  const fighters: string[] = ['F1', 'F2', 'F3', 'F4']

  const result: Match[] = [
    { n: 0, fighter1: 'F1', fighter2: 'F2' },
    { n: 1, fighter1: 'F1', fighter2: 'F3' },
    { n: 2, fighter1: 'F1', fighter2: 'F4' },
    { n: 3, fighter1: 'F2', fighter2: 'F3' },
    { n: 4, fighter1: 'F2', fighter2: 'F4' },
    { n: 5, fighter1: 'F3', fighter2: 'F4' },
  ]

  const fights: Match[] = BracketGenerator.roundrobin(fighters)
  expect(fights).toEqual(result)
})

test('test scheduling mechanics', () => {
  const scheduler = new Scheduler()

  const matches: Match[] = [
    { n: 0, fighter1: 'F1', fighter2: 'F2' },
    { n: 1, fighter1: 'F1', fighter2: 'F3' },
    { n: 2, fighter1: 'F1', fighter2: 'F4' },
    { n: 3, fighter1: 'F2', fighter2: 'F3' },
    { n: 4, fighter1: 'F2', fighter2: 'F4' },
    { n: 5, fighter1: 'F3', fighter2: 'F4' },
  ]

  expect(scheduler.getCurrentMatch()).toBeNull()
  expect(scheduler.getNextMatch()).toBeNull()
  expect(scheduler.next()).toBe(false)
  scheduler.addMatches(matches)
  expect(scheduler.getStats()).toEqual({ upcoming: 6, done: 0 })

  expect(scheduler.getCurrentMatch()).toEqual(matches[0])
  expect(scheduler.getNextMatch()).toEqual(matches[1])

  expect(scheduler.next()).toBe(true)
  expect(scheduler.getCurrentMatch()).toBe(matches[1])
  expect(scheduler.getStats()).toEqual({ upcoming: 5, done: 1 })

  expect(scheduler.previous()).toBe(true)
  expect(scheduler.getCurrentMatch()).toBe(matches[0])
  expect(scheduler.getStats()).toEqual({ upcoming: 6, done: 0 })
})

test('test cycling through scheduling', () => {
  const scheduler = new Scheduler()

  const matches: Match[] = [
    { n: 0, fighter1: 'F1', fighter2: 'F2' },
    { n: 1, fighter1: 'F1', fighter2: 'F3' },
    { n: 2, fighter1: 'F1', fighter2: 'F4' },
  ]
  scheduler.addMatches(matches)

  expect(scheduler.previous()).toBe(false)
  expect(scheduler.getCurrentMatch()).toEqual(matches[0])
  scheduler.next()
  expect(scheduler.getCurrentMatch()).toEqual(matches[1])
  scheduler.next()
  expect(scheduler.getCurrentMatch()).toEqual(matches[2])
  expect(scheduler.next()).toBe(false)
  expect(scheduler.getCurrentMatch()).toEqual(matches[2])
  scheduler.previous()
  expect(scheduler.getCurrentMatch()).toEqual(matches[1])
  scheduler.previous()
  expect(scheduler.getCurrentMatch()).toEqual(matches[0])
  expect(scheduler.previous()).toBe(false)
})

// Test scoring
