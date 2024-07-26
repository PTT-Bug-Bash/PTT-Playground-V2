// import node modules
import { useState, useEffect } from "react";
import { Button } from "@mui/material";

// import routes
import getDealPreferencesByAthleteId from "../../../routes/athlete_deal_preference/getDealPreferencesByAthleteId";
import updateDealPreference from "../../../routes/athlete_deal_preference/updateDealPreference";

// import utilities
import { GenerateForm, ConformSchema } from "../../../assets/js/utilities";

// import model
import { deal_preference } from "../../../models/db_models";

// import components
import AddDealPreferencesForm from "./AddDealPreferencesForm";

export default function AthleteDealPreferencesForm(props) {
    const { athlete_id, onSubmit } = props;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const[error, setError] = useState(null);
    const [modified, setModified] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                let deal_preferences = await getDealPreferencesByAthleteId(athlete_id);
                let model = Object.assign({}, deal_preference.deal_preference);

                if (ConformSchema(model, deal_preferences))
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
        updateDealPreference(data.model)
            .then(() => onSubmit())
            .then(() => window.alert("Athlete deal preferences updated"))
            .catch((error) => window.alert(error.message));
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        if (error.message === "Cannot read properties of undefined (reading 'id')")
            return <div>No profile for athlete currently exists. Please save the profile first then set preferences.</div>
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
                    GenerateForm(data.model, deal_preference.deal_preference, ["id", "athlete_profile_id"], handleChange)
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
        <AddDealPreferencesForm athlete_id={athlete_id} onSubmit={() => { onSubmit(); window.alert("Athlete deal preferences created") }} />
    )
}