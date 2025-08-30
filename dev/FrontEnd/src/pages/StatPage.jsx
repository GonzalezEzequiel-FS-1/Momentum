import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';
import { auth } from '../../firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { DBURL } from '../utils/environment';

//const DBURL = 'https://momentum-cyee.onrender.com/api'
//const DBURL = import.meta.env.VITE_DBURL;
// const DBURL = 'http://localhost:6969/api';

const traitDescriptions = {
  focus: 'Improves concentration and task completion.',
  motivation: 'Determines drive to pursue goals.',
  consistency: 'Measures reliability in routines.',
  time_management: 'Ability to organize and prioritize time.',
  organization: 'Keeps tools, notes, and plans structured.',
  resilience: 'Bounces back from setbacks quickly.',
  charisma: 'Influences interactions with others.',
  adaptability: 'Adjusts effectively to changing situations.',
  stress_management: 'Maintains calm under pressure.',
  focus_endurance: 'Sustain attention over long periods.',
  wisdom: 'Intuition and insight guide decisions.',
  strength: 'Physical power and endurance.',
  creativity: 'Generates new ideas and solutions.'
};

const StatPage = () => {
  const {displayName} = useAuth()

  const [data, setData] = useState([]);
  const [character, setCharacter] = useState({
    name: displayName,
    level: 5,
    xp: 120,
    xpMax: 200
  });

const formatTraitsForChart = (traits) => {
  return Object.keys(traits)
    .filter(key => key !== 'uid') 
    .map(key => ({
      trait: key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()), 
      value: traits[key] || 0
    }));
};

  const fetchTraits = async () => {
    try {
      const uid = auth.currentUser.uid;
      // console.log(uid)
      const response = await axios.get(`${DBURL}/traits?uid=${uid}`);
      if (response.data.success) {
        setData(formatTraitsForChart(response.data.traits));
        
      } else {
        console.error('Error fetching traits:', response.data.error);
      }
    } catch (error) {
      console.error('Fetch traits failed:', error);
    }
  };

  useEffect(() => {
    fetchTraits();
  }, []);

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl shadow-black shadow-lg p-4 flex flex-col items-center">
      {/* Character Info */}
      <div className="w-full flex justify-between items-center text-white mb-4 px-2">
        <div>
          <h2 className="text-2xl font-bold">{character.name}</h2>
          <p className="text-sm text-gray-300">Level {character.level}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-300">XP</p>
          <div className="relative w-36 h-4 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(character.xp / character.xpMax) * 100}%` }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="h-full bg-purple-500"
            />
          </div>
          <p className="text-xs text-gray-300 mt-1">{character.xp} / {character.xpMax}</p>
        </div>
      </div>

      {/* Radar Chart */}
      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="#ffffff33" />
            <PolarAngleAxis
              dataKey="trait"
              tick={{ fill: '#ffffff', fontSize: 12 }}
            />
            <PolarRadiusAxis
              domain={[0, 10]}
              tick={{ fill: '#ffffff', fontSize: 10 }}
            />
            <Radar
              name="Traits"
              dataKey="value"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
              animationDuration={1200}
            />
            <Tooltip
              formatter={(value, name, props) => [
                `${value}/10`,
                name,
                props.payload.description
              ]}
              contentStyle={{
                backgroundColor: '#1e293b',
                borderRadius: '6px',
                border: 'none',
                color: 'white',
                fontSize: '0.875rem'
              }}
            />
            <Legend wrapperStyle={{ color: 'white', fontSize: '0.875rem' }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Trait Breakdown */}
      <motion.div
        className="w-full mt-4 grid grid-cols-2 md:grid-cols-3 gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {data.map((d) => (
          <motion.div
            key={d.trait}
            className="flex justify-between bg-slate-700 bg-opacity-50 p-2 rounded-md text-white text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span>{d.trait}</span>
            <motion.span
              initial={{ count: 0 }}
              animate={{ count: d.value }}
              transition={{ duration: 1.2 }}
            >
              {d.value}/10
            </motion.span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default StatPage;

