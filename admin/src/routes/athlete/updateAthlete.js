import { api_url, api_key } from "../../url";

const updateAthlete = async (athlete) => {
    const options = {
        method: 'PUT' ,
        headers: {
            "Content-Type": "application/json",
            "x-api-key": api_key
        },
        body: JSON.stringify(athlete)
    }

    const response = await fetch(`${api_url}/api/update_athlete`, options);
    const data = await response.json();

    if (response.ok)
        return Promise.resolve(data);
    else 
        return Promise.reject(data);
}

export default updateAthlete;