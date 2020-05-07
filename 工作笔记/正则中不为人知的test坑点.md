#### 记录下在正则中使用test的一些坑，避免以后再踩
1. test作用
- 验证一个字符串中的某部分是否匹配这个正则表达式，返回true和false
- 请看代码
```language
const regExp = /1/g
const str = 12
tegExp.test(str)
```
- 上面代码很简单，校验str中是否存在1,结果返回true,代表存在
2. 使用test会碰到坑
- 请看下面代码，会返回什么
```language
let reg = /1/g;
let str = "12";
console.log(reg.test(str));
console.log(reg.test(str));
```
- 是两个都返回true吗？
#### 答案是第一个返回true,第二个返回false
#### why? wf?
#### 下面让我们解释一下原因
- 原因呢，总结起来就这一句话： **每个正则表达式都有一个 lastIndex 属性，用于记录上一次匹配结束的位置**
- 所以说你在test后如果没用将lastIndex置0,则下次会从上次的lastIndex开始匹配,对上面的代码来说,第一次匹配返回true,lastIndex为1,因此第一次匹配就从1开始,因此返回false
#### 如何解决呢？我所知的有两种方法
1. 去掉全局匹配 g
2. 手动将lastIndex置0
#### 坑点再现
在循环中使用test结果不一定和预期一样