// import node modules
import { Tabs, Tab, Box } from "@mui/material";
import { useState } from "react";

// import components
import BusinessForm from "./forms/BusinessForm";
import BrandProfileForm from "./forms/BrandProfileForm";
import BrandDealsForm from "./forms/BrandDealsForm";

export default function BrandDetails(props) {
    const { brand, onSubmit, onDelete } = props;
    const [displayValue, setDisplayValue] = useState("1");

    const handleChange = (event, newValue) => {
        setDisplayValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs 
                    value={ displayValue } 
                    onChange={ handleChange } 
                    aria-label="Athlete Detail Tabs"
                    allowScrollButtonsMobile 
                    scrollButtons
                    variant="scrollable"
                >
                    <Tab label="Details" value="1" />
                    <Tab label="Profile" value="2" />
                    <Tab label="Deals" value="3" />
                </Tabs>
            </Box>
            <div
                role="tabpanel"
                hidden={displayValue !== "1"}
                id="tabpanel-details"
                aria-labelledby={`tabpanel-details`}
                >
                <BusinessForm business={brand} onSubmit={() => onSubmit()} onDelete={() => { onDelete(); window.alert("Brand deleted") }} />
            </div>
            <div
                role="tabpanel"
                hidden={displayValue !== "2"}
                id="tabpanel-profile"
                aria-labelledby={`tabpanel-profile`}
                >
                <BrandProfileForm brand_id={brand.id} onSubmit={() => onSubmit()} />
            </div>
            <div
                role="tabpanel"
                hidden={displayValue !== "3"}
                id="tabpanel-deals"
                aria-labelledby={`tabpanel-deals`}
                >
                <BrandDealsForm brand_id={brand.id} onSubmit={() => onSubmit()} />
            </div>
        </Box>
    )
}