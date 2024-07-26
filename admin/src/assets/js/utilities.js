import { TextField, Box, FormControlLabel, Checkbox } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";

export function GetValueOrDefault(object, property, defaultValue) {
    try {
        if (typeof object[property] === "undefined")
            return defaultValue;
        else
            return object[property];
    } catch (error) {
        if (error instanceof TypeError)
            return defaultValue;
        else
            throw error;
    }
};

export function GetDateOrDefault(object, property) {
    try {
        if (typeof object[property] === "undefined")
            return new dayjs("");
        else
            return new dayjs(object[property]);
    } catch (error) {
        if (error instanceof TypeError)
            return new dayjs("");
        else
            throw error;
    }
}

export function GenerateForm(object, model, disabledProperties, onChange) {
    return (
        <Box
            component="form"
            sx={{
                overflow: "auto:", marginBottom: "3vh"
            }}
            noValidate
            autoComplete="off"
        >
            {
                Object.keys(model).filter((property) => object.hasOwnProperty(property)).map((property) => {
                    let label = property.split("_").map((word) => ( word[0].toUpperCase() + word.substring(1) )).join(" ")
                    
                    if (property === "dob") {
                        return (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    key={property}
                                    label={label}
                                    value={GetDateOrDefault(object, property, "")}
                                    onChange={ (e) => onChange(e, property) }
                                />
                            </LocalizationProvider>
                        )
                    }

                    let value;
                    let disabled;
                    
                    switch ((typeof model[property]).toLowerCase()) {
                        case "number":
                            value = GetValueOrDefault(object, property, "");
                            disabled = (disabledProperties.indexOf(property) > -1) ? true : false;
                
                            return (
                                <TextField
                                    sx={{ width: "100%", marginTop: "1vh", marginBottom: "1vh" }}
                                    key={property}
                                    label={label}
                                    value={value}
                                    type="number"
                                    disabled={disabled}
                                    onChange={ (e) => onChange(e.target.value, property) }
                                />
                            );
                        case "boolean":
                            value = GetValueOrDefault(object, property, false);

                            return (
                                <FormControlLabel
                                    key={property}
                                    control={
                                        <Checkbox
                                            checked={value}
                                            onChange={ (e) => onChange(e.target.value, property) }
                                        />
                                    }
                                    label = {label}
                                />
                            );
                        default: 
                            value = GetValueOrDefault(object, property, "");
                            disabled = (disabledProperties.indexOf(property) > -1) ? true : false;
                
                            return (
                                <TextField
                                    sx={{ width: "100%", marginTop: "1vh", marginBottom: "1vh" }}
                                    key={property}
                                    label={label}
                                    value={value}
                                    disabled={disabled}
                                    onChange={ (e) => onChange(e.target.value, property) }
                                />
                            );
                    }
                })
            }
        </Box>
    );
}

export function ConformSchema(model, object) {
    if (object === undefined || object === null)
        return false;

    const modelKeys = Object.keys(model);

    const match = modelKeys.every(property => object.hasOwnProperty(property));

    if (match) {
        modelKeys.forEach(property => {
            model[property] = object[property]
        });

        return true;
    }

    return false;
}