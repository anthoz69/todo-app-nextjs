export interface Bonus {
  columns: Column[],
  data: BonusData[]
}

export interface Column {
  key: string
  name: string
}

export interface BonusData {
  id: string
  no: number
  title: string
  desc: string
  date: string
}
