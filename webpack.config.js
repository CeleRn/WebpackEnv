const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlPlugin    = require('html-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    // filename: "[name].[contenthash].css",
    filename: "[name].css",
    disable: process.env.NODE_ENV === "development"
});
// const CreateIndexHtml = new HtmlPlugin({
//             title: 'Test APP',
//             minify: {
//                 collapseWhitespace: false,
//                 removeComments: false
//             },
//             chunks: ['app'],
//             filename: "index.html",
//             template: path.join(__dirname, 'src', 'templates', 'index.html')
//         });
module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: {
        app: './app.js',
        auth: './auth.js'
    },
    
    resolve: {
        alias: {
            _styles: path.resolve(__dirname, 'src/styles/'),
            _components: path.resolve(__dirname, 'src/components/'),
            _templates: path.resolve(__dirname, 'src/templates/')
        }
    },
    output: {
        path: path.resolve(__dirname, './build'),
        // filename: '[name].bundle.[hash].js'
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(sass|scss)$/,
                use: extractSass.extract(
                    {
                        fallback: 'style-loader',
                        use: ['css-loader', 'sass-loader']
                    }
                )
            }
        ]
    },
    plugins: [
        extractSass,
        new HtmlPlugin({
            title: 'Test APP',
            minify: {
                collapseWhitespace: false,
                removeComments: false
            },
            chunks: ['app'],
            filename: "index.html",
            template: path.join(__dirname, 'src', 'templates', 'index.html')
        }),
        new HtmlPlugin({
            title: 'auth APP',
            minify: {
                collapseWhitespace: false,
                removeComments: false
            },
            chunks: ['auth'],
            filename: "auth.html",
            template: path.join(__dirname, 'src', 'templates', 'index.html')
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "src"),
        compress: false,
        port: 9000
    }
};