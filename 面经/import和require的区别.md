### 面试中被问到过这个问题，回答的非常一般，抽时间自己查阅资料总结了一下，特此记录
1. 说道这两个就不得不提一个名词：**模块化**
- 使用模块化有啥好处呢：
- 如果没有模块化，成千上万行代码在一个js文件中，结果就导致什么变量污染等缺陷，这对于大型项目是致命的
- 目前常用的模块化工具有适用于服务端的CommonJs, 适用于浏览器端的AMD,以及Es6新增的import

2. 区别
#### 目前常用的就是CommonJs(cjs)和import(esm)这两种，下面主要介绍下他们之间有啥不同之处
- esm编译时就能确定模块的依赖关系。cjs都只能在运行时确定这些东西。即：esm是获取的模块的引用，cjs是获取的模块的拷贝，或许你没有理解这句话，下面上代码：
```
 // module.js
 export var a = 1
 setTimeout( () => {
   a = 2 
 }, 1000) 

// a.js
import { a } from 'module.js'
console.log(a)

// 输出
1
2
```
- a.js使用esm调用module中的变量，当module中的变量改变时，a.js中的引用数据会同步更新，这是cjs所无法实现的



#### 如何是的可以修改commonJS内部的值？
- 因为commonJs 是浅拷贝 => 将获取值通过导出为一个get函数

#### 循环引用时的区别
- es6 因为是动态加载 => 正常
- commonJs 只输出执行的部分