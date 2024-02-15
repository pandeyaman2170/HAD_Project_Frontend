import React from 'react';
import Section from '../Section/Section';
import Footer from './Footer';

const Footerwrapper = () => {
	return (
		<Section
			id="footer_section"
			style={{
				// minWidth: '1200px',
				backgroundColor: '#28328c',
				padding: ' 48px 0',
				color: '#fff',
				fontSize: '14px',
                padding:'3em',
                '@media (max-width: 768px)': {
                    display: 'flex',
                    flexDirection: 'column', // Set to column for smaller screens
                  },
			}}
		>
			<div
				id="footer_top"
				style={{
					// width: '1180px',
					maxWidth: "100rem",
					// margin: 'auto',
                    marginTop:'1.8em'
				}}
			>
				<Footer>
					<div className='footerdata'>
						<h3>Healthiest</h3>

						<p>About</p>
						<p>Blog</p>
						<p>Careers</p>
						<p>Press</p>
						<p>Contact Us</p>
					</div>
					<div className='footerdata'>
						<h3>For Patients</h3>

						<p>Search for doctors</p>
						<p>Search for hospitals</p>
					</div>
					<div className='footerdata'>
						<h3>More</h3>

						<p>Help</p>
						<p>Developers</p>
						<p>Privacy Policy</p>
						<p>Terms and Conditions</p>
						<p>Healthcare directory</p>
					</div>
					<div className='footerdata'>
						<h3>Social</h3>

						<p>Facebook</p>
						<p>Twitter</p>
						<p>Linkedin</p>
						<p>Youtube</p>
						<p>Github</p>
					</div>
				</Footer>
			</div>
			<div id="footer_img_div" style={{ textAlign: 'center' }}>
				<span>
                    {/* logo of our app */}
                    <div style={{ fontWeight: 'bold', fontSize: '3.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', fontFamily: 'Poppins', color: '#FFFFFF', '@media (max-width: 768px)': {fontSize: '1.5rem'} }}>
                        <span style={{ fontSize: '3.5rem', marginRight: '0.25rem', paddingTop: '1.25rem', '@media (max-width: 768px)': {fontSize: '1.5rem'}}}>
                            <ion-icon name="logo-ionic"></ion-icon>
                        </span>
                        Healthiest
                    </div>
				</span>
				<div style={{ color: '#b8bbd9', fontWeight: 700 }}>
					<span>Copyright © 2024, Healthiest. </span>
					<span>All rights reserved.</span>
				</div>
			</div>
		</Section>
	);
};

export default Footerwrapper;