#### 首先介绍下什么是==生成器函数==
```
	function * () {
		yield 'a'
		yield 'b'
		yield 'c'
	}
```
- 不知道大家有没有见过上面这种函数？
- 这就是生成器函数
- **生成器函数有什么==特点==呢？ 我总结了一下几点，如有遗漏，欢迎补充**
1. 直接执行生成器函数没有效果，==必须通过迭代器==来执行。 关于迭代器后面再说
2. 一般函数中不建议使用无限循环，但生成器可以。至于原因可以思考上面一点

#### 了解了生成器函数，现在让我们看下什么==是迭代器==
- 类似下面代码
```
	function * generator () {
		yield 'a'
		yield 'b'
		yield 'c'
	}

	const iterator = generator()
```
- 这个iterator就是迭代器
- **迭代器有什么作用呢？**
- 答案就是**使用迭代器可以==控制==生成器**
- 比如像取上面生成器中的 a 值，怎么办？？
```
	iterator.next().value
```
- 这样就把 a 取出来了   **Why**
- 这是因为生成器的特点，需要通过迭代器来操作，每个next()对应一个yield值，返回一个 =={value: xx, done: xx}==的对象， value为值，done表示是否执行完，看如下代码
```type
	function * generator () {
		yield 'a'
		yield 'b'
		yield 'c'
	}

	const iterator = generator()
	console.log(iterator.next())
	console.log(iterator.next())
	console.log(iterator.next())
	console.log(iterator.next())

```

- 会返回什么？答案如下

```type
	{value: 'a', done: false}
	{value: 'b', done: false}
	{value: 'c', done: false}
	{value: undefined, done: true}
```
- 大家可以思考下为啥是这个结果

#### 好了，为大家介绍完生成器和迭代器，回到本篇文章的标题，《使用生成器函数解决左侧菜单id动态变化的问题》
- id动态变化是我自己起的一个名称，下面介绍实际项目介绍下
- 一般管理系统都有一个左侧菜单，菜单中绑定的数据结构类似下面这样
```type
menu: [
        {
          id: 1,
          title: '信息管理',
          children: [
            {
              id: 2,
              title: '个人信息',
              path: '/about',
            },
            {
              id: 3,
              title: '消息列表',
              path: '/message',
            }
          ]
        }
]
```
- 如何想在里面再加一个菜单项， id要怎么变呢？ 浏览以前的id,再找个没重复的？no！！！ 通过生成器函数我们我全部需要顾虑这个，下面讲一下如何使用生成器函数绑定id
- 首先定义一个生成器函数

```
    function * createId () {
      let id = 0;
      while (true) {
        yield ++id;
      }
    }
    const creID = createId();
``` 

- 定义好了后修改数据

```
menu: [
        {
          id: creID.next().value,
          title: '信息管理',
          children: [
            {
              id: creID.next().value,
              title: '个人信息',
              path: '/about',
            },
            {
              id: creID.next().value,
              title: '消息列表',
              path: '/message',
            }
          ]
        }
]
```

- 大功告成，这样以后自己模拟数据的时候就不需要在考虑用什么id了
- 这里仅仅讲述了生成器函数在实际项目中的一点使用，当然关于生成器函数还有很多实例，如果大家有比较好的实例，或者本文有什么错误，也欢迎大家指出