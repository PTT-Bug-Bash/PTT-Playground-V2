import { api_url, api_key } from "../../url";

const updateAthleteProfile = async (athlete_profile) => {
    const options = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "x-api-key": api_key
        },
        body: JSON.stringify(athlete_profile)
    };

    const response = await fetch (`${api_url}/api/update_athlete_profile`, options);
    const data = await response.json();

    if (response.ok)
        return Promise.resolve(data);
    else 
        return Promise.reject(data);
};

export default updateAthleteProfile;