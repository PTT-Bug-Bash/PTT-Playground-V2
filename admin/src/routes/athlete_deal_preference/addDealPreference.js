import { api_url, api_key } from "../../url";

export default async function addDealPreference(preference) {
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-api-key": api_key
        },
        body: JSON.stringify(preference)
    };

    const response = await fetch(`${api_url}/api/athlete_deal_preferences`, options);
    const data = await response.json();

    if (response.ok)
        return Promise.resolve(data);
    else 
        return Promise.reject(data);
}