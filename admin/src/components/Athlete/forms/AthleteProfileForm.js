// import node modules
import { useState, useEffect } from "react";
import { Button } from "@mui/material";

// import routes
import getAthleteProfileByAthleteId from "../../../routes/athlete_profile/getAthleteProfileByAthleteId";
import updateAthleteProfile from "../../../routes/athlete_profile/updateAthleteProfile";

// import utilities
import { GenerateForm, ConformSchema } from "../../../assets/js/utilities";

// import models
import { athlete_profile } from "../../../models/db_models";

// import components
import AddAthleteProfileForm from "./AddAthleteProfileForm";

export default function AthleteProfileForm(props) {
    const { athlete_id, onSubmit } = props;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modified, setModified] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                let profile = await getAthleteProfileByAthleteId(athlete_id);
                let model = Object.assign({}, athlete_profile.athlete_profile);

                if (ConformSchema(model, profile))
                    setData({ model });
                else
                    setData(null);

                setLoading(false);
                console.log(data);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    // eslint-disable-next-line
    }, []);

    const handleChange = (value, column) => {
        setData(prevState => {
            let model = Object.assign({}, prevState.model);

            if (model[column] !== value)
                setModified(true);

            model[column] = value;
            return { model }
        })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        updateAthleteProfile(data.model)
            .then(() => onSubmit())
            .then(() => window.alert("Athlete profile updated"))
            .catch((error) => window.alert(error.message));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (data) {
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
                    GenerateForm(data.model, athlete_profile.athlete_profile, ["id", "athlete_id"], handleChange)
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

    return (
        <AddAthleteProfileForm athlete_id={athlete_id} onSubmit={() => { onSubmit(); window.alert("Athlete profile created") }} />
    )
}