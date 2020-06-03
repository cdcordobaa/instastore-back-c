import "reflect-metadata";
import { createConnection } from "typeorm";
import { Request, Response } from "express";
import express from "express";
import Swagger from "swagger-ui-express";
import * as bodyParser from "body-parser";
import { AppRoutes } from "./routes";
import { Route } from "./shared/types";
import { swaggerDocument } from "./swagger/swaggerDocument";

createConnection()
  .then(async (connection) => {
    const app = express();
    app.use(bodyParser.json());
    app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();
    });
    app.use("/api-docs", Swagger.serve, Swagger.setup(swaggerDocument));

    // register all application routes
    AppRoutes.forEach((route: Route) => {
      app[route.method](
        route.path,
        (request: Request, response: Response, next: Function) => {
          route
            .action(request, response)
            .then((data: any): any => {
              console.log("returning data", data);
              response.status(200).json({
                results: data,
                info: "none",
                erro: null,
              });
              return;
            })
            .then(() => next)
            .catch((err: any) => next(err));
        }
      );
    });

    app.listen(3001);

    console.log("Express application is up and running on port 3001");
  })
  .catch((error) => console.log("TypeORM connection error: ", error));
