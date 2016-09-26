// Use require.context to require reducers automatically
// Ref: https://webpack.github.io/docs/context.html
const context = require.context('./', false, /\.js$/);
const keys = context.keys().filter(item => item !== './index.js');

const reducers = keys.reduce((memo, key) => {
  const result = memo;
  result[key.match(/([^\/]+)\.js$/)[1]] = context(key);
  return result;
}, {});
export default reducers;
