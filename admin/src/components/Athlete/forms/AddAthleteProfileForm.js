// import node modules
import { useState } from "react";
import { Button } from "@mui/material";

// import routes
import addAthleteProfile from "../../../routes/athlete_profile/addAthleteProfile";

// import models
import { athlete_profile } from "../../../models/db_models";

// import utilities
import { GenerateForm } from "../../../assets/js/utilities";

export default function AddAthleteProfileForm(props) {
    const { athlete_id, onSubmit } = props;

    let profile = Object.assign({}, athlete_profile);
    profile.athlete_profile.athlete_id = athlete_id;

    const [data, setData] = useState(profile);
    const [modified, setModified] = useState(false);

    const handleChange = (value, column) => {
        setData(prevState => {
            let athlete_profile = Object.assign({}, prevState.athlete_profile);

            if (athlete_profile[column] !== value)
                setModified(true);

            athlete_profile[column] = value;
            return { athlete_profile };
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addAthleteProfile(data.athlete_profile).then(() => onSubmit()).catch((error) => window.alert(error.message));
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
                GenerateForm(data.athlete_profile, athlete_profile.athlete_profile, ["id", "athlete_id"], handleChange)
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
