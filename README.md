# 学习 node.js

## 生成密钥和公钥

```
mkdir config
cd config
openssl
// 生成密钥
genrsa -out private.key 409
//生成公钥
rsa -in private.key -pubout -out public.ke
exit
```
