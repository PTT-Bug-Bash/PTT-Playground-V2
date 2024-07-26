import getBrandProfileByBrandId from "../business_profile/getBrandProfileFromBrandId";
import getBrandDeals from "./getBrandDeals";

const getBrandDealsFromBrandId = async (brand_id) => {
    const profile = await getBrandProfileByBrandId(brand_id);
    const deals = await getBrandDeals();
    const brand_deals = deals.find(brand_deals => {
        return brand_deals.business_profile_id === profile.id;
    });

    return brand_deals;
};

export default getBrandDealsFromBrandId;