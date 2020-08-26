const path = require("path");

module.exports = {
  name: "GuGudan",
  mode: "development", //실서비스에서는 production으로 바꾸기.
  devtool: "eval",
  resolve: {
    extensions: [".js", ".jsx"],
  },

  entry: {
    app: ["./client"],
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: ["@babel/plugin-proposal-class-properties"],
        },
      },
    ],
  },

  output: {
    path: path.join(__dirname /*현재폴더*/, "App"), //현재폴더 안에 dist를 자동으로 만들어줌.
    filename: "app.js",
  },
};
