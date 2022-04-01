const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
    port: 3000,
    proxy: {
      '/travel': {
        target: 'http://localhost:3003/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/travel': 'http://localhost:3003/travel/'
        }
      }
    }
  }
});
