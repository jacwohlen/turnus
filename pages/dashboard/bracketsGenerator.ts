export interface Match {
  n: number
  fighter1: string
  fighter2: string
}

export class BracketGenerator {
  static roundrobin(fighters: string[]): Match[] {
    const ret: Match[] = []

    let i: number = 0
    while (i < fighters.length) {
      let d = i
      while (d < fighters.length - 1) {
        ret.push({
          n: ret.length,
          fighter1: fighters[i],
          fighter2: fighters[d + 1],
        })
        d = d + 1
      }
      i = i + 1
    }

    return ret
  }
}

export interface SchedulerStats {
  upcoming: number
  done: number
}

export class Scheduler {
  private matches: Match[] = []
  private matchesDone: Match[] = []

  addMatches(matches: Match[]): void {
    Object.assign(this.matches, matches)
  }

  getStats(): SchedulerStats {
    return {
      upcoming: this.matches.length,
      done: this.matchesDone.length,
    }
  }

  getCurrentMatch(): Match | null {
    if (this.matches.length) {
      return this.matches[0]
    } else {
      return null
    }
  }

  getNextMatch(): Match | null {
    if (this.matches.length > 1) {
      return this.matches[1]
    } else {
      return null
    }
  }

  next(): boolean {
    if (this.matches.length < 2) return false
    const match = this.matches.splice(0, 1)
    this.matchesDone.push(match[0])
    return true
  }

  previous(): boolean {
    const match = this.matchesDone.pop()
    if (match) {
      this.matches.splice(0, 0, match)
      return true
    }
    return false
  }
}
