## 插件：
1. markdown-pdf    将md文件或字符串转化为pdf
2. koa-send 实现文件下载
## 配置
### markdown-pdf 配置
1. npm i markdown-pdf -S  下载
2. 引入 const markdownpdf = require("markdown-pdf");
3. 使用 
- 将md字符串转换为pdf
```
markdownpdf(options).from.string(_markdownMd).to(toPath, callback() )
```

- 将md文件转换为pdf
```
markdownpdf(options).from(fromPath).to(toPath, function (err) {   })
```
#### 注意配置一下options，使用自定义的css文件
```
        let options = {
            cssPath: __dirname+'/css/pdf.css'
        }
```
### koa-send配置
1. 下载引入同上
2. 配置
```
        ctx.attachment(path);
        await send(ctx, path);
```

#### 需要注意的几点
1. 如果将md-->pdf-->下载的流程放到一起，那么应该注意md->pdf需要时间，如果没有转换完成就下载会导致下载的文件是错误的。
2. 部署到生产环境中可能会遇到phantomjs报错或者md转换为pdf后中文丢失等情况，针对第一种情况建议重新下载一下依赖，针对第二种情况需要配置服务器的中文字体，具体配置可参考 [centos 配置中文字体](https://blog.csdn.net/qq_30336433/article/details/86497096)