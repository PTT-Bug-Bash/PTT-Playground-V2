import getBrandProfileByBrandId from "../business_profile/getBrandProfileFromBrandId";
import getOpportunities from "./getOpportunities";

//this functtion will return APPROVED opportunities from a specified brand based on brand id given
const getOpportunitiesFromBrandId = async (brand_id) => {
    const profile = await getBrandProfileByBrandId(brand_id);
    //get all opportunities
    const opportunities = await getOpportunities();
    //find opportunities where the business_id matches the parameter
    const brand_opportunities = opportunities.filter(brand_opportunity => {
        return brand_opportunity.business_id === profile.business_id && brand_opportunity.campaign_status === "accept";
    });
    
    return brand_opportunities;
}

export default getOpportunitiesFromBrandId;