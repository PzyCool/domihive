// src/components/auth/forms/PasswordInput.jsx
import React, { useState, useEffect } from 'react';

const PasswordInput = ({ 
  value = '', 
  onChange, 
  error = '',
  showStrength = true,
  placeholder = '••••••••',
  minLength = 6
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState({ level: 0, text: '', color: 'border-gray-300' });

  useEffect(() => {
    if (!showStrength || !value) {
      setStrength({ level: 0, text: '', color: 'border-gray-300' });
      return;
    }

    let level = 0;
    let text = '';
    let color = 'border-gray-300';

    if (value.length < minLength) {
      level = 1;
      text = 'Too short';
      color = 'border-red-500';
    } else if (value.length >= minLength && value.length <= 8) {
      level = 2;
      text = 'Fair';
      color = 'border-yellow-500';
    } else if (value.length >= 9 && value.length <= 12) {
      level = 3;
      text = 'Good';
      color = 'border-blue-500';
    } else if (value.length > 12) {
      level = 4;
      text = 'Strong';
      color = 'border-green-500';
    }

    setStrength({ level, text, color });
  }, [value, showStrength, minLength]);

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Password
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#9F7539] focus:border-transparent transition-colors pr-12 ${
            error ? 'border-red-500' : strength.color
          }`}
          placeholder={placeholder}
          minLength={minLength}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          {showPassword ? (
            <i className="fas fa-eye-slash text-lg"></i>
          ) : (
            <i className="fas fa-eye text-lg"></i>
          )}
        </button>
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      
      {showStrength && value && !error && (
        <div className="mt-1 flex items-center justify-between">
          <p className={`text-xs font-medium ${
            strength.level === 1 ? 'text-red-600' :
            strength.level === 2 ? 'text-yellow-600' :
            strength.level === 3 ? 'text-blue-600' :
            strength.level === 4 ? 'text-green-600' :
            'text-gray-500'
          }`}>
            {strength.text}
          </p>
          <p className="text-xs text-gray-500">
            {value.length} character{value.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}
      
      {!error && !value && (
        <p className="mt-1 text-xs text-gray-500">
          Minimum {minLength} characters
        </p>
      )}
    </div>
  );
};

export default PasswordInput;