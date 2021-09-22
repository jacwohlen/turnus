export interface Competitor {
  id: number
  firstname: string
  lastname: string
  sex: string
  birthyear: number
  club: string
  weight: number
  weightMeasured: number | null
}

export interface WeightClass {
  name: string
  weight_from: number
  weight_to: number
}
export interface Category {
  id?: number
  name: string
  sex: string
  ageFrom: number
  ageTo: number
  weights: WeightClass[]
}
