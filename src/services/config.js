/* eslint-disable camelcase */
import db from '../db/models';

// default config
const config = { deadline: 5, rentLimit: 1 };

// get or create config
const initConfig = () =>
    db.Config.findOne({ order: [['updatedAt', 'DESC']] }).then((value) => {
        if (!value) {
            db.Config.create({
                Deadline: config.deadline,
                Rent_Limit: config.rentLimit
            });
            return;
        }

        config.deadline = value.Deadline;
        config.rentLimit = value.Rent_Limit;
    });

const getDeadline = () => config.deadline;
const getRentLimit = () => config.rentLimit;

const update = (deadline, rentLimit, user = undefined) =>
    db.Config.create({
        Deadline: deadline,
        Rent_Limit: rentLimit,
        User_ID: user
    });

initConfig();

export { getDeadline, getRentLimit, update };