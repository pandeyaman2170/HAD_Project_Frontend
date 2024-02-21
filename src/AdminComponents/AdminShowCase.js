import React from "react";

const AdminShowCase = () => {
    const img = require("../components/images/admin_page_image-removebg-preview.png");
    return(
        <>
        <div className="bg-orange-600 p-4 md:flex md:flex-row">
            <div className="md:flex-1 md:w-1/2 p-4 md:flex md:flex-col md:items-center md:justify-center">
                <div className="flex flex-wrap justify-center">
                    <button className="w-40 bg-orange-700 hover:bg-orange-800 text-white font-semibold py-2 px-4 rounded transform transition duration-300 hover:scale-105">
                        Add Doctor
                    </button>
                    <button className="w-40 bg-orange-700 hover:bg-orange-800 text-white font-semibold py-2 px-4 rounded mt-4 md:mt-0 md:ml-4 transform transition duration-300 hover:scale-105">
                        Update Doctor
                    </button>
                </div>
                <div className="flex flex-wrap justify-center mt-4">
                    <button className="w-40 bg-orange-700 hover:bg-orange-800 text-white font-semibold py-2 px-4 rounded transform transition duration-300 hover:scale-105">
                        Delete Doctor
                    </button>
                    <button className="w-40 bg-orange-700 hover:bg-orange-800 text-white font-semibold py-2 px-4 rounded mt-4 md:mt-0 md:ml-4 transform transition duration-300 hover:scale-105">
                        View Doctor
                    </button>
                </div>
            </div>
            <div className="md:flex-1 md:w-1/2 p-4 md:flex md:items-center md:justify-center">
                <img
                    src={img}
                    alt="main-img1"
                    className="max-h-full max-w-full"
                />
            </div>
        </div>
        </>
    );
}

export default AdminShowCase;
