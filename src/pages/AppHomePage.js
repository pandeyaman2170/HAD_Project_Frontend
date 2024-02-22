import React from 'react';
import Footerwrapper from '../components/Footer/Footerwrapper';
import Navbar from '../components/Navbar/Navbar';
import './AppHomePage.css'
// import '../resources/style.css'

function  AppHomePage(){
    const hospitalCount = 19; // Replace with actual number of hospitals
    const doctorCount = 252; // Replace with actual number of doctors
    const consultationCount = 3964; // Replace with actual number of consultations
    const registeredCount = 1497; // Replace with actual number of registered people

    const hospitals = [
        { name: 'Hospital Name 1', description: 'Brief description...' },
        { name: 'Hospital Name 2', description: 'Brief description...' },
        { name: 'Hospital Name 3', description: 'Brief description...' },
        { name: 'Hospital Name 4', description: 'Brief description...' },
      ];
  
    const imagePath = require('../resources/images/home_image.jpg');
    const hospitalImage = require('../resources/images/hospital.svg').default;
    return(
        <div>
            <Navbar showLoginButtons={true}/>
            <div className="body-container">
                <div className='body-image-container'>
                    <img src={imagePath} alt="Home page image" /> 
                </div>
                <div className='crips-container'>
                    <div className="crisp">
                    <h2>Healthcare On-Demand</h2>
                        <p>Connect with Top Doctors From Your Home.</p>
                    </div>

                    <div className="crisp">
                        <h2>Skip the Wait, See a Doctor Today</h2>
                        <p>Instant Appointments Through Video Call.</p>
                    </div>

                    <div className="crisp">
                        <h2>Your Health, Simplified</h2>
                        <p>Convenient telemedicine for all your needs. Skip the wait and see a doctor from the comfort of your home or office.</p>
                    </div>
                    <div class="crisp">
                        <h2>Access Your Medical Records Anytime</h2>
                        <p>View past consultations, prescriptions, and diagnoses for informed healthcare decisions.</p>
                    </div>
                    <div class="crisp">
                        <h2>Choose Your Preferred Hospital</h2>
                        <p>Connect with doctors from your trusted hospital or discover new options nearby.</p>
                    </div>
                    <div class="crisp">
                        <h2>Senior Doctor Management</h2>
                        <p>Efficiently manage experienced medical professionals, ensuring the best care for patients.</p>
                    </div>
                </div>
                </div>

                <div className="top-hospitals-card">
                <h2>Top Hospitals on Portal</h2>
                <div className="hospitals-grid">
                    {hospitals.map((hospital, index) => (
                    <div className="hospital-item" key={index}>
                    <img src={hospitalImage} alt="Hospital Icon" />
                    <div className="hospital-info">
                      <h3>{hospital.name}</h3>
                      <p>{hospital.description}</p>
                    </div>
                  </div>
                    ))}
                </div>
                </div>

                {/* new card for hospital consultency and people registed */}
                <div className="long-stripe">
                    <div className="stat-card">
                        <h3>Hospitals</h3>
                        <p>{hospitalCount}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Doctors</h3>
                        <p>{doctorCount}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Consultations</h3>
                        <p>{consultationCount}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Registered People</h3>
                        <p>{registeredCount}</p>
                    </div>
                </div>

            <Footerwrapper/>
        </div>
        
    )
}

export default AppHomePage;