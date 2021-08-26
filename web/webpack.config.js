const webpack = require("webpack");
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        main: "./main.ts",
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./dist",
        hot: true,
        port: 9000,
        host: '0.0.0.0'
    },
    resolve: {
        extensions: [".ts", ".js"],
        fallback: {
            "fs": false,
            "path": false
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        // new CopyWebpackPlugin({
        //     patterns: [{ from: "", to: "" }],
        // }),
        new HTMLWebpackPlugin({
            title: "Typescript x Webpack",
            filename: "index.html",
            template: "./index.template.html",
            chunks: ["main"],
        }),
    ],
};
