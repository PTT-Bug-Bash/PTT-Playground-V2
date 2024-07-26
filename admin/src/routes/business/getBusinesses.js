import { api_url, api_key } from "../../url";

const getBusinesses = async() => {
    console.log(api_key)

    const options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "x-api-key": api_key
        }
    };
    const resp = await fetch(`${api_url}/api/businesses`, options);
    const data = await resp.json();

    return data;
}

export default getBusinesses;