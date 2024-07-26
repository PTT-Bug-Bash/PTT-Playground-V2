import React from "react";
import { useState } from "react";
import logoImage from "../../assets/images/arlogo.png";
import addAthlete from "../../routes/athlete/addAthlete";
import { athlete as athleteModel } from "../../models/db_models";

function AthleteForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [athleteLevel, setAthleteLevel] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [sport, setSport] = useState("");
  const [sportOther, setSportOther] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [password, setPassword] = useState("");
  const [optIn, setOptIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  /// hide/show password
  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let athlete = Object.assign({}, athleteModel.athlete);

    athlete.first_name = firstName;
    athlete.last_name = lastName;
    athlete.personal_email = email;
    athlete.phone = phoneNumber;
    athlete.athlete_level = athleteLevel;
    athlete.grade_level = gradeLevel;
    athlete.state = state;
    athlete.address = street;
    athlete.city = city;
    athlete.zip = zipCode;
    athlete.password = password;
    athlete.opt_in = optIn;

    console.log(athlete);
    addAthlete(athlete).then(() => {
      window.alert("Athlete Added!");
      window.location.reload();
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white rounded shadow-md">
      <div style={{ width: '100%' }}>
        <img src={logoImage} alt="Company Logo" style={{ width: '250px', margin: "auto" }} />
      </div>
      <form className="mt-4">
        <div className="mb-4 flex">
          <div className="w-1/2 pr-2">
            <label
              htmlFor="firstName"
              className="block text-black-600 text-left"
            >
              First Name<span className="text-red-500">*</span>
            </label>
            <input
              onChange={(event) => setFirstName(event.target.value)}
              type="text"
              id="firstName"
              name="firstName"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="w-1/2 pl-2">
            <label
              htmlFor="lastName"
              className="block text-black-600 text-left"
            >
              Last Name<span className="text-red-500">*</span>
            </label>
            <input
              onChange={(event) => setLastName(event.target.value)}
              type="text"
              id="lastName"
              name="lastName"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-black-600 text-left">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            id="email"
            name="email"
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-black-600 text-left">
            Password<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              onChange={(event) => setPassword(event.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <p className="text-gray-600 text-sm">
            Password must be at least 8 characters long.
          </p>
        </div>
        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-black-600 text-left"
          >
            Phone<span className="text-red-500">*</span>
          </label>
          <input
            onChange={(event) => setPhoneNumber(event.target.value)}
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            className="w-full p-2 border rounded-md"
            placeholder="123-456-7890"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="profileImage"
            className="block text-black-600 text-left"
          >
            Profile Image<span className="text-red-500">*</span>
          </label>
          <input
            onChange={(event) => setProfileImage(event.target.value)}
            type="file"
            id="profileImage"
            name="profileImage"
            accept=".jpg, .jpeg, .png"
            className="w-full p-2 border rounded-md"
            required
          />
          <p className="text-gray-600 text-sm">
            Accepted formats: JPG, JPEG, PNG. Max file size: 10 MB.
          </p>
        </div>
        <div className="mb-4">
          <label
            htmlFor="athleteLevel"
            className="block text-black-600 text-left"
          >
            Athlete Level<span className="text-red-500">*</span>
          </label>
          <select
            id="athleteLevel"
            name="athleteLevel"
            onChange={(event) => setAthleteLevel(event.target.value)}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">Select Athlete Level</option>
            <option value="High School">High School</option>
            <option value="College">College</option>
            <option value="Professional">Professional</option>
            <option value="Retired">Retired</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {athleteLevel === "College" && (
          <div className="mb-4">
            <label
              htmlFor="gradeLevel"
              className="block text-black-600 text-left"
            >
              Grade Level<span className="text-red-500">*</span>
            </label>
            <select
              id="gradeLevel"
              name="gradeLevel"
              onChange={(event) => setGradeLevel(event.target.value)}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select Grade Level</option>
              <option value="Freshman">Freshman</option>
              <option value="Sophomore">Sophomore</option>
              <option value="Junior">Junior</option>
              <option value="Senior">Senior</option>
              <option value="5th-Year">5th-Year</option>
              <option value="N/A">N/A</option>
            </select>
          </div>
        )}
        <div className="mb-4">
          <label
            htmlFor="collegeName"
            className="block text-black-600 text-left"
          >
            College Name<span className="text-red-500">*</span>
          </label>
          <input
            onChange={(event) => setCollegeName(event.target.value)}
            type="text"
            id="collegeName"
            name="collegeName"
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="sport" className="block text-black-600 text-left">
            What sport do you play?<span className="text-red-500">*</span>
          </label>
          <select
            id="sport"
            name="sport"
            onChange={(event) => setSport(event.target.value)}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">Select Your Sport</option>
            <option value="Basketball">Basketball</option>
            <option value="Baseball">Baseball</option>
            <option value="Cross Country">Cross Country</option>
            <option value="Football">Football</option>
            <option value="Golf">Golf</option>
            <option value="Ice Hockey">Ice Hockey</option>
            <option value="Track and Field">Track and Field</option>
            <option value="Rowing">Rowing</option>
            <option value="Soccer">Soccer</option>
            <option value="Softball">Softball</option>
            <option value="Tennis">Tennis</option>
            <option value="Volleyball">Volleyball</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {sport === "Other" && (
          <div className="mb-4">
            <label
              htmlFor="sportOther"
              className="block text-black-600 text-left"
            >
              If other, enter your sport
              <span className="text-red-500">*</span>
            </label>
            <input
              id="sportOther"
              name="sportOther"
              onChange={(event) => setSportOther(event.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="street" className="block text-black-600 text-left">
            Street<span className="text-red-500">*</span>
          </label>
          <input
            onChange={(event) => setStreet(event.target.value)}
            type="text"
            id="street"
            name="street"
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block text-black-600 text-left">
            City<span className="text-red-500">*</span>
          </label>
          <input
            onChange={(event) => setCity(event.target.value)}
            type="text"
            id="city"
            name="city"
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="state" className="block text-black-600 text-left">
            State<span className="text-red-500">*</span>
          </label>
          <input
            onChange={(event) => setState(event.target.value)}
            type="text"
            id="state"
            name="state"
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="zipCode" className="block text-black-600 text-left">
            Zip Code<span className="text-red-500">*</span>
          </label>
          <input
            onChange={(event) => setZipCode(event.target.value)}
            type="text"
            id="zipCode"
            name="zipCode"
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="country" className="block text-black-600 text-left">
            Country<span className="text-red-500">*</span>
          </label>
          <input
            onChange={(event) => setCountry(event.target.value)}
            type="text"
            id="country"
            name="country"
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="optIn" className="block text-gray-600">
            <input
              type="checkbox"
              id="optIn"
              name="optIn"
              onChange={(event) => setOptIn(event.target.value)}
            />{" "}
            I want to opt in to Athlete Reserve marketing and communications{" "}
          </label>
        </div>
        <div className="mb-4">
          <label htmlFor="acceptTerms" className="block text-gray-600">
            <input
              type="checkbox"
              id="acceptTerms"
              name="acceptTerms"
              required
            />{" "}
            I have read, understand, and agree to the{" "}
            <a href="https://athletereserve.com/privacy-policy/">
              Athlete Reserve Privacy Policy
            </a>
            .<span className="text-red-500">*</span>
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded-md hover-bg-green-700"
          onClick={handleSubmit}
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
}

export default AthleteForm;
