import { api_url, api_key } from "../../url";

const deleteAthleteProfile = async (deletedAthleteProfile) => {
    const options = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "x-api-key": api_key
        },
        body: JSON.stringify(deletedAthleteProfile)
    };

    const response = await fetch(`${api_url}/api/delete_athlete_profile/${deletedAthleteProfile.id}`, options);
    const data = await response.json();

    if (response.ok)
        return Promise.resolve(data);
    else 
        return Promise.reject(data);
};

export default deleteAthleteProfile;