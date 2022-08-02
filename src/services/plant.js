import db from '../db/models';

const getPlant = plantId => db.Plant.findOne({ where: { ID: plantId } });

export { getPlant };