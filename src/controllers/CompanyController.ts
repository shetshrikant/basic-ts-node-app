import {getConnection} from "typeorm";
import Company from "../entities/company.js";
import moment from "moment";

const CompanyController = {

  list: async (req: any, res: any) => {
    const nameFromQuery = req.query.name;
    if(nameFromQuery){
      try {
        const searchCompanyByName = await getConnection()
          .createQueryBuilder()
          .select()
          .from(Company, 'company')
          .where("company.name ilike :name", { name: nameFromQuery })
          .execute()
        return res.status(200).send({data: searchCompanyByName, error: null});
      } catch (e) {
        console.error('Error while searching company', e);
        return res.status(500).send({data: null, error: "Some error occurred"});
      }
    }

    try {
      let companies = await getConnection()
        .createQueryBuilder()
        .select()
        .from(Company, 'company')
        .execute()
      return res.status(200).send({data: companies, error: null});
    } catch (e) {
      console.error('Error while fetching list of companies', e);
      return res.status(500).send({data: null, error: "Some error occurred"});
    }
  },

  create: async (req: any, res: any) => {
    if (!req.body.name) {
      return res.status(400).send({
        data: null,
        error: "Company name is required"
      });
    }

    if (req.body.inceptionDate && !moment(req.body.inceptionDate, 'YYYY-MM-DD', true).isValid()) {
      return res.status(400).send({
        data: null,
        error: "Company inception date is invalid"
      });
    }

    try {
      const searchCompanyByName = await getConnection()
        .createQueryBuilder()
        .select(['name'])
        .from(Company, 'company')
        .where("company.name ilike :name", { name:`${req.body.name}` })
        .execute()

      if(searchCompanyByName[0]){
        return res.status(400).send({
          data: null,
          error: "Company already exists"
        });
      }

      const createCompany = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Company)
        .values({
          name: req.body.name,
          inceptionDate: req.body.inceptionDate,
          ceoFirstName: req.body.ceoFirstName,
          ceoLastName: req.body.ceoLastName,
          address: req.body.address,
        })
        .returning('id')
        .execute()

      return res.status(200).send({
        data: createCompany.raw[0].id,
        error: null
      })
    } catch (e) {
      console.error('Error while creating company', e);
      return res.status(500).send({data: null, error: "Some error occurred"});
    }
  },

  view: async (req: any, res: any) => {
    const id = req.params.id;
    try {
      const getCompanyInfo = await getConnection()
        .createQueryBuilder()
        .select()
        .from(Company, 'company')
        .where({id})
        .execute()
      if (!getCompanyInfo[0]) {
        return res.status(400).send({
          error: "No such company exists",
          data: null
        });
      }
      return res.status(200).send({
        data: getCompanyInfo[0],
        error: null
      })
    } catch (e) {
      console.error('Error while creating company', e);
      return res.status(500).send({data: null, error: "Some error occurred"});
    }
  },
}

export default CompanyController;