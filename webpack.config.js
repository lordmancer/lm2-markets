module.exports = {
  context: __dirname,

  entry: "./src/index.jsx",

  output: {
    filename: "bundle.js",
    path: __dirname,
  },
  // Existing Code ....
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        exclude: /node_modules/,
        loaders: ["react-hot-loader", "babel-loader"]
      },
      { 
        test: /\.json($|\?)/,
        loaders: ['json-loader']
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: "[name]--[local]--[hash:base64:8]"
            }
          },
          "postcss-loader" // has separate config, see postcss.config.js nearby
        ]
      }
    ]
  }
};
