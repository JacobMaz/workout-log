require("dotenv").config();
const express = require("express");
const db = require("./db");
const controllers = require("./controllers");
const validateSession = require("./middleware/validateSession");
const app = express();

app.use(require("./middleware/headers"));
app.use(express.json())
app.use("/user", controllers.usercontroller);
app.use('/userinfo', validateSession, controllers.userinfocontroller);
app.use("/log", validateSession, controllers.logcontroller);

db.authenticate()
.then(() => db.sync())
.then(() => {
    app.listen(process.env.PORT, () => console.log(`[Server: ] App is listening on Port ${process.env.PORT}`));
})
.catch((err) => {
    console.log("[Server: ] Server Crashed");
    console.error(err);
})