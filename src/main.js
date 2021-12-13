const express = require('express');
const app = express();
const port = 3000;

/**
 * create 2021/12/13
 * 使用 JSON 中间件
 */
app.use(express.json());

app.listen(port, () => {
    console.log('🚀服务已启动！');
});

app.get('/', (request, response) => {
    response.send('你好!');
});

const data = [
    {
        id: 1,
        title: '关三月',
        content: '明月出天山,苍茫云海间'
    },
    {
        id: 2,
        title: '望岳',
        content: '会当凌绝顶，一览众山小'
    },
    {
        id: 3,
        title: '忆江南',
        content: '日出江花红胜火,春来江水绿如蓝'
    }
];

app.get('/posts', (request, response) => {
    response.send(data);
});

app.get('/posts/:postId', (request, response) => {
    //获取Id
    const { postId } = request.params;

    //查找具体内容
    const posts = data.filter(item => item.id == postId);

    //作出响应
    response.send(posts[0]);
});

/**
 * post 创建内容
 */
app.post('/posts', (requests, response) => {
    // 获取请求里的数据
    const { content } = requests.body;

    // 输出请求头部数据
    console.log(requests.headers['sing-along']);

    // 设置响应状态码
    response.status(201);

    // 设置响应头部数据
    response.set('Sing-Along', 'How are you?');

    // 作出响应
    response.send({
        message: `成功创建内容: ${ content }`
    });
});