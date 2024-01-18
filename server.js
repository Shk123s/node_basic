const http = require("http");

const { application } = require("./application");

// {} => use for more file export

const server = http.createServer(application);
server.listen(8080, console.log("server connected at 8080"));
