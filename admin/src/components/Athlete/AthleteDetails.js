// import node modules
import { Tabs, Tab, Box } from "@mui/material";
import { useState } from "react";

// import components
import AthleteForm from "./forms/AthleteForm";
import AthleteProfileForm from "./forms/AthleteProfileForm";
import AthleteDealPreferencesForm from "./forms/AthleteDealPreferencesForm";
import AthleteLocationsForm from "./forms/AthleteLocationsForm";

export default function AthleteDetails(props) {
    const { athlete, onSubmit, onDelete } = props;
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
                    <Tab label="Deal Preference" value="3" />
                    <Tab label="Locations" value="4" />
                </Tabs>
            </Box>
            <div
                role="tabpanel"
                hidden={displayValue !== "1"}
                id="tabpanel-details"
                aria-labelledby={`tabpanel-details`}
                >
                <AthleteForm athlete={athlete} onSubmit={() => onSubmit()} onDelete={() => { onDelete(); window.alert("Athlete deleted") }} />
            </div>
            <div
                role="tabpanel"
                hidden={displayValue !== "2"}
                id="tabpanel-profile"
                aria-labelledby={`tabpanel-profile`}
                >
                <AthleteProfileForm athlete_id={athlete.id} onSubmit={() => onSubmit()} />
            </div>
            <div
                role="tabpanel"
                hidden={displayValue !== "3"}
                id="tabpanel-preferences"
                aria-labelledby={`tabpanel-preferences`}
                >
                <AthleteDealPreferencesForm athlete_id={athlete.id} onSubmit={() => onSubmit()} />
            </div>
            <div
                role="tabpanel"
                hidden={displayValue !== "4"}
                id="tabpanel-locations"
                aria-labelledby={`tabpanel-locations`}
                >
                <AthleteLocationsForm athlete_id={athlete.id} onSubmit={() => onSubmit()} />
            </div>
        </Box>
    )
}
