import { api_url, api_key } from "../../url";

const addAthleteProfile = async (athleteProfile) => {
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-api-key": api_key
        },
        body: JSON.stringify(athleteProfile)
    };

    const response = await fetch(`${api_url}/api/athlete_profiles`, options);
    const data = await response.json();

    if (response.ok)
        return Promise.resolve(data);
    else 
        return Promise.reject(data);
};

export default addAthleteProfile;