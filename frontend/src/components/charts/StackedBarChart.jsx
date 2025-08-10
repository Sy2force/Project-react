import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const StackedBarChart = ({ skills }) => {
  // Transformer les données pour le bar chart
  const barData = skills.slice(0, 8).map(skill => ({
    name: skill.label.length > 10 ? skill.label.substring(0, 10) + '...' : skill.label,
    proficiency: skill.proficiency,
    usage: skill.usage,
  }))

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-white/20 rounded-lg p-3 shadow-xl">
          <p className="text-white font-semibold mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.dataKey === 'proficiency' ? 'Maîtrise' : 'Utilisation'}: {entry.value}%
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={barData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
            axisLine={{ stroke: '#4B5563' }}
          />
          <YAxis 
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
            axisLine={{ stroke: '#4B5563' }}
            domain={[0, 100]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="proficiency" 
            stackId="a" 
            fill="#3B82F6" 
            name="Maîtrise"
            radius={[0, 0, 0, 0]}
          />
          <Bar 
            dataKey="usage" 
            stackId="b" 
            fill="#8B5CF6" 
            name="Utilisation"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StackedBarChart
