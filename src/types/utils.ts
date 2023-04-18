// Kの入力がなければデフォルトのTを使う

export type DataWithDefaults<T, K extends keyof T = keyof T> = Pick<T, K>
