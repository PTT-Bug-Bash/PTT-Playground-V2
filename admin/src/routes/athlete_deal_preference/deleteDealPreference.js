import { api_url, api_key } from "../../url";

export default async function deleteDealPreference(preference) {
    const options = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "x-api-key": api_key
        },
        body: JSON.stringify(preference)
    }

    const response = await fetch(`${api_url}/api/delete_deal_preference/${preference.id}`, options);
    const data = await response.json();

    if (response.ok)
        return Promise.resolve(data);
    else 
        return Promise.reject(data);
}