const proxy = [
  {
    context: '/api',
    target: 'http://localhost:44318',
    pathRewrite: {'^/api' : ''}
  }
];
module.exports = proxy;
