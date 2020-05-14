- 当你引用一个复杂目录下的文件时是否还在用  ../../xx/  ?
- 为了简化引用路径，你可以配置resolve
- 比如
```
resolve: {
	alias: {
		'public': path.resolve(__dirname, '../public')
	}
}
```

- 这样当你需要引入public目录下的文件时只需要 **public/xx**就好了