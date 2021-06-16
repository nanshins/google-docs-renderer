const path = require("path");

module.exports = {
    entry: {
        react: path.resolve(__dirname, "examples/react/main.tsx")
    },
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "examples/react/dist")
    },
    watch: true,
    mode: "development",
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
    resolve: {
        modules: ["node_modules", "src"],
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    }
};
