- 使用 vue-clipboard2 插件
- 配置：

```
import VueClipboard from 'vue-clipboard2';
VueClipboard.config.autoSetContainer = true; // add this line
Vue.use(VueClipboard);
```

- 在项目的使用：
```
<el-button  v-clipboard:copy="message"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError">
</el-button>
``` 
- v-clipboard:copy 绑定待复制的数据
- v-clipboard:success  复制成功
- v-clipboard:error  复制失败

```
onCopy: function (e) {
// 如有需要可通过e拿到复制过来的数据
  this.$LZCMessage('复制成功', 'success');
},
onError: function (e) {
   this.$LZCMessage('error', 'success');
}
```