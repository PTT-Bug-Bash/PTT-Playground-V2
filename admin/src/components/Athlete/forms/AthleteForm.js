// import node modules
import { useState, useEffect } from "react";
import { TextField, Box, FormControlLabel, Checkbox, Button } from "@mui/material";

// import routes
import updateAthlete from "../../../routes/athlete/updateAthlete";
import deleteAthlete from "../../../routes/athlete/deleteAthlete";

// import models
import { athlete as athleteModel } from "../../../models/db_models";

export default function AthleteForm(props) {
  const { user, athlete, onSubmit, onDelete } = props;

  const [id, setID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [athleteLevel, setAthleteLevel] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [sport, setSport] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [password, setPassword] = useState("");
  const [optIn, setOptIn] = useState(false);

  useEffect(() => {
    if (athlete) {
      setID(athlete.id);
      setFirstName(athlete.first_name);
      setLastName(athlete.last_name);
      setEmail(athlete.personal_email);
      setPhoneNumber(athlete.phone);
      setAthleteLevel(athlete.athlete_level);
      setGradeLevel(athlete.grade_level);
      setCollegeName(athlete.sport_affiliation);
      setSport(athlete.sport);
      setState(athlete.state);
      setCity(athlete.city);
      setStreet(athlete.address);
      setZipCode(athlete.zip);
      setPassword(athlete.password);
      setOptIn(athlete.opt_in);
    }
  }, [athlete]);

  const handleSubmit = (event) => {
    event.preventDefault();
    let athlete = Object.assign({}, athleteModel.athlete);

    athlete.id = id;
    athlete.first_name = firstName;
    athlete.last_name = lastName;
    athlete.personal_email = email;
    athlete.phone = phone;
    athlete.athlete_level = athleteLevel;
    athlete.grade_level = gradeLevel;
    athlete.state = state;
    athlete.address = street;
    athlete.sport_affiliation = collegeName;
    athlete.sport = sport;
    athlete.city = city;
    athlete.zip = zipCode;
    athlete.password = password;
    athlete.opt_in = optIn;

    console.log(athlete);
    updateAthlete(athlete).then(() => onSubmit()).catch((error) => window.alert(error.message));
  };

  const handleDelete = (event) => {
    event.preventDefault();

    if (window.confirm("Are you sure you want to delete?")) {
      const deletedAthlete = {
        id: id,
      };
      console.log(deletedAthlete);
      deleteAthlete(deletedAthlete).then(() => onDelete());
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
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          sx={{ width: "100%", marginTop: "1vh", marginBottom: "1vh" }}
          label="Phone Number"
          value={phone}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <TextField
          sx={{ width: "100%", marginTop: "1vh", marginBottom: "1vh" }}
          label="Athlete Level"
          value={athleteLevel}
          onChange={(e) => setAthleteLevel(e.target.value)}
        />
        <TextField
          sx={{ width: "100%", marginTop: "1vh", marginBottom: "1vh" }}
          label="Grade Level"
          value={gradeLevel}
          onChange={(e) => setGradeLevel(e.target.value)}
        />
        <TextField
          sx={{ width: "100%", marginTop: "1vh", marginBottom: "1vh" }}
          label="College Name"
          value={collegeName}
          onChange={(e) => setCollegeName(e.target.value)}
        />
        <TextField
          sx={{ width: "100%", marginTop: "1vh", marginBottom: "1vh" }}
          label="Sport"
          value={sport}
          onChange={(e) => setSport(e.target.value)}
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
          label="Street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <TextField
          sx={{ width: "100%", marginTop: "1vh", marginBottom: "1vh" }}
          label="Zip Code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
        <TextField
          sx={{ width: "100%", marginTop: "1vh", marginBottom: "1vh" }}
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={optIn}
              onChange={(e) => setOptIn(e.target.checked)}
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
          <Button variant="contained" color='warning' onClick={handleDelete}>
            Delete User
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
