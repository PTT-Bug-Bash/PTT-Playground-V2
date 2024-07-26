import { api_url, api_key } from "../../url";

export default async function addNote(type, note) {
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-api-key": api_key
        },
        body: JSON.stringify(note)
    };

    let url;

    switch (type.toLowerCase()) {
        case "athlete":
            url = `${api_url}/api/athlete_notes`;
            break;
        case "brand":
            url = `${api_url}/api/brand_notes`;
            break;
        default:
            return null;
    }

    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok)
        return Promise.resolve(data);
    else 
        return Promise.reject(data);
};