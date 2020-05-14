这个方法是在查看webpack中compiler源码的时候发现的，自己研究了下，发现还挺有意思的，特此记录
函数是这样的，如下所示
```
const sortObject = (obj, keys) => {
	return keys.sort().reduce((o, k) => {
		o[k] = obj[k];
		return o;
	}, {});
};

```
- 顺便解释一下reduce函数的使用
- reduce接受两个参数，第一个参数为回调函数，第二个参数为回调函数中第一个参数的初始值，结合上面函数， o的初始值为{}
- 然后自己加了一些原始数据进行测试
```
const obj = {name: 'lzc', age: 12, address: '山东省', card: 5830}
const keys = ['name', 'age', 'address', 'card']
const result = sortObject(obj, keys)
console.log(result)
```
打印结果如下所示
```
[ 'address', 'age', 'card', 'name' ]
{ address: '山东省', age: 12, card: 5830, name: 'lzc' }
```
也就是使用这个函数可以按照自己定义的属性顺序数组keys对对象内的属性进行排序