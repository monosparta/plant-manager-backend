import axios from 'axios';


const fetchMember = async () => {
    const membership = [];
    const res = await axios.get(process.env.MEMBER_API_URL);
    membership.length = 0;
    res.data.users
        .map((value) => {
            const { uuid, name, email } = value;
            return { uuid, name, email };
        })
        .forEach((member) => membership.push(member));
    return membership;
};


export { fetchMember };