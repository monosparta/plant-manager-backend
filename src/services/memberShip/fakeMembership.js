import { faker } from '@faker-js/faker';
import { existsSync, readFileSync, writeFileSync } from 'fs';

const readOrCreateFakeMember = () => {
    const membership = [];

    /* istanbul ignore next */
    if (!existsSync('./fakeMemberShip.json')) return generateFakeMember(5);

    const membershipRaw = JSON.parse(
        readFileSync('./fakeMemberShip.json', { encoding: 'utf-8' })
    );

    /* istanbul ignore next */
    if (!Array.isArray(membershipRaw)) {
        return generateFakeMember(5);
    }

    let changed = false;
    for (const member of membershipRaw) {
        let { uuid } = member;
        const { name, email } = member;

        /* istanbul ignore next */
        if (!uuid && member.ID) {
            uuid = member.ID;
            changed = true;
        }
        /* istanbul ignore next */
        if (!uuid || !name || !email) {
            return generateFakeMember(5);
        }
        membership.push({ uuid, name, email });
    }
    /* istanbul ignore next */
    if (changed) {
        writeFakeMember(membership);
    }

    return membership;
};

/* istanbul ignore next */
const generateFakeMember = (count) => {
    const membership = [];
    for (let x = 1; x <= count; ++x) {
        membership.push(generateMemberData());
    }

    writeFakeMember(membership);
    return readOrCreateFakeMember();
};

/* istanbul ignore next */
const generateMemberData = () => {
    const data = {};
    data.ID = faker.datatype.uuid();
    data.name = faker.name.firstName();
    data.email = faker.internet.email(data.name);
    return data;
};

/* istanbul ignore next */
const writeFakeMember = (membership) => {
    const json = JSON.stringify(membership, null, 4);
    writeFileSync('./fakeMemberShip.json', json, 'utf8');
};

export { readOrCreateFakeMember };