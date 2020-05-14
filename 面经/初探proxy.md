- 今天讲一下es6新增的proxy
- 我们通常称proxy为代理，顾名思义，proxy的作用就是通过一个中间层处理源对象
#### proxy的简单使用
```
const obj = {name: 'lzc', age: }
const objProxy = new Proxy(obj, {
	apply: (target, thisArg, args) {

	}, 
	get: (target, key) => {
		
	},
	set: (target, key, value) => {

	}
})
```
- 讲解一下常用的set, get, apply
- 如果不用proxy, 我们要访问这个obj对象可以直接使用obj.name取值，obj.name = 'ppp'
- 那么我们为什么还要使用proxy呢
#### proxy解决的问题
1. 打印日志
- 只需要在set和get中添加我们要打印的日志就好了
2. 控制对象访问
- 我们可以通过set, get来控制对象的访问
- 在获取对象属性时会自动调用get方法，在为对象赋值时自动调用set方法
- 因此我们可以在set和get中添加一些处理，判断来控制对象的访问，代码如下
```
const obj = {name: 'lzc', age: }
const objProxy = new Proxy(obj, {
	get: (target, key) => {
		if(key in target) {
			return key + '的值为' + target[key]
		} else {
			throw new Error (key + '不存在')
		}
	},
	set: (target, key, value) => {
		target[key] = value
	}
})
```
- 经过这样处理，在你获取obj中不存在的属性时就可以手动调用我们抛出的错误
3. 实现数组负序号
```
const arrIn = ['lzc', 'ww', 'dfg', 'sas']

 let arrIndex = new Proxy(arrIn, {
     get: (target, key) => {
        let len = target.length, actualIndex
	//判断是否为负序号
        if(Number(key) < 0) {
            actualIndex = len + Number(key)
        } else {
            actualIndex = Number(key)
        }
        return target[actualIndex]
     },
     set: (target, key, value) => {

     }
 })
```
4. 测试函数性能
- 通过console.time(name)   console.timeTime(name)
5. 自动填充
- 可以在get中添加一些默认值，避免属性不存在时的一些报错

#### proxy虽好但不可滥用，因为proxy会增加大量的额外操作，在一些需要多次执行的代码中会影响性能，因此我们需要进行性能测试