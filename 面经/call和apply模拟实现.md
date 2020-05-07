### 我们知道可以通过call和apply改变this指向，但是这两者内部的实现原理是什么呢？今天就让我们模拟实现call和apply
#### call的模拟实现
#### 在实现call之前我们应该注意使用call时注意的几点：
首先看下call的使用方式 Fn.call(fn, c1,c2,c3)
1. fn可以调用Fn中的方法
2. c1,c2...作为参数传入，但数目不确定
3. fn可以为null,此时相当于window
4. Fn可以有返回值
5. 由于call可被任何函数调用，因此call应该在函数的原型链上

有了以上几点，我们开始用代码实现
```
Function.prototype.lzc = function(context) {
  var ctx = context || window,
      args = [],
      result = '';
      ctx.fn = this;
  for (var i = 1, len = arguments.length; i < len; i++){
      args.push('arguments[' + i + ']');
  }
  result = eval('ctx.fn('+args+')')
  delete ctx.fn;
  return result;
}
```
**在eval中args会自动调用toString**

- 是不是觉得上面的代码有点繁琐？
- 让我们用es6实现下
```
Function.prototype.lzc = function(context) {
  let ctx = context || window,
      args = [],
      result = '';
      ctx.fn = this;
  for (let i = 1; i < arguments.length; i++){
      args.push(arguments[i]);
  }
  result = ctx.fn(...args)
  delete ctx.fn;
  return result;
}
```
好了，大功告成！

**apply和call的实现差不多，有兴趣的可以尝试一下**