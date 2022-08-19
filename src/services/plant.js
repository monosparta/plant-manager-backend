/* eslint-disable camelcase */
import db from '../db/models';

const getPlant = plantId => db.Plant.findOne({ where: { ID: plantId } });

const createPlant = (plantName, intro, imgPath, nickName, minHumid) => db.Plant.create({
    Name: plantName,
    Intro: intro,
    Img_Path: imgPath,
    Nickname: nickName,
    Min_Humid: minHumid
});

const deletePlantByID = ID => db.Plant.destroy({ where: { ID } });

export { getPlant, createPlant, deletePlantByID };