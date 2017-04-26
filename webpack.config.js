const path = require("path");
const webpack = require("webpack");
const webpackMd5Hash = require("webpack-md5-hash");


const root = path.resolve(__dirname);
// const protocol = "http";
// const host = "localhost";
// const port = 3000;

module.exports = env => {
    const environment = env.prod ? "production" : "development";
    process.env.NODE_ENV = environment;

    return {
        target: "web",
        bail: !env.prod,
        devtool: env.prod ? "source-map" : "inline-source-map",
        context: path.resolve(root, "src"),
        entry: "app.js",
        output: {
            path: path.resolve(root, "public"),
            filename: "fsn-util.js",
            library: "FSN",
            libraryTarget: "umd"
        },
        plugins: [
            new webpack.HashedModuleIdsPlugin(),
            new webpackMd5Hash(),
            new webpack.DefinePlugin({
                "process.env": { NODE_ENV: JSON.stringify(environment) }
            }),
            env.prod 
                ? new webpack.optimize.UglifyJsPlugin({
                    compress: { warnings: false },
                    beautify: false
                })
                : null
        ],
        module: {
            rules: [
                { test: /\.jsx?$/, exclude: /node_modules/,
                    use: [
                        { loader: "babel-loader", options: { cacheDirectory: !env.prod } }
                    ]
                }
            ]
        },
        resolve: {
            modules: ["node_modules", path.resolve(root, "src")],
            extensions: [".js", ".jsx"]
        }
    };
};
