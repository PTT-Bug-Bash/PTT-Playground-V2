import { api_url, api_key } from "../../url";

export default async function getUser(user) {
    const options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "x-api-key": api_key
        }
    };

    const response = await fetch(`${api_url}/api/users/${user.id}`, options);
    const data = await response.json();

    if (response.ok)
        return Promise.resolve(data);
    else
        return Promise.reject(data);
};