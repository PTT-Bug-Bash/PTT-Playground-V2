import React from "react";
import { useState, useEffect } from "react";
import logoImage from "../../assets/images/arlogo.png";
import addBrand from "../../routes/business/addBrand";
import { brand } from "../../models/db_models";


function BusinessForm() {
  const [businessName, setBusinessName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [businessImage, setBusinessImage] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [optIn, setOptIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  /// hide/show password
  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let business = Object.assign({}, brand.brand);
    
    business.business_name = businessName;
    business.first_name = firstName;
    business.last_name = lastName;
    business.middle_name = middleName;
    business.email = email;
    business.password = password;
    business.phone = phoneNumber;
    business.business_image = businessImage;
    business.address = street;
    business.state = state;
    business.city = city;
    business.zip = zipCode;
    business.opt_in = optIn;

    console.log(business);
    addBrand(business).then(() => {
      window.alert("Brand Added!");
      window.location.reload();
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white rounded shadow-md">
      <div style={{ width: '100%' }}>
        <img src={logoImage} alt="Company Logo" style={{ width: '250px', margin: "auto" }} />
      </div>
      <form className="mt-4">
        <div className="mb-4">
          <label
            htmlFor="businessName"
            className="block text-black-600 text-left"
          >
            Business Name<span className="text-red-500">*</span>
          </label>
          <input
            onChange={(event) => setBusinessName(event.target.value)}
            type="text"
            id="businessName"
            name="businessName"
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
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
          <label
            htmlFor="middleName"
            className="block text-black-600 text-left"
          >
            Middle Name
          </label>
          <input
            onChange={(event) => setMiddleName(event.target.value)}
            type="text"
            id="middleName"
            name="middleName"
            className="w-full p-2 border rounded-md"
          />
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
            htmlFor="businessImage"
            className="block text-black-600 text-left"
          >
            Business Image<span className="text-red-500">*</span>
          </label>
          <input
            onChange={(event) => setBusinessImage(event.target.value)}
            type="file"
            id="businessImage"
            name="businessImage"
            accept=".jpg, .jpeg, .png"
            className="w-full p-2 border rounded-md"
            required
          />
          <p className="text-gray-600 text-sm">
            Accepted formats: JPG, JPEG, PNG. Max file size: 10 MB.
          </p>
        </div>
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

export default BusinessForm;
