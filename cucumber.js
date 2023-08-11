const args = [
  '--format progress',
  '--parallel 1',
  '--ts-node-args features/tsconfig.json',
  '--require-module ts-node/register/transpile-only',
  '--require features/setup/**/*.ts',
  '--exit',
];

module.exports = {
  default: args.join(' '),
};
