const {resolve} = require('path')
const webpack = require('webpack')
const __dev__ = true || process.argv[2] === 'dev'

const config = {
  mode: __dev__ ? 'development' : 'production',
  entry: {
    index: './src/index.js'
  },
  module: {
    rules: [
      {
        test: /\.glsl$/,
        use: {loader: resolve(__dirname, 'bin/glsl.js')}
      }
    ]
  },
  output: {
    path: resolve(__dirname, 'public'),
    filename: '[name].js'
  },
  devtool: false,
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      '__webgl2': false,
      '__root__': JSON.stringify(__dirname),
      '__dev__': process.env.NODE_ENV === 'development',
      '__darwin__': process.platform === 'darwin',
      '__linux__': process.platform === 'linux',
      '__win32__': process.platform === 'win32',
      '__version__': JSON.stringify(require('./package.json').version),
      '__noop__': 'function () {}'
    })
  ],
  stats: {
    errorDetails: true
  }
}

const report = (err, stats) => {
  if (err) console.error(err)
  if (stats) console.log(stats.toString({chunks: false, colors: true}))
}

if (__dev__) {
  webpack(config).watch({ignored: /node_modules/}, report)
  require('./server')
} else {
  webpack(config).run(report)
}
