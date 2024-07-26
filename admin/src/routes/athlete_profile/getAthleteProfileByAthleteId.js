import getAthleteProfiles from "./getAthleteProfiles";

const getAthleteProfileByAthleteId = async (athlete_id) => {
    const profiles = await getAthleteProfiles();
    const athlete_profile = profiles.find(profile => {
        return profile.athlete_id === athlete_id;
    });

    return athlete_profile;
    
};

export default getAthleteProfileByAthleteId;