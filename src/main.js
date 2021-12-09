const http = require('http');   //导入node.js模块

// 创建server
const server = http.createServer((request, response) => {
    response.write('hello ~');
    response.end();
});

// 监听3000端口
server.listen(3000, () => {
    console.log('🚀 服务已启动!');
});