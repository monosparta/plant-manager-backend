import dotenv from 'dotenv';
dotenv.config();
import { renameSync, writeFileSync, existsSync } from 'fs';
import { randomUUID } from 'crypto';

export default () => {
    if (existsSync('./fakeMemberShip.backup.json')) {
        console.warn(
            '(fakeMemberShip.backup.json) Seems like last test is not ended correctly, backup file has been backed up.'
        );
        renameSync(
            './fakeMemberShip.backup.json',
            `./fakeMemberShip.backup.${randomUUID()}.json`
        );
    }
    if (existsSync('./mailWhitelist.backup.json')) {
        console.warn(
            '(mailWhitelist.backup.json) Seems like last test is not ended correctly, backup file has been backed up.'
        );
        renameSync(
            './mailWhitelist.backup.json',
            `./mailWhitelist.backup.${randomUUID()}.json`
        );
    }
    if (existsSync('./fakeInbox.backup')) {
        console.warn(
            '(fakeInbox.backup) Seems like last test is not ended correctly, backup file has been backed up.'
        );
        renameSync('./fakeInbox.backup', `./fakeInbox.backup.${randomUUID()}`);
    }

    if (existsSync('./fakeMemberShip.json')) {
        renameSync('./fakeMemberShip.json', './fakeMemberShip.backup.json');
    }
    if (existsSync('./mailWhitelist.json')) {
        renameSync('./mailWhitelist.json', './mailWhitelist.backup.json');
    }
    if (existsSync('./fakeInbox')) {
        renameSync('./fakeInbox', './fakeInbox.backup');
    }

    const membership = [
        {
            uuid: '503ac323-3296-4a84-b3b7-2c3dfc5e2689',
            name: 'Alva1',
            email: 'Alva10@gmail.com'
        },
        {
            uuid: 'edd937f2-c323-4b87-9440-ba7d91dfc9f6',
            name: 'Eula',
            email: 'Eula_Ritchie@hotmail.com'
        },
        {
            uuid: 'ae4b61eb-92b7-4f87-9358-7a2cbbf03a81',
            name: 'Gage',
            email: 'Gage_Gislason@gmail.com'
        },
        {
            uuid: '0484592b-4c87-4b01-abce-9f9235a65793',
            name: 'Lori',
            email: 'Lori.dup@gmail.com'
        }
    ];

    const memberJson = JSON.stringify(membership, null, 4);
    writeFileSync('./fakeMemberShip.json', memberJson, 'utf8');

    const mailWhiteList = [process.env.EMAIL_ACCOUNT];

    const mailWhiteListJson = JSON.stringify(mailWhiteList, null, 4);
    writeFileSync('./mailWhitelist.json', mailWhiteListJson, 'utf8');
};
