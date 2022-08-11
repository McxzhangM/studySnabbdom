const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
      },
    module: {
        rules:[]
    },
    plugins: [],
    mode: 'development',
    devServer: {
        host: "localhost",
        port: "3000",
        open: true,
        hot: true // 热模块替换
    },
}