#### xss分为三种：
1. 反射型xss    钓鱼网站读cookie
2. 存储型xss     将恶意脚本存在数据库中    一些评论
3. DOM-based 型xss   修改页面dom

####  防御
1. 针对cookie设置httpOnly(由服务端设置)
2. url编码，关键字过滤，输入过滤
3. 不要使用eval运行不安全代码， 使用JSON.parse解析数据