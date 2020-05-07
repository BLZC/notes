- 想要实现这样的效果
- 有一个实时搜索的搜索框，连续输入的时候不触发实时搜索，当用户停下来1s以上时，再显示搜索结果
- 这种效果在实际应用中比较普遍，思路就是使用setTimeout和clearTimeout，代码如下
```
var time = null;
input.addEventListener("input",()=>{
    cleartimeout(time);
    time = setTimeout(()=>{
        seach();
    })
})
```