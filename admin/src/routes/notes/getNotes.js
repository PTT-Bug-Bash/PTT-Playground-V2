import { api_url, api_key } from "../../url";

const getNotes = async () => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": api_key
        }
    };

    const resp = await fetch(`${api_url}/api/notes`, options);
    const data = await resp.json();

    return data;
}

export default getNotes;
