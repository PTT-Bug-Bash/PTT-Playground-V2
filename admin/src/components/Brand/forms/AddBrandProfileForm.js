// import node modules
import { useState } from "react";
import { Button } from "@mui/material";

// import routes
import addBrandProfile from "../../../routes/business_profile/addBrandProfile";

// import models
import { brand_profile } from "../../../models/db_models";

// import utilities
import { GenerateForm } from "../../../assets/js/utilities";

export default function AddBrandProfileForm(props) {
    const { brand_id, onSubmit } = props;

    let profile = Object.assign({}, brand_profile);
    profile.brand_profile.business_id = brand_id;

    const [data, setData] = useState(profile);
    const [modified, setModified] = useState(false);

    const handleChange = (value, column) => {
        setData(prevState => {
            let brand_profile = Object.assign({}, prevState.brand_profile);

            if (brand_profile[column] !== value)
                setModified(true);

            brand_profile[column] = value;
            return { brand_profile };
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addBrandProfile(data.brand_profile).then(() => onSubmit()).catch((error) => window.alert(error.message));
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
                GenerateForm(data.brand_profile, brand_profile.brand_profile, ["id", "business_id"], handleChange)
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
