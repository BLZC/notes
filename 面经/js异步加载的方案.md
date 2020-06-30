1. defer
  - 等dom加载完再加载，只在ie有作用， 可以吧js代码写标签内， 不会阻塞页面渲染

2. async
  代码只能卸载外部js文件中， 不会阻塞页面渲染

3. 创建script,插入到DOM中，加载完毕后callBack