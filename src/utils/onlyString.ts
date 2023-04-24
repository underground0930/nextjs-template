// 文字列の配列やundefinedが来ても、文字列を返す

export function onlyString(value?: string | string[]): string {
  return typeof value === 'string' ? value : value?.[0] ?? ''
}
