import getAthleteProfileByAthleteId from "../athlete_profile/getAthleteProfileByAthleteId";
import getAthleteLocations from "./getAthleteLocations";

const getAthleteLocationsByAthleteId = async (athlete_id) => {
    const profile = await getAthleteProfileByAthleteId(athlete_id);
    const locations = await getAthleteLocations();
    const athlete_locations = locations.find(athlete_locations => {
        return athlete_locations.athlete_profile_id === profile.id;
    });

    return athlete_locations;
};

export default getAthleteLocationsByAthleteId;