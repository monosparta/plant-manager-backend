/* eslint-disable camelcase */
import db from '../db/models';
import bcrypt from 'bcrypt';

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

const destroyUserByID = (ID) => db.User.destroy({ where: { ID } });

export { getUserFromEmail, getUserFromID, createUser, updatePassword, destroyUserByID };
