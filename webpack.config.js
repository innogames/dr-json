const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CheckDependencyRulesPlugin = require('dependency-rules-webpack-plugin');

const outDir = path.resolve(__dirname, 'dist', 'compiled');

function baseConfig(isDev, devServerPort, name) {
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
        mode: isDev ? 'development' : 'production',
        devtool: isDev ? 'inline-source-map' : 'nosources-source-map',
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
                    test: /(\.scss|\.css)$/i,
                    use: [
                        isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                modules: {
                                    localIdentName: '[path][name]_[local]_[hash:base64:5]',
                                }
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                            },
                        }
                    ]
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'img/[name][hash:8][ext]'
                    }
                },
                {
                    test: /\.(eot|woff2|woff|ttf|svg|otf)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'font/[name][hash:8][ext]'
                    }
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: `${name}.css`
            }),
            new CheckDependencyRulesPlugin({
                rules: [
                    {
                        module: '/src/app/main',
                        deny: ['/src/app/renderer']
                    },
                    {
                        module: '/src/app/renderer',
                        deny: ['/src/app/main']
                    },
                    {
                        module: '/src/app/renderer/components/common/',
                        deny: ['/src/app/renderer/components/app/']
                    },
                    {
                        module: '/src/app/renderer/components/form/',
                        deny: ['/src/app/renderer/components/app/']
                    },
                    {
                        module: '/src/app/renderer/components/helper/',
                        deny: ['/src/app/renderer/components/app/']
                    },
                    {
                        module: '/src/app/renderer/components/layout/',
                        deny: ['/src/app/renderer/components/app/', 'mobx']
                    },
                    {
                        module: '/src/app/shared',
                        deny: ['/src/app/main', '/src/app/renderer']
                    },
                    {
                        module: '/src/domain',
                        deny: ['/src/app', 'electron', 'react']
                    },
                ]
            }),
        ],
    };
}

function mainConfig(isDev, devServerPort) {
    return {
        entry: './src/app/main/main.ts',
        target: 'electron-main',
        ...baseConfig(isDev, devServerPort, 'main'),
    };
}

function rendererConfig(isDev, devServerPort) {
    let config = {
        entry: './src/app/renderer/renderer.tsx',
        target: 'electron-renderer',
        ...baseConfig(isDev, devServerPort, 'renderer'),
    };

    config.plugins.push(new HtmlWebpackPlugin({
        template: './src/app/renderer/renderer.html',
    }));

    if (isDev && devServerPort) {
        config.devServer = {
            port: devServerPort,
            historyApiFallback: true,
            hot: true,
        };
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
