// import node modules
import { useState, useEffect } from "react";
import { Button } from "@mui/material";

// import routes
import getBrandDealsByBrandId from "../../../routes/business_deals/getBrandDealFromBrandId";
import updateBrandDeal from "../../../routes/business_deals/updateBrandDeal";

// import utilities
import { ConformSchema, GenerateForm } from "../../../assets/js/utilities";

// import model
import { brand_deals } from "../../../models/db_models";

// import components
import AddBrandDealsForm from "./AddBrandDealsForm";

export default function BrandDealsForm(props) {
    const { brand_id, onSubmit } = props;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modified, setModified] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                let deals = await getBrandDealsByBrandId(brand_id);
                let model = Object.assign({}, brand_deals.brand_deals);

                if (ConformSchema(model, deals))
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
        updateBrandDeal(data.model)
            .then(() => onSubmit())
            .then(() => window.alert("Brand deals updated"))
            .catch((error) => window.alert(error.message));
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        if (error.message === "Cannot read properties of undefined (reading 'id')")
            return <div>No profile for brand currently exists. Please save the profile first then set deals.</div>
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
                GenerateForm(data.model, brand_deals.brand_deals, ["id", "business_profile_id"], handleChange)
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
        <AddBrandDealsForm brand_id={brand_id} onSubmit={ () => { onSubmit(); window.alert("Brand deals created") }} />
    )
}