import express from 'express'

const app = express()
import path from 'path'

require('dotenv').config({path: path.join(__dirname, '../.env')})
const port = process.env.API_PORT
import {createConnection} from 'typeorm'
import bodyParser from 'body-parser'
import CompanyController from './controllers/CompanyController';
import Company from "./entities/company";
import Team from "./entities/team";
import TeamController from "./controllers/TeamController";
import isAuthenticated from "./middlewares/isAuthenticated";

const main = async () => {
  app.use(bodyParser.json())

  // We'll need this to avoid CORS error when integrating APIs with frontend
  // app.use(cors({ origin: process.env.FRONTEND_SERVER, credentials: true }))

  //Creating database connection
  await createConnection({
     type: 'postgres',
     host: process.env.DB_HOST as string,
     port: process.env.DB_PORT as any,
     username: process.env.DB_USER as string,
     password: process.env.DB_PWD as string,
     database: process.env.DB_NAME as string,
     synchronize: false,
     entities: [
       Company,
       Team
     ],
     logging: false,
   })

  app.get('/', (_req, res) => {
    res.send("Hello world");
  });

  app.get('/companies', isAuthenticated, CompanyController.list);
  // This gives list, either all or based on query params (search by name)

  app.get('/companies/:id', isAuthenticated, CompanyController.view);

  app.post('/companies', isAuthenticated, CompanyController.create);

  app.post('/companies/:companyId/teams', isAuthenticated, TeamController.create)

  app.get('/teams', isAuthenticated, TeamController.list)

  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
  })

}

main()
