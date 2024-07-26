// import node modules
import { useState, useEffect } from "react";
import { Button } from "@mui/material";

// import routes
import getBrandProfileByBrandId from "../../../routes/business_profile/getBrandProfileFromBrandId";
import updateBrandProfile from "../../../routes/business_profile/updateBrandProfile";

// import utilities
import { ConformSchema, GenerateForm } from "../../../assets/js/utilities";

// import models
import { brand_profile } from "../../../models/db_models";

// import components
import AddBrandProfileForm from "./AddBrandProfileForm";

export default function BrandProfileForm(props) {
    const { brand_id, onSubmit } = props;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modified, setModified] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                let profile = await getBrandProfileByBrandId(brand_id);
                let model = Object.assign({}, brand_profile.brand_profile);

                if (ConformSchema(model, profile))
                    setData({ model });
                else
                    setData(null);

                setLoading(false);
                console.log(data);
            } catch(error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    // eslint-disable-next-line
    }, []);

    const handleChange = (value, column) => {
        setData(prevState => {
            let model = Object.assign({},  prevState.model);

            if (model[column] !== value)
                setModified(true);

            model[column] = value;
            return { model }
        })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        updateBrandProfile(data.model)
            .then(() => onSubmit())
            .then(() => window.alert("Brand profile updated"))
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
                    GenerateForm(data.model, brand_profile.brand_profile, ["id", "business_id"], handleChange)
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
        <AddBrandProfileForm brand_id={brand_id} onSubmit={ () => { onSubmit(); window.alert("Brand profile created") }} />
    )
}