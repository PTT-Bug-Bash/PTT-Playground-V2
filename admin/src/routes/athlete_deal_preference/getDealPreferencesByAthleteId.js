import getAthleteProfileByAthleteId from "../athlete_profile/getAthleteProfileByAthleteId";
import getDealPreferences from "./getDealPreferences";

const getDealPreferencesByAthleteId = async (athlete_id) => {
    const profile = await getAthleteProfileByAthleteId(athlete_id);
    const preferences = await getDealPreferences();
    const athlete_preferences = preferences.find(athlete_preferences => {
        return athlete_preferences.athlete_profile_id === profile.id;
    });

    return athlete_preferences;
};

export default getDealPreferencesByAthleteId;