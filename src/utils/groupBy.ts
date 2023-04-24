// groupBy - 配列内の要素をキーに基づいてグループ化する

export function groupBy<T, K extends keyof any>(
  list: T[],
  getKey: (item: T) => K,
): Record<K, T[]> {
  return list.reduce((result, item) => {
    const key = getKey(item)
    const group = result[key] || []
    group.push(item)
    result[key] = group
    return result
  }, {} as Record<K, T[]>)
}
