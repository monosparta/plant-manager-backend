/* eslint-disable camelcase */
import db from '../db/models';

const getContainers = () => db.Container.findAll();

const getContainerUsed = containerId => db.Rent.findOne({ where: { Container_ID: containerId } });

const getEmptyContainers = async () => {
    const containers = await getContainers();

    const emptyContainers = [];
    for (const container of containers) {
        const used = await getContainerUsed(container.ID);
        if (!used) {
            emptyContainers.push({
                id: container.ID
            });
        }
    }

    return emptyContainers;
};

export { getContainers, getContainerUsed, getEmptyContainers };