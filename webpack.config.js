const path = require('path');

module.exports = {
    entry: './server/src/app.js',
    target: 'node',
    node: {
        __dirname: false
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'server/dist')
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }

};