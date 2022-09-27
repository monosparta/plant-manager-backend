/* eslint-disable camelcase */
import db from '../db/models';
import bcrypt from 'bcrypt';
import { roles } from '../middlewares/permission';

const getUserFromEmail = Email => db.User.findOne({ where: { Email } });

const getUserFromID = ID => db.User.findOne({ where: { ID } });

const createUser = (ID, username, email, password, role) => db.User.create({
    ID,
    Name: username,
    Email: email,
    Password: bcrypt.hashSync(password ,10),
    Is_Default_Password: true,
    Role: role
});

const updatePassword = (ID, password, isDefault = false) =>
    db.User.update(
        {
            Password: bcrypt.hashSync(password, 10),
            Is_Default_Password: isDefault
        },
        { where: { ID } }
    );

const getAdminList = () => db.User.findAll({ where: { Role: roles.admin } });

export { getUserFromEmail, getUserFromID, createUser, updatePassword, getAdminList };