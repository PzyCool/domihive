// src/components/auth/pages/SignupPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

import AuthLayout from "../forms/AuthLayout";
import ProgressSteps from "../forms/ProgressSteps";
import Step1BasicInfo from "../steps/Step1BasicInfo";
import Step2OTPVerification from "../steps/Step2OTPVerification";
import Step3ProfileSetup from "../steps/Step3ProfileSetup";
// import { showNotification } from "../utils/notifications";

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    countryCode: "+234",
    password: "",
    otp: "",
    profilePhoto: null,
    username: "",
    agreeTerms: false,
  });

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to the terms and conditions";
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.otp || formData.otp.length !== 4) {
      newErrors.otp = "Please enter a valid 4-digit OTP";
    }
    return newErrors;
  };

  const handleSubmitStep1 = async (e) => {
    e.preventDefault();
    const validationErrors = validateStep1();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setLoading(true);
    setErrors({});

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStep(2);
      // showNotification("OTP sent to your phone number", "success");
    } catch {
      setErrors({ general: "Failed to send OTP. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitStep2 = async (e) => {
    e.preventDefault();
    const validationErrors = validateStep2();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setErrors({});
    setStep(3);
  };

  const handleSubmitStep3 = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const profilePhotoUrl = formData.profilePhoto
        ? URL.createObjectURL(formData.profilePhoto)
        : null;

      const result = await signup({
        name: formData.name,
        username: formData.username,
        email: "", // Removed email field
        phone: formData.phone,
        countryCode: formData.countryCode,
        profilePhoto: profilePhotoUrl,
      });

      if (result.success) {
        // showNotification("Account created successfully!", "success");
        setTimeout(() => navigate("/"), 1500);
      } else {
        setErrors({
          general: result.error || "Account creation failed. Please try again.",
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrors({ general: "Account creation failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    if (step === 1) handleSubmitStep1(e);
    else if (step === 2) handleSubmitStep2(e);
    else if (step === 3) handleSubmitStep3(e);
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setErrors({});
    }
  };

  const handleSkip = (e) => {
    e.preventDefault();
    handleSubmitStep3(e);
  };

  return (
    <AuthLayout>
      <div className="w-full lg:w-1/2 flex flex-col overflow-hidden">
        <div className="pt-8 px-4 lg:px-8">
          <ProgressSteps currentStep={step} />
        </div>

        <div className="flex-1 overflow-y-auto px-4 lg:px-8 pb-8 no-scrollbar">
  <div className="max-w-md mx-auto pt-8">
    <div className="w-full">
      {step === 1 && (
        <Step1BasicInfo
          formData={formData}
          errors={errors}
          loading={loading}
          handleChange={handleChange}
          goToLogin={goToLogin}
          onSubmit={handleSubmitStep1}
        />
      )}

      {step === 2 && (
        <Step2OTPVerification
  formData={formData}
  errors={errors}
  loading={loading}
  handleChange={handleChange}
  handleBack={handleBack}
  onSubmit={handleSubmitStep2}  // ← Add this
/>
      )}

      {step === 3 && (
        <Step3ProfileSetup
  formData={formData}
  errors={errors}
  loading={loading}
  handleChange={handleChange}
  setFormData={setFormData}
  handleBack={handleBack}
  handleSkip={handleSkip}
  goToLogin={goToLogin}
  onSubmit={handleSubmitStep3}  // ← Add this
/>
      )}
    </div>
  </div>
</div>
      </div>
    </AuthLayout>
  );

  return <div>Signup Page Component - Under Construction</div>;
};

export default SignupPage;