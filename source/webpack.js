const {resolve} = require('path')
const webpack = require('webpack')

console.log(process.argv)
const __dev__ = process.argv[3] === 'dev'

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
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      '__root__': JSON.stringify(__dirname),
      '__dev__': process.env.NODE_ENV === 'development',
      '__darwin__': process.platform === 'darwin',
      '__linux__': process.platform === 'linux',
      '__win32__': process.platform === 'win32',
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      '__version__': JSON.stringify(require('./package.json').version),
      '__noop__': '() => {}'
    })
  ],
  stats: {
    // Examine all modules
    maxModules: Infinity,
    // Display bailout reasons
    optimizationBailout: true
  }
}

const report = (err, stats) => {
  if (err) console.error(err)
  if (stats) console.log(stats.toString({chunks: false, colors: true}))
}

if (__dev__) {
  webpack(config).watch({ignored: /node_modules/}, report)
} else {
  webpack(config).run(report)
}
