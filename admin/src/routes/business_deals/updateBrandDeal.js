import { api_url, api_key } from "../../url";

export default async function updateBrandDeal(brand_deal) {
    const options = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "x-api-key": api_key
        },
        body: JSON.stringify(brand_deal)
    };

    const response = await fetch(`${api_url}/api/update_business_deal`, options);
    const data = await response.json();

    if (response.ok)
        return Promise.resolve(data);
    else 
        return Promise.reject(data);
}