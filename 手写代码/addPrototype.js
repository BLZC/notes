String.prototype.lzc = function () {
  return this.split('').reverse().join('-')
}

let str = 'abcd'
console.log(str.lzc())