vue开发的项目基本上是由一个个组件拼接而成的，因此了解vue中组件之间的通信就显得至关重要。
1. 使用props和events
- 适用于父子组件之间的通信
#### 需要注意的几点
（1）不要在子组件中改变父组件中的值，如需改变建议通过 data 属性接收或使用 computed 属性进行转换
（2）将props中的属性封装为对象确实节省了代码量，但是会使得组件之间的数据流向变得难以令人理解
2. 使用vuex
- vuex是专为vue而设计的状态管理的工具，适合中大型项目开发
3. 使用eventBus
- eventBus进行组件件通信的核心思想**在要相互通信的两个组件中，都引入同一个新的vue实例，然后在两个组件中通过分别调用这个实例的事件触发和监听来实现通信**
- 适用于小型项目
```

//eventBus.js
import Vue from 'vue';
export default new Vue();
```
```

<!--组件A-->
<script>
import Bus from 'eventBus.js';
export default {
    methods: {
        sayHello() {
            Bus.$emit('sayHello', 'hello');
        }
    }
}
</script>
```
```

<!--组件B-->
<script>
import Bus from 'eventBus.js';
export default {
    created() {
        Bus.$on('sayHello', target => {
            console.log(target);  // => 'hello'
        });
    }
}
</script>
```
4. 使用ref
- 通过子组件设置ref属性，可以直接通过this.$refs.propName...来调用子组件中的方法
5. 使用parent和children
- 是的数据流向变得难以理解，尤其是在复杂的项目中，不建议使用
6. provide和inject