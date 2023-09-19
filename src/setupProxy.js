const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // WebSocket proxy middleware
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://api-pub.bitfinex.com",
      ws: true, // Enable WebSocket proxy
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
};
