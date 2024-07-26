// import node modules
import { useState } from "react";
import { Button } from "@mui/material";

// import routes
import addDealPreference from "../../../routes/athlete_deal_preference/addDealPreference";
import getAthleteProfileByAthleteId from "../../../routes/athlete_profile/getAthleteProfileByAthleteId";

// import models
import { deal_preference as preferences } from "../../../models/db_models";

// import utilities
import { GenerateForm } from "../../../assets/js/utilities";

export default function AddDealPreferencesForm(props) {
    const { athlete_id, onSubmit } = props;

    let deal_preference = Object.assign({}, preferences);

    getAthleteProfileByAthleteId(athlete_id).then((profile) => {
        deal_preference.deal_preference.athlete_profile_id = profile.id;
    })

    const [data, setData] = useState(deal_preference);
    const [modified, setModified] = useState(false);

    const handleChange = (value, column) => {
        setData(prevState => {
            let deal_preference = Object.assign({}, prevState.deal_preference);

            if (deal_preference[column] !== value)
                setModified(true);

            deal_preference[column] = value;
            return { deal_preference };
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addDealPreference(data.deal_preference).then(() => onSubmit()).catch((error) => window.alert(error.message));
    }

    return (
        <div
            style={{
                width: "100%",
                padding: "1em",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly"
            }}    
        >
            {
                GenerateForm(data.deal_preference, preferences.deal_preference, ["id", "athlete_profile_id"], handleChange)
            }                
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center"
            }}
            >
                <Button variant="contained" onClick={handleSubmit} disabled={!modified}>
                    Submit
                </Button>
            </div>
        </div>
    )
}
