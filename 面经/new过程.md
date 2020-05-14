- new过程相当于进行了如下操作
```
function pp () {
  this.val = 'pp'
  this.clg = function () {
    console.log(this.val)
  }
}

const cc = new pp()

// 等于

const cc = {}
cc.__proto__ = pp.prototype
pp.apply(cc)
```