const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'build/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../../public')
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            }
        ]
    }
};
