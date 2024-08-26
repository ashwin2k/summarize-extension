const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: {
        index: "./src/index.tsx"
    },
    mode: "production",
    module: {
        rules: [
            {
              test: /\.tsx?$/,
               use: [
                 {
                  loader: "ts-loader",
                   options: {
                     compilerOptions: { noEmit: false },
                    }
                  }],
               exclude: /node_modules/,
            },
            {
                test: /\.svg$/,
                use: 'file-loader', // or 'url-loader' / 'svg-url-loader'
            },
            {
              exclude: /node_modules/,
              test: /\.css$/i,
               use: [
                  "style-loader",
                  "css-loader"
               ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                  },
                }
            }
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "manifest.json", to: "../manifest.json" },
            ],
        }),
        new CopyWebpackPlugin({
            patterns: [
              {
                from: 'src/background.ts',
                to: 'background.js',
                transform: (content) => {
                  const ts = require('typescript');
                  const result = ts.transpileModule(content.toString(), {
                    compilerOptions: { module: ts.ModuleKind.CommonJS },
                  });
                  return result.outputText;
                },
              },
            ],
          }),
          new CopyWebpackPlugin({
            patterns: [
              {
                from: 'src/content.ts',
                to: 'content.js',
                transform: (content) => {
                  const ts = require('typescript');
                  const result = ts.transpileModule(content.toString(), {
                    compilerOptions: { module: ts.ModuleKind.CommonJS },
                  });
                  return result.outputText;
                },
              },
            ],
          }),
          new Dotenv(),
        ...getHtmlPlugins(["index"]),
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        path: path.join(__dirname, "dist/js"),
        filename: "[name].js",
    },
};

function getHtmlPlugins(chunks) {
    return chunks.map(
        (chunk) =>
            new HTMLPlugin({
                title: "React extension",
                filename: `${chunk}.html`,
                chunks: [chunk],
            })
    );
}