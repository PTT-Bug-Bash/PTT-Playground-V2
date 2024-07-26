import { api_url, api_key } from "../../url";
import { brand_profile, brand_deals } from "../../models/db_models";
import addBrandProfile from "../business_profile/addBrandProfile";
import addBrandDeal from "../business_deals/addBrandDeal";

const addBrand = async (brand) => {
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-api-key": api_key
        },
        body: JSON.stringify(brand)
    };

    const response = await fetch(`${api_url}/api/businesses`, options);
    const data = await response.json();

    if (response.ok) {
        // add empty profile and deal for recently create athlete
        let profile = Object.assign({}, brand_profile.brand_profile);
        profile.business_id = data.business.id;

        const profileResponse = await addBrandProfile(profile);
        
        let deals = Object.assign({}, brand_deals.brand_deals);
        deals.business_profile_id = profileResponse.id;

        addBrandDeal(deals);

        return Promise.resolve(data);
    }
    else 
        return Promise.reject(data);
}

export default addBrand;