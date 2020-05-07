### pdf转图片使用的是 pdf-poppler 这个插件
### 具体的一些配置如下
```
        let opts = {
            format: 'jpeg',
            out_dir: path.dirname(file),
            out_prefix: path.basename(file, path.extname(file)),
            page: null
        }
         
        pdf.convert(file, opts)
            .then(res => {
                console.log('Successfully converted');
            })
            .catch(error => {
                console.error(error);
            })
```
opts存放一些属性配置，详细如下：
- format：转化为的图片类型， 包括 png, jpeg, tiff, pdf, ps, eps, svg
- out_dir: 输出路径
- out_prefix: 输出文件名

#### 除此以外，pdf-poppler 还提供了输出pdf文件信息的方法
```
   pdf.info(file)
    .then(pdfinfo => {
        console.log(pdfinfo);
    });
```

打印的信息实例如下

```
{ title: '',
  creator: '',
  producer: 'Qt 5.5.1',
  creationdate: '11/01/69 06:16:56 �й���׼ʱ��',
  tagged: 'no',
  userproperties: 'no',
  suspects: 'no',
  form: 'none',
  javascript: 'no',
  pages: '7',
  encrypted: 'no',
  page_size: '595 x 842 pts (A4)',
  page_rot: '0',
  file_size: '103998 bytes',
  optimized: 'no',
  pdf_version: '1.4',
  width_in_pts: 595,
  height_in_pts: 842 }
```