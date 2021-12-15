1. The project is setup using Node v14.18.0, npm v7.24.2
2. Create a postgres database
3. Configure .env by referring to .env.example. Also, configure ormconfig.json for database credentials.
4. Install packages:
`npm i`
5. Run migration:
`typeorm migration:run`
6. The app consists of the following APIs

    METHOD | ENDPOINT | DESCRIPTION

- GET /companies
  - List of all companies

- GET /companies?name=SEARCH_BY_NAME
  - List of all companies based on name provided for search

- GET /companies/:id
  - Get company by id

- POST /companies
  - Create a company

- POST /companies/:companyId/teams
  - Create a team in company with id = companyID

- GET /teams
  - List of teams, grouped company-wise

7. All routes have isAuthenticated middleware. In real app, this middleware will check whether the token in the header is valid,
by comparing the token stored in the database.
8. The postman collection is included in the repo, titled 'basic-ts-node-app.postman_collection.json'