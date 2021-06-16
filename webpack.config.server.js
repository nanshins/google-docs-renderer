const path = require("path");
const NodemonPlugin = require("nodemon-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = {
    entry: {
        react: path.resolve(__dirname, "examples/index.ts")
    },
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "examples")
    },
    watch: true,
    mode: "development",
    node: {
        __dirname: false
    },
    target: "node",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                ["@babel/preset-env"],
                                [
                                    "@babel/preset-react",
                                    {
                                        runtime: "automatic"
                                    }
                                ],
                                ["@babel/preset-typescript"]
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new NodemonPlugin({
            script: "examples/index.js",
            watch: ".",
            ext: "ts,tsx,js,jsx,ejs,html"
        })
    ],
    resolve: {
        modules: ["node_modules", "src", "examples"],
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    externals: [nodeExternals()]
};
