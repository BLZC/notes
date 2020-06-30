function kp (arr) {
  let pivot = arr[0], preList = [], nextList = [], result = arr.splice(1)

  for (let item of result) {
    if (item < pivot) {
      preList.push(item)
    } else {
      nextList.push(item)
    }
  }
  if (preList.length > 1) {
    preList = kp(preList)
  }
  if (nextList.length > 1) {
    nextList = kp(nextList)
  }
  return [...preList, pivot, ...nextList]
}

let arr = [2, 2, 4, 3, 6, 1]
console.log(kp(arr))