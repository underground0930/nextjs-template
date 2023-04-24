// sleep - 非同期処理を一定時間遅延させる

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
