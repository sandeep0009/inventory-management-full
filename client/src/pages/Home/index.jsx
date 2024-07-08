import React from 'react'
import BasicChart from './components/Basic'
import PieChartDemo from './components/pie'

const HomePage = () => {
  return (
    <div className="w-full flex flex-wrap">
        <BasicChart/>
        <PieChartDemo/>
    </div>
  )
}

export default HomePage