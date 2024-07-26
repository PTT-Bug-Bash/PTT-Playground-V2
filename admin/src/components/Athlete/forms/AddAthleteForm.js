// import node modules
import { useState } from "react";
import { Button } from "@mui/material";

// import routes
import addAthlete from "../../../routes/athlete/addAthlete";
import linkUserToEntity from "../../../routes/user/linkUserToEntity";
import {sendAthleteEmail} from "../../../routes/email/sendNotif";

// import models
import { athlete } from "../../../models/db_models";

// import utilities
import { GenerateForm } from "../../../assets/js/utilities";

export default function AddAthleteForm(props) {
    const { user, onSubmit } = props;
    const [data, setData] = useState(athlete);
    const [modified, setModified] = useState(false);

    const handleChange = (value, column) => {
        setData(prevState => {
            let athlete = Object.assign({}, prevState.athlete);

            if (athlete[column] !== value)
                setModified(true);

            athlete[column] = value;
            return { athlete };
        }); 
    }

    const handleSubmit = (event) => {
        event.preventDefault();     
        addAthlete(data.athlete)
            .then((data) => { if (user !== undefined && user !== null) { linkUserToEntity(user, data.athlete.id) } })
            .then(() => { if (onSubmit instanceof Function) { onSubmit(); } })
            //.then(() => sendAthleteEmail(data.athlete.first_name, data.athlete.last_name, data.athlete.personal_email, data.athlete.phone, data.athlete.sport_affiliation, data.athlete.sport))
            .catch((error) => window.alert(error.message));
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
                GenerateForm(data.athlete, athlete.athlete, ["id"], handleChange)
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
    );
}
