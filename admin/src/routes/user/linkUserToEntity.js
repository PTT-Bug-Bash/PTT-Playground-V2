import { api_url, api_key } from "../../url";

export default async function linkUserToEntity(user, entity_id) {
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-api-key": api_key
        }
    }

    let endpoint_url;

    if (user.role.toLowerCase() === "athlete")
        endpoint_url = `${api_url}/api/link_user_to_athlete`;

    if (user.role.toLowerCase() === "brand")
        endpoint_url = `${api_url}/api/link_user_to_brand`;

    const response = await fetch(`${endpoint_url}/${user.id}&${entity_id}`, options);
    const data = await response.json();

    if (response.ok)
        return Promise.resolve(data);
    else
        return Promise.reject(data);
}