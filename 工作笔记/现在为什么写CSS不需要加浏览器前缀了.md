#### 以前在写CSS的时候需要写各种浏览器前缀，非常繁琐, 那么现在怎么避免手动加前缀的繁琐工作呢？
- 方法有很多，有各种插件库，这篇文章主要介绍一下webpack中是如何解决的
- Webpack中有一个自动添加浏览器前缀的插件 **autoprefixer**
- 使用说明如下
1. 通过npm下载，autoprefixer 是 postcss 的一个插件，所以我们也要安装 postcss 的 webpack loader
```
npm install postcss-loader autoprefixer --save-dev
```
2. 修改一下 webpack 的 css rule
```
{
  test: /\.css$/,
  use: ['style-loader', 'css-loader', 'postcss-loader']
}
```
3. 然后创建文件 postcss.config.js
```
module.exports = {
  plugins: [
    require('autoprefixer')()
  ]
}
```