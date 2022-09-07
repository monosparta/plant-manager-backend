import { renameSync, unlinkSync, existsSync,rmSync } from 'fs';
import { join } from 'path';
import db from '../src/db/models';

export default async () => {
    // clean up uploaded images
    const plants = await db.Plant.findAll();
    for (const plant of plants) {
        if (plant.Img_Path.startsWith('uploads/')) {
            if (existsSync(join('./public', plant.Img_Path))) {
                unlinkSync(join('./public', plant.Img_Path));
            }
        }
    }

    // Restore fake datas
    unlinkSync('./fakeMemberShip.json');
    unlinkSync('./mailWhitelist.json');
    rmSync('./fakeInbox', { recursive: true });
    if (existsSync('./fakeMemberShip.backup.json'))
        renameSync('./fakeMemberShip.backup.json', './fakeMemberShip.json');
    if (existsSync('./mailWhitelist.backup.json'))
        renameSync('./mailWhitelist.backup.json', './mailWhitelist.json');
    if (existsSync('./fakeInbox.backup'))
        renameSync('./fakeInbox.backup', './fakeInbox');

    db.sequelize.close();
};
