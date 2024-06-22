
import   { useState } from 'react';
import { Chart } from 'primereact/chart';


export default function PieChartDemo() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
  

   
   

    return ( 
            <Chart type="pie" data={chartData} options={chartOptions} className="w-full lg:w-1/2" />
      
    )
}