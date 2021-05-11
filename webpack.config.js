module.exports = {
  entry: './client/index.js',
  output: { path: __dirname, filename: './public/main.js' },
  module: {
    rules: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
};
