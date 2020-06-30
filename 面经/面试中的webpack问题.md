#### webpack原理
- webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle

#### plugin 和 loader 的区别
- loader用于对模块源码的转换，loader描述了webpack如何处理非javascript模块，并且在buld中引入这些依赖。loader可以将文件从不同的语言（如TypeScript）转换为JavaScript，或者将内联图像转换为data URL
- plugin目的在于解决loader无法实现的其他事，从打包优化和压缩，到重新定义环境变量，功能强大到可以用来处理各种各样的任务。

#### 你使用过哪些plugin

1. htmlwebpackplugin  -- 生成html文件
2. compresswebpackplugin -- 代码压缩
3. commonschunckwebpackplugin  -- 提取公共模块，代码拆分
4. provideplugin  -- jquery
5. defineplugin -- 定义一些全局常量
6. extracttextplugin -- 分离css文件
7. uglifyjsplugin -- 代码压缩
8. ignoreplugin  -- 忽略正则匹配的模块