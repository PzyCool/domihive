src/components/auth/
├── forms/                          # Reusable form components
│   ├── AuthLayout.jsx
│   ├── ProgressSteps.jsx
│   ├── PhoneInput.jsx
│   ├── PasswordInput.jsx
│   ├── OTPInput.jsx
│   ├── ProfilePhotoUpload.jsx
│   ├── SocialButtons.jsx
│   ├── FormInput.jsx
│   └── CountryCodeSelect.jsx
├── steps/                          # Step components for signup
│   ├── Step1BasicInfo.jsx
│   ├── Step2OTPVerification.jsx
│   └── Step3ProfileSetup.jsx
├── pages/                          # Complete pages
│   ├── SignupPage.jsx
│   └── LoginPage.jsx
├── utils/                          # Shared utilities
│   ├── validation.js
│   ├── notifications.js
│   ├── constants.js
│   └── passwordStrength.js
└── hooks/                          # Custom hooks
    ├── useAuthForm.js
    └── usePasswordStrength.js