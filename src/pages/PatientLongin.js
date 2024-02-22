import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";

function PatientLogin(){
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Send OTP function
    const sendOtp = async () => {
        setIsLoading(true);
        setError(null);

        try {
        const response = await fetch('/api/send-otp', {
            method: 'POST',
            body: JSON.stringify({ phoneNumber }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error(`Error sending OTP: ${response.statusText}`);
        }

        // Handle successful OTP sending
        alert('OTP sent successfully!'); // Replace with your logic
        } catch (error) {
        setError('Failed to send OTP. Please try again later.');
        } finally {
        setIsLoading(false);
        }
    };

    // Verify OTP function
    const verifyOtp = async () => {
        setIsLoading(true);
        setError(null);

        try {
        const response = await fetch('/api/verify-otp', {
            method: 'POST',
            body: JSON.stringify({ phoneNumber, otp }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error(`Error verifying OTP: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.success) {
            // Handle successful login
            console.log('Logged in successfully!'); // Replace with your logic
        } else {
            setError('Invalid OTP. Please try again.');
        }
        } catch (error) {
        setError('Failed to verify OTP. Please try again later.');
        } finally {
        setIsLoading(false);
        }
    };
    return (
        <>
            <Navbar showLoginButtons={false}/>
            <div>
                <h2>OTP Login</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div>
                    <label htmlFor="phone-number">Phone Number:</label>
                    <input
                        type="tel"
                        id="phone-number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                    </div>
                    <div>
                    <label htmlFor="otp">OTP:</label>
                    <input
                        type="text"
                        id="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                    </div>
                    {isLoading ? (
                    <button disabled>Sending...</button>
                    ) : (
                    <button onClick={sendOtp}>Send OTP</button>
                    )}
                    {error && <p className="error">{error}</p>}
                    {otp && (
                    <button onClick={verifyOtp}>Verify OTP</button>
                    )}
                </form>
                </div>
        </>
    )
}

export default PatientLogin;