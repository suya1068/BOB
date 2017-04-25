const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
const webpackMd5Hash = require("webpack-md5-hash");


const root = path.resolve(__dirname);
const protocol = "http";
const host = "localhost";
const port = 3000;

module.exports = env => {
    const environment = env.prod ? "production" : "development";
    process.env.NODE_ENV = environment;

    const isSourcemap = true;


    const webpackConfig = {
        target: "web",
        bail: !env.prod,
        devtool: env.prod ? "source-map" : "inline-source-map",
        context: path.resolve(root, "src"),
        entry: {
            vendor: "vendor",
            app: "app"
        },
        output: env.prod
            ? {
                path: path.resolve(root, "public"),
                filename: "[name].[chunkhash].js",
                chunkFilename: "[id].[chunkhash].js",
                publicPath: "/"
            } : {
                pathinfo: true,
                path: path.resolve(root, "public"),
                filename: "[name].[hash].js",
                chunkFilename: "[id].[hash].js",
                publicPath: `${protocol}://${host}:${port}/`
            },
        plugins: [
            new HtmlWebpackPlugin({
                filename: "index.html",
                template: path.resolve(root, "src/index.html"),
                chunks: ["manifest", "vendor", "app"],
                chunksSortMode: "dependency"
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: ["vendor", "manifest"],
                minChunks: Infinity
            }),
            new webpack.HashedModuleIdsPlugin(),
            new webpackMd5Hash(),
            new ChunkManifestPlugin({
                filename: "chunk-manifest.json",
                manifestVariable: "webpackManifest"
            }),
            new webpack.LoaderOptionsPlugin({
                debug: !env.prod,
                minimize: env.prod,
                options: {
                    context: path.resolve(root, "src"),
                }
            }),
            new webpack.DefinePlugin({
                "process.env": {
                    NODE_ENV: JSON.stringify(environment)
                }
            })
        ],
        module: {
            rules: [
                { test: /\.jsx?$/, exclude: /node_modules/,
                    use: [
                        { loader: "babel-loader", options: { cacheDirectory: !env.prod } }
                    ]
                },
                { test: /\.scss$/,
                    use: env.prod
                        ? ExtractTextPlugin.extract({
                            use: [
                                { loader: "css-loader", options: { sourceMap: isSourcemap } },
                                { loader: "postcss-loader" },
                                { loader: "sass-loader", options: { includePaths: [path.resolve(root, "src")], sourceMap: isSourcemap } }
                            ]
                        })
                        : [
                            { loader: "style-loader" },
                            { loader: "css-loader", options: { sourceMap: isSourcemap } },
                            { loader: "postcss-loader" },
                            { loader: "sass-loader", options: { includePaths: [path.resolve(root, "src")], sourceMap: isSourcemap } }
                        ]
                },
                { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                    use: [{ loader: "url-loader", options: {
                            limit: 10000,
                            mimetype: "application/font-woff",
                            name: "fonts/[name].[sha512:hash:base64:7].[ext]"
                        }}
                    ]
                },
                { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                    use: [{ loader: "url-loader", options: {
                            limit: 10000,
                            mimetype: "application/font-woff",
                            name: "fonts/[name].[sha512:hash:base64:7].[ext]"
                        }}
                    ]
                },
                { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                    use: [{ loader: "url-loader", options: {
                            limit: 10000,
                            mimetype: "application/octet-stream",
                            name: "fonts/[name].[sha512:hash:base64:7].[ext]"
                        }}
                    ]
                },
                { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                    use: [{ loader: "file-loader", options: {
                            name: "fonts/[name].[sha512:hash:base64:7].[ext]"
                        }}
                    ]
                },
                { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    use: [{ loader: "url-loader", options: {
                            limit: 10000,
                            mimetype: "image/svg+xml",
                            name: "fonts/[name].[sha512:hash:base64:7].[ext]"
                        }}
                    ]
                },
                { test: /\.(jpe?g|png|gif)$/i,
                    use: [{ loader: "url-loader", options: {
                            limit: 10000,
                            name: "imgs/[name].[sha512:hash:base64:7].[ext]"
                        }},
                        { loader: "img-loader", options: {
                            pngquant: { floyd: 0.5, speed: 3 }
                        }}
                    ]
                }
            ]
        },
        resolve: {
            modules: ["node_modules", path.resolve(root, "src")],
            extensions: [".js", ".jsx"]
        }
    };

    return env.prod
        ? merge(webpackConfig, {
            plugins: [
                new webpack.optimize.UglifyJsPlugin({
                    compress: { warnings: false },
                    beautify: false
                })
            ]
        })
        : merge(webpackConfig, {
            devServer: {
                contentBase: path.resolve(root, "public"),
                publicPath: `${protocol}://${host}:${port}/`,
                host: host,
                port: port,
                compress: true,
                historyApiFallback: true,
                hot: true,
                inline: true,
                noInfo: true,
                overlay: true,
                stats: "errors-only",
                watchContentBase: true,
                watchOptions: {
                    poll: true,
                    aggregateTimeout: 300
                }
            },
            plugins: [
                new webpack.HotModuleReplacementPlugin()
            ],
            performance: {
                maxEntrypointSize: 400000,
                maxAssetSize: 100000
            }
        })
};