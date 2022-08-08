/* eslint-disable camelcase */
import db from '../db/models';

const getContainers = () => db.Container.findAll();

const getContainerUsed = containerId => db.Rent.findOne({ where: { Container_ID: containerId } });

export { getContainers, getContainerUsed };