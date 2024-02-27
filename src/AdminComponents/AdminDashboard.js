import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import AdminShowCase from './AdminShowCase';
import { Footer } from 'flowbite-react';
import axios from 'axios';
import HomePageFooter from '../components/HomePageFooter';

const AdminDashboard = () => {
  const doctors = [
    { id: 1, name: 'Dr. John Doe', specialty: 'Cardiology' },
    { id: 2, name: 'Dr. Jane Smith', specialty: 'Pediatrics' },
    { id: 1, name: 'Dr. John Doe', specialty: 'Cardiology' },
    { id: 2, name: 'Dr. Jane Smith', specialty: 'Pediatrics' },
    { id: 1, name: 'Dr. John Doe', specialty: 'Cardiology' },
    { id: 2, name: 'Dr. Jane Smith', specialty: 'Pediatrics' },
    { id: 1, name: 'Dr. John Doe', specialty: 'Cardiology' },
    { id: 2, name: 'Dr. Jane Smith', specialty: 'Pediatrics' },
    { id: 1, name: 'Dr. John Doe', specialty: 'Cardiology' },
    { id: 2, name: 'Dr. Jane Smith', specialty: 'Pediatrics' },
    { id: 1, name: 'Dr. John Doe', specialty: 'Cardiology' },
    { id: 2, name: 'Dr. Jane Smith', specialty: 'Pediatrics' },
    { id: 1, name: 'Dr. John Doe', specialty: 'Cardiology' },
    { id: 2, name: 'Dr. Jane Smith', specialty: 'Pediatrics' },
    { id: 1, name: 'Dr. John Doe', specialty: 'Cardiology' },
    { id: 2, name: 'Dr. Jane Smith', specialty: 'Pediatrics' },
  ];

  const patients = [
    { id: 1, name: 'Alice Johnson', condition: 'Fever' },
    { id: 2, name: 'Bob Williams', condition: 'Fracture' },
    { id: 1, name: 'Alice Johnson', condition: 'Fever' },
    { id: 2, name: 'Bob Williams', condition: 'Fracture' },
    { id: 1, name: 'Alice Johnson', condition: 'Fever' },
    { id: 2, name: 'Bob Williams', condition: 'Fracture' },
    { id: 1, name: 'Alice Johnson', condition: 'Fever' },
    { id: 2, name: 'Bob Williams', condition: 'Fracture' },
    { id: 1, name: 'Alice Johnson', condition: 'Fever' },
    { id: 2, name: 'Bob Williams', condition: 'Fracture' },
    { id: 1, name: 'Alice Johnson', condition: 'Fever' },
    { id: 2, name: 'Bob Williams', condition: 'Fracture' },
    { id: 1, name: 'Alice Johnson', condition: 'Fever' },
    { id: 2, name: 'Bob Williams', condition: 'Fracture' },
    { id: 1, name: 'Alice Johnson', condition: 'Fever' },
    { id: 2, name: 'Bob Williams', condition: 'Fracture' },
  ];

  const departments = [
    { id: 1, name: 'Cardiology' },
    { id: 2, name: 'Pediatrics' },
    { id: 1, name: 'Cardiology' },
    { id: 2, name: 'Pediatrics' },
    { id: 1, name: 'Cardiology' },
    { id: 2, name: 'Pediatrics' },
    { id: 1, name: 'Cardiology' },
    { id: 2, name: 'Pediatrics' },
    { id: 1, name: 'Cardiology' },
    { id: 2, name: 'Pediatrics' },
    { id: 1, name: 'Cardiology' },
    { id: 2, name: 'Pediatrics' },
    { id: 1, name: 'Cardiology' },
    { id: 2, name: 'Pediatrics' },
    { id: 1, name: 'Cardiology' },
    { id: 2, name: 'Pediatrics' },
  ];

  useEffect(()=>{
      //   setUser(student);
      loadRequest();
        
      },[]);
    
    const loadRequest=async()=>{
      const result = await axios.get(`http://localhost:8000/admin/get_doctor_list/1`);
      console.log(result.data);
    }

  return (
    <div className='bg-blue-50 flex flex-col justify-evenly'>
        <AdminNavbar />
        <AdminShowCase />
      <div className='flex flex-row justify-between'>
        {/* Doctors */}
        <div className="bg-blue-100 shadow-lg p-6 w-1/3 border-t-4 border-orange-600 rounded-lg mt-8 mr-4">
          <div className="mb-8">
            <table className="table-auto w-full mx-auto">
              <caption className="caption-top font-normal text-2xl p-2 border-b-2 border-gray-700">
                List of Doctors
              </caption>
              <thead className='font-normal text-lg'>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Specialty</th>
                </tr>
              </thead>
              <tbody className='font-normal text-md text-center'>
                {doctors.map(doctor => (
                  <tr key={doctor.id} className='p-8'>
                    <td>{doctor.id}</td>
                    <td>{doctor.name}</td>
                    <td>{doctor.specialty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Patients */}
        <div className="bg-blue-100 shadow-lg p-6 w-1/3 border-t-4 border-orange-600 rounded-lg mt-8 mx-4">
          <div className="mb-8">
            <table className="table-auto w-full mx-auto">
              <caption className="caption-top font-normal text-2xl p-2 border-b-2 border-gray-700">
                List of Patients
              </caption>
              <thead className='font-normal text-lg'>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Condition</th>
                </tr>
              </thead>
              <tbody className='font-normal text-md text-center'>
                {patients.map(patient => (
                  <tr key={patient.id} className='p-8'>
                    <td>{patient.id}</td>
                    <td>{patient.name}</td>
                    <td>{patient.condition}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Departments */}
        <div className="bg-blue-100 shadow-lg p-6 w-1/3 border-t-4 border-orange-600 rounded-lg mt-8 ml-4">
          <div className="mb-8">
            <table className="table-auto w-full mx-auto">
              <caption className="caption-top font-normal text-2xl p-2 border-b-2 border-gray-700">
                List of Departments
              </caption>
              <thead className='font-normal text-lg'>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody className='font-normal text-md text-center'>
                {departments.map(department => (
                  <tr key={department.id} className='p-8'>
                    <td>{department.id}</td>
                    <td>{department.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <HomePageFooter />
    </div>
  );
};

export default AdminDashboard;