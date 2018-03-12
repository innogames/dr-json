const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const outDir = path.resolve(__dirname, 'dist', 'compiled');

function baseConfig(isDev, devServerPort, name) {
    let extractSass = new ExtractTextPlugin({
        filename: `${name}.css`
    });

    return {
        name: name,
        output: {
            path: outDir,
            filename: `${name}.js`
        },

        node: {
            __filename: false,
            __dirname: false
        },

        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
        },

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [
                        'ts-loader'
                    ],
                    include: [/src/]
                },
                {
                    test: /(\.scss|\.css)$/,
                    use: extractSass.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true,
                                    localIdentName: '[path][name]_[local]_[hash:base64:5]',
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true,
                                },
                            }
                        ]
                    })
                },
                {
                    test: /\.(png)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            query: {
                                outputPath: 'img/',
                                name: '[name]-[hash:8].[ext]',
                            }
                        }
                    ]
                },
                {
                    test: /\.(eot|woff2|woff|ttf|svg)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            query: {
                                outputPath: 'font/',
                                name: '[name]-[hash:8].[ext]',
                            }
                        }
                    ]
                },
            ],
        },

        devtool: isDev ? 'source-map' : 'nosources-source-map',

        plugins: [
            new webpack.NamedModulesPlugin(),
            extractSass,
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(isDev ? 'development' : 'production'),
                'process.env.DEV_SERVER_PORT': devServerPort
            })
        ],

        stats: {
            // no long output
            children: false
        }
    };
}

function mainConfig(isDev, devServerPort) {
    return {
        entry: './src/main/main.ts',
        target: 'electron-main',
        ...baseConfig(isDev, devServerPort, 'main'),
    };
}

function rendererConfig(isDev, devServerPort) {
    let config = {
        entry: './src/renderer/renderer.tsx',
        target: 'electron-renderer',
        ...baseConfig(isDev, devServerPort, 'renderer'),
    };

    config.plugins.push(new HtmlWebpackPlugin({
        template: 'src/renderer/renderer.html',
    }));

    if (isDev && devServerPort) {
        config.devServer = {
            port: devServerPort,
            historyApiFallback: true,
            hot: true,
            overlay: true,
            stats: {
                children: false
            }
        };

        config.plugins.push(new webpack.HotModuleReplacementPlugin());
    }

    return config;
}

module.exports = function (env) {
    const isDev = env && env.env === 'dev';
    const devServerPort = env ? env.devServerPort : 0;

    return [
        mainConfig(isDev, devServerPort),
        rendererConfig(isDev, devServerPort)
    ]
};