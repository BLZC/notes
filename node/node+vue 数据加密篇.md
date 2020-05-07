- 数据加密在前后端数据传输的过程中的安全性至关重要，本文我们主要讲解的是前后端通过rsa进行数据加密。
- rsa是一种非对称的数据加密方式，具体流程如下图所示：
	![示意图](http://49.235.8.149:9001/upload/rsa.png)

让我们看一下具体的代码实现：
- 服务端需要用的node-rsa，定义生成公钥和私钥的配置文件如下：
```
const NodeRSA = require('node-rsa');
const newkey = new NodeRSA({ b: 1024 });  
      newkey.setOptions({encryptionScheme: 'pkcs1'});
let public_key = newkey.exportKey('pkcs8-public'), //公钥
    private_key = newkey.exportKey('pkcs8-private'); //私钥
let pubkey = new NodeRSA(public_key),
    prikey = new NodeRSA(private_key);
    pubkey.setOptions({encryptionScheme: 'pkcs1'});
    prikey.setOptions({ encryptionScheme: 'pkcs1' });
module.exports = {public_key , private_key, pubkey, prikey}
```

- 将公钥传给前端，前端使用提供的公钥进行加密，将加密后的文件发给服务端，这里需要用到 jsencrypt 这个插件

```
 import { JSEncrypt } from 'jsencrypt';
 ...
 let encrypt = new JSEncrypt();
        encrypt.setPublicKey(服务端提供的公钥);
        let _pwd = encrypt.encrypt(密码);
...
```

- 最后服务端对传来的密文使用私钥进行解密

```
let _pwd = JSON.parse(prikey.decrypt(password, 'utf8'));
```

- 完结