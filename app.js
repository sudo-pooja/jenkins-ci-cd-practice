const http = require("http");
const server = http.createServer((req,res) => {
    res.end('<h1>This is a demo for the CI-CD with Jenkins!</h1>');
});
server.listen(3000, () => console.log('App is running on port 3000'))