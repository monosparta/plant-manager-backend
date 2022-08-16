import { faker } from '@faker-js/faker';
import { existsSync, readFileSync, writeFileSync } from 'fs';

const membership = [];

const readOrCreateFakeMember = () => {
    if (!existsSync('./fakeMemberShip.json'))  return generateFakeMember(5);

    const membershipRaw = JSON.parse(
        readFileSync('./fakeMemberShip.json', { encoding: 'utf-8' })
    );
    if (!Array.isArray(membershipRaw)) {
        return generateFakeMember(5);
    }

    for (const member of membershipRaw) {
        if (!member.ID || !member.name || !member.email) {
            return generateFakeMember(5);
        }
        membership.push({
            ID: member.ID,
            name: member.name,
            email: member.email
        });
    }
};

const generateFakeMember = (count) => {
    for (let x = 1; x <= count; ++x) {
        membership.push(generateMemberData());
    }

    writeFakeMember();
    readOrCreateFakeMember();
};

const generateMemberData = () => {
    const data = {};
    data.ID = faker.datatype.uuid();
    data.name = faker.name.firstName();
    data.email = faker.internet.email(data.name);
    return data;
};

const writeFakeMember = () => {
    const json = JSON.stringify(membership, null, 4);
    writeFileSync('./fakeMemberShip.json', json, 'utf8');
};

readOrCreateFakeMember();

const queryMember = email => membership.find(x => x.email === email);

export { queryMember };