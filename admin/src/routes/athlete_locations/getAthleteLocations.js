import { api_url, api_key } from "../../url";

export default async function getAthleteLocations() {
    const options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "x-api-key": api_key
        }
    };

    const response = await fetch(`${api_url}/api/athlete_locations`, options);
    const data = await response.json();

    return data;
}