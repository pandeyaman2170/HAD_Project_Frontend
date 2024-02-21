import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Infographics = () => {
  const [data, setData] = useState([
    { name: "Jan", consultations: 400 },
    { name: "Feb", consultations: 300 },
    { name: "Mar", consultations: 600 },
    { name: "Apr", consultations: 800 },
    { name: "May", consultations: 500 },
    { name: "Jun", consultations: 700 },
    { name: "Jul", consultations: 900 },
    { name: "Aug", consultations: 1100 },
    { name: "Sep", consultations: 1000 },
    { name: "Oct", consultations: 1200 },
    { name: "Nov", consultations: 1500 },
    { name: "Dec", consultations: 1300 },
  ]);

  return (
    <div className=" bg-gradient-to-r border-t-4 border-blue-900 shadow-lg rounded-lg p-6">
      <h2 className="text-lg font-bold font-serif mb-4">
        Total Consultations
      </h2>
      <LineChart width={500} height={200} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={false} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="natural"
          dataKey="consultations"
          stroke="#3b82f6"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
};

export default Infographics;
