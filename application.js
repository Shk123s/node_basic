
const connection = require("./database");
const url = require('url');
const application = (req, res) => {


  // console.log(req);
  if (req.method === "GET" && req.url === "/users") {
    connection.query("SELECT * FROM users", function (err, result) {
      if (err) {
        console.error(err);
        res.writeHead(500, { "Content-type": "application/json" });
        res.end(JSON.stringify({ error: "Internal Server Error" }));
      } else {
        // Assuming result is an array of user objects, you may want to adjust accordingly
        // res.setHeader("Content-type", "application/json");
        console.log(result);
        res.end(JSON.stringify(result));
      }
    });
  }
  
  // if (req.method === "POST" && req.url === "/Addusers") {
  // //  console.log( JSON.stringify(req.body.names))
  // let names = req.body.names, 
  //   created_at = req.body.created_at  
  //   updated_at = req.body.updated_at, 
  //   is_active = req.body.is_active  
  //   email = req.body.email, 
  //   password = req.body.password  
  //   let sql = "INSERT INTO users (names, created_at, updated_at, is_active, email, password) VALUES  (?,?,?,?,?,?)";          
 
  //   db.query(sql, [names, created_at, updated_at, is_active, email, password], (err,result) => {
  //       if(!err) 
  //      {
  //       console.log(result)
  //       res.send("User successfully added");
  //      }
  //       else 
  //         console.log(err);
  // })
  // }


    const parsedUrl = url.parse(req.url, true);
  
    if (req.method === 'POST' && parsedUrl.pathname === '/Addusers') {
      const queryData = parsedUrl.query;
  
      let names = queryData.names;
      let created_at = queryData.created_at;
      let updated_at = queryData.updated_at;
      let is_active = queryData.is_active;
      let email = queryData.email;
      let password = queryData.password;
  
      let sql = "INSERT INTO users (names, created_at, updated_at, is_active, email, password) VALUES (?, ?, ?, ?, ?, ?)";
  
      // Assuming db is your database connection
      connection.query(sql, [names, created_at, updated_at, is_active, email, password], (err, result) => {
        if (!err) {
          console.log(result);
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('User successfully added');
        } else {
          console.log(err);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
        }
      });
    } 
  //  else {
    //   res.writeHead(404, { 'Content-Type': 'text/plain' });
    //   res.end('Not Found');
    // }
  ;
  
  

};

module.exports = { application };
