// range - 与えられた範囲内の整数の配列を生成する

export function range(start: number, end: number): number[] {
  return Array.from({ length: end - start }, (_, i) => start + i)
}
