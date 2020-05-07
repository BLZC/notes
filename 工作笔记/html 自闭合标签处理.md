直接上代码
```
const tags = /^(area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i
function covert(html) {
    return html.replace(/(<(\w+)[^>]*?)\/>/g, (all, front, tag) => {
        return tags.test(tag) ? all : front + '></' + tag +'>'
    })
}
```