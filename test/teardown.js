import { renameSync, unlinkSync, existsSync } from 'fs';

// Close sequelize connection after test
export default () => {
    unlinkSync('./fakeMemberShip.json');
    unlinkSync('./mailWhitelist.json');
    if (existsSync('./fakeMemberShip.backup.json')) renameSync('./fakeMemberShip.backup.json', './fakeMemberShip.json');
    if (existsSync('./mailWhitelist.backup.json')) renameSync('./mailWhitelist.backup.json', './mailWhitelist.json');
};
