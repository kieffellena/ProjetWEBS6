//configuration serveur Express,
//déclaration routes pour gérer les pages et interactions

import express, { request, response } from "express";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import cookiesSession from "cookie-session";
import * as indexRoute from "./routes/index.js"
//import * as signUpRoute from "./routes/signup.js"
//import * as logOutRoute from "./routes/logout.js"
import * as logInRoute from "./routes/login.js"
import * as contribuerRoute from "./routes/contribuer.js"

const PORT = 8080;
const databaseFile = "database.sqlite";
const sessionKey = "plBzHBa/4AJKEGkss0VmyPCdwHoVpEzaKj2uY0aWd4E=";
const sessionMaxAge = 24 * 60 * 60 * 1000; // 24 hours

function start(database) {
  const app = express();

  //intergiciel de log
  app.use((request, response, next) => {
    console.log(`${request.method} ${request.url}`);
    next();

  })

  //ouverture de la bdd
  app.use((request, response, next) => {
    request.context = request.context ?? {};
    request.context.database = database;
    next();
  })

  app.use(
    cookiesSession({
      keys: [sessionKey],
      maxAge: sessionMaxAge,
      sameSite: "strict"
    })
  )

  app.use((req, res, next) => {
    req.isLoggedIn = !!req.session?.username;
    next();
  });
  
  /*app.use((request, response, next) => {
    const username = request.session?.username;
    if (typeof username !== "string") {
      next();
      return;
    }
    request.context.database
      .prepare("SELECT username, name FROM users WHERE username = ?")
      .then((statement) => statement.get(request.session.username))
      .then((user) => {
        request.context = request.context ?? {};
        request.context.user = user;
        next();
      })
      .catch((error) => {
        console.error("Error loading user from session", error);
        // Clear the session to ensure the error doesn't persist.
        request.session = null;
        next();
      });
  });*/


  app.use(express.static("public", { extensions: ["html"] }));
  app.use(express.json());

  //routes
  app.get("/", indexRoute.get);
  app.post("/contribuer", contribuerRoute.post);
  //app.post("/signup", signUpRoute.post);
  app.post("/login", logInRoute.post);
  //app.post("/logout", logOutRoute.post);
  app.get("/session", (req, res) => {
    res.json({
      isLoggedIn: !!req.session?.username,
      username: req.session?.username || null
    });
  });
  
  app.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
  });
  

  app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });

}

open({ filename: databaseFile, driver: sqlite3.Database })
  .then(start)
  .catch((error) => {
    console.error("Error opening database", error);
    process.exit(1);
  });
