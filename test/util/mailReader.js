// Only for testing
import { readFileSync, statSync, readdirSync } from 'fs';
import { join } from 'path';

const getNewestFile = (path, keyword = undefined) => {
    const files = readdirSync(path);
    const out = [];
    files.forEach(function (file) {
        if (keyword && !file.includes(keyword)) return;
        const stats = statSync(join(path, file));
        if (stats.isFile()) {
            out.push({ file: file, mtime: stats.mtime.getTime() });
        }
    });
    out.sort(function (a, b) {
        return b.mtime - a.mtime;
    });
    return out.length > 0 ? out[0].file : '';
};

const readLatestPassword = email => {
    const mailContent = readFileSync(join('./fakeInbox',getNewestFile('./fakeInbox', email))).toString();

    const passwordRegex = /(<code>)(?<password>.*)(<\/code>)/;
    return mailContent.match(passwordRegex).groups.password;
};

const readLatestRentId = email => {
    const mailContent = readFileSync(join('./fakeInbox', getNewestFile('./fakeInbox', email))).toString();

    const rentIdRegex = /(rentForm\/)(?<rentId>\d+)( )/;

    return mailContent.match(rentIdRegex).groups.rentId;
};

export { readLatestPassword, readLatestRentId };
