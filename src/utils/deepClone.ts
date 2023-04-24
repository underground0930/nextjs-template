// deepClone - オブジェクトの深いコピーを作成する

export function deepClone<T>(obj: T): T {
  return structuredClone<T>(obj)
}
