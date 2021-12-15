import {getConnection, getRepository} from "typeorm";
import Company from "../entities/company";
import Team from "../entities/team";

const TeamController = {

  create: async(req: any, res: any) => {
    const companyId = req.params.companyId;
    const selectCompanyById = await getConnection()
      .createQueryBuilder()
      .select()
      .from(Company, 'company')
      .where({id: companyId})
      .execute()
    if(!selectCompanyById[0]){
      return res.status(400).send({
        data: null,
        error: "Company does not exist"
      });
    }

    if(!req.body.teamLeadFirstName){
      return res.status(400).send({
        data: null,
        error: "Team lead first name required"
      });
    }

    if(!req.body.teamLeadLastName){
      return res.status(400).send({
        data: null,
        error: "Team lead last name required"
      });
    }

    try {
      const createTeam = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Team)
        .values({
          companyId,
          teamLeadFirstName: req.body.teamLeadFirstName,
          teamLeadLastName: req.body.teamLeadLastName,
        })
        .returning('id')
        .execute()
      return res.status(200).send({
        data: createTeam.raw[0].id,
        error: null
      })
    } catch (e) {
      console.error('Error while creating team', e);
      return res.status(500).send({data: null, error: "Some error occurred"});
    }

  },

  list: async (_req: any, res: any) => {
    try {
      let teams = await getRepository(Company)
        .createQueryBuilder("company")
        .leftJoinAndSelect("company.teams", "team")
        .getMany();
      return res.status(200).send({data: teams, error: null});
    } catch (e) {
      console.error('Error while fetching list of teams', e);
      return res.status(500).send({data: null, error: "Some error occurred"});
    }
  }

};

export default TeamController