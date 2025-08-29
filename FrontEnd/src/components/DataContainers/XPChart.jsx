import React, { useEffect, useState } from 'react';
import { RadialBarChart, RadialBar, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { motion } from 'framer-motion';
import { auth } from '../../../firebaseConfig';
import { DBURL } from '../../utils/environment';
import { useAuth } from '../../context/AuthContext';


//const DBURL = 'https://momentum-cyee.onrender.com/api'
// const DBURL = import.meta.env.VITE_DBURL;
// const DBURL = 'http://localhost:6969/api';

const XPChart = () => {
  const {uid} = useAuth()
  if(!uid){return{success:false, error:"No UID Provided"}}
  const [xpData, setXpData] = useState([]);

  const fetchXP = async () => {
    try {
      
      const response = await axios.get(`${DBURL}/xp?uid=${uid}`);
      if (response.data.success) {
        // Assume response.data.xp is like: { current: 120, nextLevel: 200 }
        const xp = response.data.xp;
        setXpData([
          { name: 'Current XP', value: xp.current },
          { name: 'Remaining XP', value: xp.nextLevel - xp.current },
        ]);
      } else {
        console.error('Error fetching XP:', response.data.error);
      }
    } catch (error) {
      console.error('Fetch XP failed:', error);
    }
  };

  useEffect(() => {
    fetchXP();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full h-96 bg-slate-800 rounded-xl shadow-md flex flex-col items-center justify-center p-4"
    >
      <h2 className="text-white text-xl mb-4">XP Progress</h2>
      {xpData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="70%"
            outerRadius="100%"
            data={xpData}
            startAngle={180}
            endAngle={-180}
          >
            <RadialBar
              minAngle={15}
              background
              clockWise
              dataKey="value"
              cornerRadius={10}
              fill="#4ade80"
            />
            <Tooltip
              formatter={(value, name) => [`${value} XP`, name]}
              contentStyle={{
                backgroundColor: '#1e293b',
                borderRadius: '6px',
                border: 'none',
                color: 'white',
              }}
            />
            <Legend
              iconSize={10}
              layout="vertical"
              verticalAlign="middle"
              align="right"
              wrapperStyle={{ color: 'white' }}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-white">Loading XP...</p>
      )}
    </motion.div>
  );
};

export default XPChart;
