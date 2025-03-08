import React, { useState } from "react";
import SignupButton from "../Button/SignupButton";
import submission from "../../utils/submission";
import { useNavigate } from "react-router-dom";

export default function Formsignup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Regular expression for validations
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const containsNumber = (str) => /\d/.test(str);
  const containsLetter = (str) => /[a-zA-Z]/.test(str);
  const containsSpecialChar = (str) => /[!@#$%^&*(),.?":{}|<>]/.test(str);

  const handleSubmit = async () => {
    let tempErrors = {};

    // Validate first name and last name (no numbers)
    if (!firstName) {
      tempErrors.firstName = "First Name is required";
    } else if (containsNumber(firstName)) {
      tempErrors.firstName = "First Name cannot contain numbers";
    }

    if (!lastName) {
      tempErrors.lastName = "Last Name is required";
    } else if (containsNumber(lastName)) {
      tempErrors.lastName = "Last Name cannot contain numbers";
    }

    // Validate email
    if (!email) {
      tempErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      tempErrors.email = "Email is not valid";
    }

    // Validate phone number (no letters)
    if (!phoneNumber) {
      tempErrors.phoneNumber = "Phone Number is required";
    } else if (containsLetter(phoneNumber)) {
      tempErrors.phoneNumber = "Phone Number cannot contain letters";
    }

    // Validate address (required)
    if (!address) {
      tempErrors.address = "Address is required";
    }

    // Validate password and confirm password
    if (!password) {
      tempErrors.password = "Password is required";
    } else if (password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters";
    } else if (!containsLetter(password)) {
      tempErrors.password = "Password must contain at least one letter";
    } else if (!containsSpecialChar(password)) {
      tempErrors.password = "Password must contain at least one special character";
    } else if (!containsNumber(password)) {
      tempErrors.password = "Password must contain at least one number";
    }

    if (confirmPassword !== password) {
      tempErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(tempErrors);

    // If no errors, proceed with sign up
    if (Object.keys(tempErrors).length === 0) {
      const payload = {
        password: password,
        email: email,
        retype_password: confirmPassword,
        first_name: firstName,
        last_name: lastName,
        address: address,
        phone_number: phoneNumber,
      };

      try {
        // Send the data to the backend
        const response = await submission("customer_register", "post", payload);
        console.log("Sign up successful", response);
        
        // Set success message and navigate to login page
        setSuccessMessage("Sign up successful! Redirecting to login...");
        
        // Delay the navigation to show the success message for a brief moment
        setTimeout(() => {
          navigate("/login"); // Redirect to login page
        }, 2000); // Adjust the time for the message to be visible
      } catch (error) {
        console.log("Error during sign-up", error);
      }
    }
  };

  return (
    <div className="w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100">
      <h1 className="text-5xl font-semibold">Welcome to our restaurant</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">
        Welcome! Please create your account.
      </p>

      <div className="mt-8">
        {/* Grid for First Name - Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <div className="flex flex-col">
            <label className="text-lg font-medium">First Name</label>
            <input
              className={`w-full border-2 ${errors.firstName ? "border-red-500" : "border-gray-100"} rounded-xl p-4 mt-1 bg-transparent`}
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && <span className="text-red-500 mt-1">{errors.firstName}</span>}
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-medium">Last Name</label>
            <input
              className={`w-full border-2 ${errors.lastName ? "border-red-500" : "border-gray-100"} rounded-xl p-4 mt-1 bg-transparent`}
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && <span className="text-red-500 mt-1">{errors.lastName}</span>}
          </div>
        </div>

        {/* Grid for Email - Phone Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 mt-2">
          <div className="flex flex-col">
            <label className="text-lg font-medium">Email</label>
            <input
              className={`w-full border-2 ${errors.email ? "border-red-500" : "border-gray-100"} rounded-xl p-4 mt-1 bg-transparent`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className="text-red-500 mt-1">{errors.email}</span>}
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-medium">Phone Number</label>
            <input
              className={`w-full border-2 ${errors.phoneNumber ? "border-red-500" : "border-gray-100"} rounded-xl p-4 mt-1 bg-transparent`}
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {errors.phoneNumber && <span className="text-red-500 mt-1">{errors.phoneNumber}</span>}
          </div>
        </div>

        {/* Address Field */}
        <div className="flex flex-col mt-2">
          <label className="text-lg font-medium">Address</label>
          <input
            className={`w-full border-2 ${errors.address ? "border-red-500" : "border-gray-100"} rounded-xl p-4 mt-1 bg-transparent`}
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {errors.address && <span className="text-red-500 mt-1">{errors.address}</span>}
        </div>

        {/* Grid for Password - Confirm Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 mt-2">
          <div className="flex flex-col">
            <label className="text-lg font-medium">Password</label>
            <input
              className={`w-full border-2 ${errors.password ? "border-red-500" : "border-gray-100"} rounded-xl p-4 mt-1 bg-transparent`}
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <span className="text-red-500 mt-1">{errors.password}</span>}
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-medium">Confirm Password</label>
            <input
              className={`w-full border-2 ${errors.confirmPassword ? "border-red-500" : "border-gray-100"} rounded-xl p-4 mt-1 bg-transparent`}
              placeholder="Enter your password again"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <span className="text-red-500 mt-1">{errors.confirmPassword}</span>}
          </div>
        </div>
        {successMessage && <div className="text-green-500 mt-4">{successMessage}</div>}

        {/* Sign-up Button */}
        <div className="mt-8 flex flex-col gap-y-4 items-center">
          <button onClick={handleSubmit}>
            <SignupButton />
          </button>
        </div>
      </div>
    </div>
  );
}
