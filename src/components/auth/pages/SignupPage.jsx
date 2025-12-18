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
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+234",
    password: "",
    confirmPassword: "",
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

  const handleSubmitStep1 = async (e) => {
    e.preventDefault();
    setLoading(true);

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
  
  if (!formData.otp || formData.otp.length !== 4) {
    setErrors({ otp: "Please enter a valid 4-digit OTP" });
    return;
  }

  setStep(3);
};

  const handleSubmitStep3 = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const profilePhotoUrl = formData.profilePhoto
        ? URL.createObjectURL(formData.profilePhoto)
        : null;

      const result = await signup({
        name: formData.name,
        username: formData.username,
        email: formData.email,
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
    if (step === 1) return handleSubmitStep1(e);
    if (step === 2) return handleSubmitStep2(e);
    if (step === 3) return handleSubmitStep3(e);
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <AuthLayout>
      <div className="w-full lg:w-1/2 flex flex-col overflow-hidden">
        <div className="pt-8 px-4 lg:px-8">
          <ProgressSteps currentStep={step} />
        </div>

        <div className="flex-1 overflow-y-auto px-4 lg:px-8 pb-8 no-scrollbar">
          <div className="max-w-md mx-auto pt-8">
            <form onSubmit={handleSubmit} className="w-full">
              {step === 1 && (
                <Step1BasicInfo
                  formData={formData}
                  errors={errors}
                  loading={loading}
                  handleChange={handleChange}
                  goToLogin={goToLogin}
                />
              )}

              {step === 2 && (
                <Step2OTPVerification
                  formData={formData}
                  errors={errors}
                  loading={loading}
                  handleChange={handleChange}
                />
              )}

              {step === 3 && (
                <Step3ProfileSetup
                  formData={formData}
                  errors={errors}
                  loading={loading}
                  setFormData={setFormData}
                  imagePreview={imagePreview}
                  setImagePreview={setImagePreview}
                />
              )}
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignupPage;
