function Ofo() {}

function Bick() {
  this.name = 'mybick',
  this.fn = function () {
    return 1
  }
}

var myBick = new Ofo()

Ofo.prototype = new Bick()

var youbick = new Bick()

console.log(Ofo.fn)

console.log(youbick.name)
