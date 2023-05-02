const indexR = require("./index");
const usersR = require("./users");
const bikesR = require("./bikes");

exports.routesInit = (app) => {
  app.use("/",indexR);
  app.use("/users",usersR);
  app.use("/bikes",bikesR);
}