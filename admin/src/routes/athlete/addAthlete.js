import { api_url, api_key } from "../../url";
import { athlete_profile, deal_preference, locations } from "../../models/db_models";
import addAthleteProfile from "../athlete_profile/addAthleteProfile";
import addDealPreference from "../athlete_deal_preference/addDealPreference";
import addAthleteLocation from "../athlete_locations/addAthleteLocation";

const addAthlete = async (athlete) => {
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-api-key": api_key
        },
        body: JSON.stringify(athlete)
    };

    const response = await fetch(`${api_url}/api/athletes`, options);
    const data = await response.json();

    if (response.ok) {
        // add empty profile, deal preferences, and locations for recently created athlete
        let profile = Object.assign({}, athlete_profile.athlete_profile);
        profile.athlete_id = data.athlete.id;
        
        const profileResponse = await addAthleteProfile(profile);
        
        let preferences = Object.assign({}, deal_preference.deal_preference);
        preferences.athlete_profile_id = profileResponse.id;

        await addDealPreference(preferences);

        let location = Object.assign({}, locations.athlete_locations);
        location.athlete_profile_id = profileResponse.id;

        await addAthleteLocation(location);

        return Promise.resolve(data);
    } else
        return Promise.reject(data);
}

export default addAthlete;
