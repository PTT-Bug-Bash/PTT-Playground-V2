import { api_url, api_key } from "../../url";

const getAthleteProfiles = async () => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": api_key
        }
    };

    const response = await fetch(`${api_url}/api/athlete_profiles`, options);

    return response.json();
};

export default getAthleteProfiles;