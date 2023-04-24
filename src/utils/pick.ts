// pick - オブジェクトから指定されたキーを抽出する

export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return keys.reduce((result, key) => {
    result[key] = obj[key]
    return result
  }, {} as Pick<T, K>)
}
