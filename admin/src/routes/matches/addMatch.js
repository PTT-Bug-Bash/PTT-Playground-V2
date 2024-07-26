import { api_url, api_key } from "../../url";

export default async function addMatch(match) {
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-api-key": api_key
        },
        body: JSON.stringify(match)
    };

    const response = await fetch(`${api_url}/api/matches`, options);
    const data = await response.json();

    if (response.ok)
        return Promise.resolve(data);
    else 
        return Promise.reject(data);
}