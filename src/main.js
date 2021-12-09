const http = require('http');   //导入node.js模块

// 创建server
const server = http.createServer((request, response) => {
    const data = {
        id: 1,
        title: 'JSON',
        content: 'javascript object notation'
    }

    const jsonData = JSON.stringify(data);

    response.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8'
    });

    response.write(jsonData);
    response.end();
});

// 监听3000端口
server.listen(3000, () => {
    console.log('🚀 服务已启动!');
});