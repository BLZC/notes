- 看到有面试题中问到过这个问题，特此整理一下
- 举例
```language
<input type="info" value="name" id="tmp" lzc="lzc">
let input = document.getElementById('tmp')
```

#### attribute
1. 指的是html标签中的属性，及上述示例中的键值对
type: info, value: name, id: tmp, lzc: lzc
2. 允许自定义attribute 比如: lzc="lzc"
3. 可以通过getAttribute获取和通过setAttribute设置
4. 通过getAttribute获取的是默认值,不会动态变化
#### property
1. 指的是html标签对应的dom中的属性， 即
```language
HTMLInputElement.id === 'tmp'
HTMLInputElement.type === 'text'
HTMLInputElement.value === 'name'
```
2. 不允许自定义属性， 即
```language
input.lzc == 'undefined'
```
3.可以动态变化，如果输入其他值，那么value值就会变化
4. type 会被自动修正为了 dom允许的类型， 比如text