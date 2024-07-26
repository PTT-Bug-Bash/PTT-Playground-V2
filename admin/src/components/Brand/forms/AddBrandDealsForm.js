// import node modules
import { useState } from "react";
import { Button } from "@mui/material";

// import routes
import addBrandDeal from "../../../routes/business_deals/addBrandDeal";
import getBrandProfileFromBrandId from "../../../routes/business_profile/getBrandProfileFromBrandId";

// import models
import { brand_deals } from "../../../models/db_models";

// import utilities
import { GenerateForm } from "../../../assets/js/utilities";

export default function AddBrandDealsForm(props) {
    const { brand_id, onSubmit } = props;

    let deals = Object.assign({}, brand_deals);

    getBrandProfileFromBrandId(brand_id).then((profile) => {
        deals.brand_deals.business_profile_id = profile.id;
    })

    const [data, setData] = useState(deals);
    const [modified, setModified] = useState(false);

    const handleChange = (value, column) => {
        setData(prevState => {
            let brand_deals = Object.assign({}, prevState.brand_deals);

            if (brand_deals[column] !== value)
                setModified(true);

            brand_deals[column] = value;
            return { brand_deals };
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addBrandDeal(data.brand_deals).then(() => onSubmit()).catch((error) => window.alert(error.message));
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
                GenerateForm(data.brand_deals, brand_deals.brand_deals, ["id", "business_profile_id"], handleChange)
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
