const http = require("http");
const server = http.createServer((req,res) => {
    res.end('<h1>Aloha Kiddo...!</h1>');
});
server.listen(3000, () => console.log('App is running...!'))