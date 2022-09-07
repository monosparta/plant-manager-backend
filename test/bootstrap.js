import { renameSync, writeFileSync, existsSync } from 'fs';

export default () => {
    if (existsSync('./fakeMemberShip.json')) renameSync('./fakeMemberShip.json', './fakeMemberShip.backup.json');
    if (existsSync('./mailWhitelist.json')) renameSync('./mailWhitelist.json', './mailWhitelist.backup.json');

    const membership = [
        {
            ID: 'ae4b61eb-92b7-4f87-9358-7a2cbbf03a81',
            name: 'Gage',
            email: 'Gage_Gislason@gmail.com'
        },
        {
            ID: '0484592b-4c87-4b01-abce-9f9235a65793',
            name: 'Lori',
            email: 'Lori.dup@gmail.com'
        }
    ];

    const memberJson = JSON.stringify(membership, null, 4);
    writeFileSync('./fakeMemberShip.json', memberJson, 'utf8');

    const mailWhiteList = [];

    const mailWhiteListJson = JSON.stringify(mailWhiteList, null, 4);
    writeFileSync('./mailWhitelist.json', mailWhiteListJson, 'utf8');
};
