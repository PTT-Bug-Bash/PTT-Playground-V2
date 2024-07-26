// import node modules
import { useState, useEffect } from "react";
import { TextField, Box, FormControlLabel, Checkbox, Button } from "@mui/material";

// import routes
import updateBusiness from "../../../routes/business/updateBusiness";
import deleteBusiness from "../../../routes/business/deleteBusiness";

// import models
import { brand } from "../../../models/db_models";

export default function BusinessForm(props) {
  const { user, business, onSubmit, onDelete } = props

  const [id, setID] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [optIn, setOptIn] = useState(false);
  const [business_image, setBusiness_image] = useState(null);

  useEffect(() => {
    if (business) {
      setID(business.id);
      setBusinessName(business.business_name);
      setFirstName(business.first_name);
      setLastName(business.last_name);
      setMiddleName(business.middle_name);
      setEmail(business.email);
      setPassword(business.password);
      setPhoneNumber(business.phone);
      setState(business.state);
      setCity(business.city);
      setStreet(business.address);
      setZipCode(business.zip);
      setOptIn(business.opt_in);
      setBusiness_image(business.business_image);
    }
  }, [business]);

  const handleSubmit = (event) => {
    event.preventDefault();
    let business = Object.assign({}, brand.brand);

    business.id = id;
    business.business_name = businessName;
    business.first_name = firstName;
    business.last_name = lastName;
    business.middle_name = middleName;
    business.email = email;
    business.password = password;
    business.phone = phoneNumber;
    business.address = street;
    business.state = state;
    business.city = city;
    business.zip = zipCode;
    business.business_image = business_image;
    business.opt_in = optIn;

    console.log(business);
    updateBusiness(business).then(() => onSubmit()).catch((error) => window.alert(error.message));
  };

  const handleDelete = (event) => {
    event.preventDefault();

    if (window.confirm("Are you sure you want to delete?")) {
      const deletedBusiness = {
        id: id
      };
      console.log(deletedBusiness);
      deleteBusiness(deletedBusiness).then(() => onDelete());
    }
  };

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
      <Box sx={{ overflow: "auto", marginBottom: "3vh" }}>
        <TextField
          sx={{ width: "100%", marginTop: "1vh", marginBottom: "1vh" }}
          label="Business Name"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
        />
        <TextField
          sx={{ width: "100%", marginTop: "1vh", marginBottom: "1vh" }}
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          sx={{ width: "100%", marginTop: "1vh", marginBottom: "1vh" }}
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          sx={{ width: "100%", marginTop: "1vh", marginBottom: "1vh" }}
          label="Middle Name"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
        />
        <TextField
          sx={{ width: "100%", marginTop: "1vh", marginBottom: "1vh" }}
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          sx={{ width: "100%", marginTop: "1vh", marginBottom: "1vh" }}
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          sx={{ width: "100%", marginTop: "1vh", marginBottom: "1vh" }}
          label="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <TextField
          sx={{ width: "100%", marginTop: "1vh", marginBottom: "1vh" }}
          label="Street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <TextField
          sx={{ width: "100%", marginTop: "1vh", marginBottom: "1vh" }}
          label="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <TextField
          sx={{ width: "100%", marginTop: "1vh", marginBottom: "1vh" }}
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <TextField
          sx={{ width: "100%", marginTop: "1vh", marginBottom: "1vh" }}
          label="Zip Code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
        <TextField
          sx={{ width: "100%", marginTop: "1vh", marginBottom: "1vh" }}
          label="Business Image Url"
          value={business_image}
          onChange={(e) => setBusiness_image(e.target.value)}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={optIn}
              onChange={(e) => setOptIn(e.target.checked)}
              name="checkedB"
              color="primary"
            />
          }
          label="Opt In"
        />
      </Box>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        { user === undefined || user === null ?
          <Button variant="contained" color = 'warning' onClick={handleDelete}>
            Delete Brand
          </Button>
          : null
        }
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};