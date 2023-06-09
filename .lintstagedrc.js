// MEMO:参考 これでないとエラーになる
// https://nextjs.org/docs/basic-features/eslint#lint-staged

const path = require('path')

module.exports = {
  './src/**/*.{ts,tsx}': [
    () => 'tsc --incremental false --noEmit',
    (filenames) =>
      `next lint --ignore-path .prettierignore --fix --file ${filenames
        .map((file) => path.relative(process.cwd(), file))
        .join(' --file ')}`,
    'prettier --write',
  ],
}
