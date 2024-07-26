import { api_url, api_key } from "../../url";

export default async function updateDealPreferences(preference) {
    const options = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "x-api-key": api_key
        },
        body: JSON.stringify(preference)
    };

    const response = await fetch(`${api_url}/api/update_deal_preference`, options);
    const data = await response.json();

    if (response.ok)
        return Promise.resolve(data);
    else 
        return Promise.reject(data);
}