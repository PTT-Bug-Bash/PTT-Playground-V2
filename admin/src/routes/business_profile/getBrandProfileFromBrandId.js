import getBrandProfiles from "./getBrandProfiles";

const getBrandProfileByBrandId = async (brand_id) => {
    const profiles = await getBrandProfiles();
    const brand_profile = profiles.find(profile => {
        return profile.business_id === brand_id;
    })

    return brand_profile;
};

export default getBrandProfileByBrandId;