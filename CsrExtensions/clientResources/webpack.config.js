const path = require("path");
const { readdirSync } = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const getDirectories = (source) =>
    readdirSync(source, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

const getWebPackEnvironment = (env) => {
    const webpack_server = {
        mode: "development",
        devtool: "cheap-module-source-map",
        plugins: [new HtmlWebpackPlugin({ template: path.resolve(__dirname, "src/index.html") })],
        devServer: {
            historyApiFallback: true,
        },
        output: {},
        externals: {},
    };
    const webpack_dev = {
        mode: "development",
        devtool: "cheap-module-source-map",
        output: {
            libraryTarget: "commonjs",
        },
        externals: {
            axios: "axios",
            react: "react",
            reactDOM: "react-dom",
        },
        plugins: [],
    };
    const webpack_build = {
        ...webpack_dev,
        mode: "production",
        devtool: false,
    };
    return env.server ? webpack_server : env.development ? webpack_dev : webpack_build;
};

const webpack_common = {
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                    },
                ],
            },
            {
                test: /\.(c|s[ac])ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(woff(2)|eot|ttf|otf|svg)$/,
                type: "asset/inline",
            },
        ],
    },
};

module.exports = (env) => {
    const webpackConfigs = [];

    const allDirs = getDirectories(path.resolve(__dirname, "src"));
    let webpack_enviroiment = {};
    for (i = 0; i < allDirs.length; i++) {
        webpack_enviroiment = getWebPackEnvironment(env, allDirs[i], i);

        webpackConfigs.push({
            ...webpack_enviroiment,
            ...webpack_common,
            name: `config-${allDirs[i]}`,
            entry: env.server
                ? path.resolve(__dirname, `src/${allDirs[i]}/index.tsx`)
                : path.resolve(__dirname, `src/${allDirs[i]}/${allDirs[i]}.tsx`),
            output: {
                ...webpack_enviroiment.output,
                filename: `${allDirs[i]}.js`,
                path: path.resolve(__dirname, `dist/${allDirs[i]}`),
                publicPath: "/",
            },
            plugins: [
                ...webpack_enviroiment.plugins,
                new CleanWebpackPlugin({
                    leanOnceBeforeBuildPatterns: [path.resolve(__dirname, `dist/${allDirs[i]}`)],
                }),
            ],
        });
    }

    return webpackConfigs;
};
