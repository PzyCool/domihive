// src/components/auth/utils/constants.js
import iconImage from '../../../assets/domihive-lcon.png';
import logoImage from '../../../assets/domihive-logo.png';

const IMAGES = {
  icon: iconImage,
  logo: logoImage
};

const SIGNUP_FEATURES = [
  { icon: "fas fa-shield-alt", text: "Verified Properties" },
  { icon: "fas fa-home", text: "Professional Management" },
  { icon: "fas fa-search", text: "Smart Search" },
];

const LOGIN_FEATURES = [
  { icon: "fas fa-home", text: "Access Your Properties" },
  { icon: "fas fa-file-alt", text: "Manage Applications" },
  { icon: "fas fa-bell", text: "Get Notifications" },
];

export { IMAGES, SIGNUP_FEATURES, LOGIN_FEATURES };
