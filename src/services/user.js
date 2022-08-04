import db from '../db/models';

const getUserFromEmail = Email => db.User.findOne({ where: { Email } });

const getUserFromID = ID => db.User.findOne({ where: { ID } });

export { getUserFromEmail, getUserFromID };