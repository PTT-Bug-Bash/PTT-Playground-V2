import { api_url, api_key } from "../../url";

export default async function deleteAthleteLocation(athlete_location) {
    const options = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "x-api-key": api_key
        },
        body: JSON.stringify(athlete_location)
    }

    const response = await fetch(`${api_url}/api/delete_athlete_location/${athlete_location.id}`, options);
    const data = await response.json();

    if (response.ok)
        return Promise.resolve(data);
    else 
        return Promise.reject(data);
}