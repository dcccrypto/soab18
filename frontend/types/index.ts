export interface MetricItem {
  TITLE: string
  VALUE: number
  DESCRIPTION: string
  DISPLAY_TYPE: 'number' | 'percent'
}

export interface MetricItems {
  TOTAL_SUPPLY: MetricItem
  CIRCULATING: MetricItem
  BURNED: MetricItem
  FOUNDER: MetricItem
  HOLDERS: MetricItem
} 