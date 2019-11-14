#### 在本章我将分享几道涉及生成器，promise的几道经典题目，让大家对这两个知识点有深入的理解

#### 题目一：
    运行如下代码后，a1~a4的值分别是什么？

    ```
    function* EvenGenerator () {
        let num = 2;
        while (true) {
            yield num;
            num = num + 2;
        }
    }

    let generator = EvenGenerator();

    let a1 = generator.next().value;
    let a2 = generator.next().value;
    let a3 = EvenGenerator().next().value;
    let a4 = generator.next().value;
    ```

    答案是：2 4 2 6

 #### 解析:
    了解生成器的应该知道生成器和标准函数不同的是，它内部的语句不会一次执行完成，而要等待外部的next()调用。
    一般与生成器应运而生的是一个迭代器，比如上面的generator, 他会得到生成器的next(),从而控制生成器内语句的执行。
    调用生成器的next()得到的是这样一个对象
    ```
    { value: 2, done: false }
    ```
    value即执行得到的值，done表示是否执行完成。
    那么可能有人困惑了，这样的话值不应该是 2,4,6,8吗？为啥a3是2呢？
    这个是因为 generator.next() !== EvenGenerator().next()
    因此a3 = EvenGenerator().next().value表示重新开启了一个生成器上下文环境，故a3的值就是2了。

#### 题目二:
    运行如下代码后，a1, a2的值分别是什么？
    ```
    function* Gen (val) {
        result = yield val * 2;
        yield result;
    }

    let generator = Gen(2);
    let a1 = generator.next(3).value;
    let a2 = generator.next(5).value;
    ```

    答案：4  5

#### 解析：
    这个涉及到生成器的传参 
    生成器传参主要有三种方法： 
    1. 初始化的时候传参：比如 Gen(2)
    2. 听过next传参，比如 next(3)
    3. 通过throw传参（不介绍，有兴趣的可以自己查阅）

    其中有个很关键的点： 第一次调用next的时候不会接受next中的参数，想要在第一次调用的时候传参必须通过初始化的时候传参。
    因此第一次调用next的时候生成器中没有等待中的yield. 故a1的值为4

#### 题目三:
    如下代码的输出结果是什么？
    ```
    const promise = new Promise((resolve, reject) => {
        resolve("a");
        setTimeout(() => {
            reject("b");
        }, 500)
    })

    promise.then(val => {
        console.log(val);
    }).catch(err => {
        console.log(err)
    })
    ```

    答案：a

#### 解析：
    很多人或许会认为应该输出a,b，不是后面显式的reject了吗？
    之所以只输出a，是因为promise的状态只有pending => rejected 或者 pending => fulfilled,
    promise状态一旦确定就无法改变，因此后面的reject也就不起作用了

