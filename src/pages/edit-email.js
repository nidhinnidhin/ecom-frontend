// EditEmailForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function EditEmailForm () {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSendOTP = async () => {
    try {
      const response = await axios.post('http://localhost:8000/account/update-email-send-otp/', { email });
      if (response.data.success) {
        setMessage('OTP sent successfully!');
      } else {
        setMessage('Failed to send OTP');
      }
    } catch (error) {
      setMessage('Failed to send OTP');
      console.error('Error sending OTP:', error);
    }
  };

  return (
    <div>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleSendOTP}>Send OTP</button>
      <p>{message}</p>
    </div>
  );
};
