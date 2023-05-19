import express, { Express } from "express";
import { router } from "./routes/product";
import bodyParser from "body-parser";

const app: Express = express();

// body parser
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use('/api', router)

app.listen(8000, async () => {
    console.log("running at http://localhost:8000")
})

