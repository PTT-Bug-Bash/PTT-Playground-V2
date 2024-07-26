// import node modules
import { useState } from "react";
import { Button } from "@mui/material";

// import routes
import addAthleteLocation from "../../../routes/athlete_locations/addAthleteLocation";
import getAthleteProfileByAthleteId from "../../../routes/athlete_profile/getAthleteProfileByAthleteId";

// import models
import { locations } from "../../../models/db_models";

// import utilities
import { GenerateForm } from "../../../assets/js/utilities";

export default function AddAthleteLocationsForm(props) {
    const { athlete_id, onSubmit } = props;

    let athlete_locations = Object.assign({}, locations);

    getAthleteProfileByAthleteId(athlete_id).then((profile) => {
        athlete_locations.athlete_locations.athlete_profile_id = profile.id;
    })

    const [data, setData] = useState(athlete_locations);
    const [modified, setModified] = useState(false);

    const handleChange = (value, column) => {
        setData(prevState => {
            let athlete_locations = Object.assign({}, prevState.athlete_locations);

            if (athlete_locations[column] !== value)
                setModified(true);

            athlete_locations[column] = value;
            return { athlete_locations };
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addAthleteLocation(data.athlete_locations).then(() => onSubmit()).catch((error) => window.alert(error.message));
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
                GenerateForm(data.athlete_locations, athlete_locations.athlete_locations, ["id", "athlete_profile_id"], handleChange)
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
