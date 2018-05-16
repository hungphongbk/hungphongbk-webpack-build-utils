const path = require('path');
module.exports = {
    mode: "none",
    target: "node",
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        path: __dirname,
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    }
};