import React from 'react'
import { Radar, RadarChart as RechartsRadar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'

const RadarChart = ({ skills }) => {
  // Transformer les données pour le radar chart
  const radarData = skills.slice(0, 8).map(skill => ({
    skill: skill.label,
    proficiency: skill.proficiency,
    usage: skill.usage,
    fullMark: 100
  }))

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadar data={radarData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <PolarGrid stroke="#374151" />
          <PolarAngleAxis 
            dataKey="skill" 
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
            className="text-xs"
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]} 
            tick={{ fill: '#6B7280', fontSize: 10 }}
            tickCount={5}
          />
          <Radar
            name="Proficiency"
            dataKey="proficiency"
            stroke="#3B82F6"
            fill="#3B82F6"
            fillOpacity={0.2}
            strokeWidth={2}
          />
          <Radar
            name="Usage"
            dataKey="usage"
            stroke="#8B5CF6"
            fill="#8B5CF6"
            fillOpacity={0.1}
            strokeWidth={2}
            strokeDasharray="5 5"
          />
        </RechartsRadar>
      </ResponsiveContainer>
    </div>
  )
}

export default RadarChart
