import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    fallback: {
      fs: false,
      path: require.resolve("path-browserify")
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
};
