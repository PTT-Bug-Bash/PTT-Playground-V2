// import node modules
import { useState, useEffect } from "react";
import { Button } from "@mui/material";

// import routes
import getAthleteLocationsByAthleteId from "../../../routes/athlete_locations/getAthleteLocationsByAthleteId";
import updateAthleteLocation from "../../../routes/athlete_locations/updateAthleteLocation";

// import utilities
import { GenerateForm, ConformSchema } from "../../../assets/js/utilities"

// import model
import { locations } from "../../../models/db_models"

// import components
import AddAthleteLocationsForm from "./AddAthleteLocationsForm"

export default function AthleteLocationsForm(props) {
    const { athlete_id, onSubmit } = props;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modified, setModified] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                let athlete_locations = await getAthleteLocationsByAthleteId(athlete_id);
                let model = Object.assign({}, locations.athlete_locations);

                if (ConformSchema(model, athlete_locations))
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
        updateAthleteLocation(data.model)
            .then(() => onSubmit())
            .then(() => window.alert("Athlete locations updated"))
            .catch((error) => window.alert(error.message));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        if (error.message === "Cannot read properties of undefined (reading 'id')")
            return <div>No profile for athlete currently exists. Please save the profile first then set locations.</div>
        else
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
                    GenerateForm(data.model, locations.athlete_locations, ["id", "athlete_profile_id"], handleChange)
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
        <AddAthleteLocationsForm athlete_id={athlete_id} onSubmit={() => { onSubmit(); window.alert("Athlete locations created") }} />
    )
}