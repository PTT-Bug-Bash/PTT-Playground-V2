import { api_url, api_key } from "../../url";

export default async function addAthleteLocation(athlete_location) {
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-api-key": api_key
        },
        body: JSON.stringify(athlete_location)
    };

    const response = await fetch(`${api_url}/api/athlete_locations`, options);
    const data = await response.json();

    if (response.ok)
        return Promise.resolve(data);
    else 
        return Promise.reject(data);
}