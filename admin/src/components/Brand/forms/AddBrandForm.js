// import nod emodules
import { useState } from 'react';
import { Button } from "@mui/material";

// import routes
import addBrand from "../../../routes/business/addBrand";
import linkUserToEntity from "../../../routes/user/linkUserToEntity";
import { sendOrgEmail } from "../../../routes/email/sendNotif"

// import models
import { brand } from "../../../models/db_models";

// import utilities
import { GenerateForm } from "../../../assets/js/utilities"

export default function AddBrandForm(props) {
    const { user, onSubmit } = props;
    const [data, setData] = useState(brand);
    const [modified, setModified] = useState(false);

    const handleChange = (value, column) => {
        setData(prevState => {
            let brand = Object.assign({}, prevState.brand);

            if (brand[column] !== value)
                setModified(true);

            brand[column] = value;
            return { brand };
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addBrand(data.brand)
            .then((data) => { if (user !== undefined && user !== null) { linkUserToEntity(user, data.business.id) } })
            .then(() => { if (onSubmit instanceof Function) { onSubmit(); } })
            //.then(() => sendOrgEmail(data.brand.business_name, data.brand.first_name, data.brand.last_name, data.brand.email, data.brand.phone))
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
                GenerateForm(data.brand, brand.brand, ["id"], handleChange)
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