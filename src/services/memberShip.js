import { readOrCreateFakeMember } from './memberShip/fakeMembership';
import { fetchMember } from './memberShip/memberShipAPI';

let membership = [];

const updateMember = async () => {
    /* istanbul ignore next */
    if (
        process.env.USE_FAKE_MEMBER === '1' ||
        !process.env.MEMBER_API_URL ||
        process.env.NODE_ENV === 'test'
    ) {
        membership = readOrCreateFakeMember();
    } else {
        membership = await fetchMember();
    }

    console.info(`Fetched ${membership.length} member(s)`);
};

updateMember();

const queryMember = (email) => membership.find((x) => x.email === email);

export { queryMember, updateMember };
