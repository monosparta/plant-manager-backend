import { readOrCreateFakeMember } from './memberShip/fakeMembership';
import { fetchMember } from './memberShip/memberShipAPI';

let membership = [];

const updateMember = async () => {
    if (process.env.USE_FAKE_MEMBER === '1' || !process.env.MEMBER_API_URL) {
        membership = readOrCreateFakeMember();
    } else {
        membership = await fetchMember();
    }

    console.info(`Fetched ${membership.length} member(s)`);
};

updateMember();

const queryMember = (email) => membership.find((x) => x.email === email);

export { queryMember };
