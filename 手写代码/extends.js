/**
 * es5 继承
 */

 function Parent5 (name, age) {
   this.name = name;
   this.age = age;
 }

 Parent.prototype.show = function () {
   console.log(this)
 }

 function Children5 (name, age, sex) {
   Parent.call(this, name, age)
   this.sex = sex
 }

 Children5.prototype = Object.create(Parent5.prototype)
 Children5.prototype.constructor = Children


/**
 * es6 继承
 */
class Parent6 {
  constructor (name, age) {
    this.name = name;
    this.age = age;
  }

  show () {
    console.log(this)
  }
}

class Children6 extends Parent6 {
  constructor (name, age, sex) {
    super(name, age)
    this.sex = sex
  }
}



 const ch = new Children6('lzc', 13, 'man')
 ch.show()


