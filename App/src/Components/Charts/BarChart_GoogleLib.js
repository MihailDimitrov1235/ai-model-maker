import React, { useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { UserData } from "./Data";
import {Chart as ChartJS} from "chart.js/auto";


export function ShowDiagrams(){
    

    // Showing different charts
    const [userData, setUserData] = useState({
        labels: UserData.map((data) => data.year),
        datasets: [
          {
            label: "Users Gained",
            data: UserData.map((data) => data.userGain),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#50AF41",
              "#91AF00",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
    
    
      return (
        <div className="App">
          <div style={{ width: 700 }}>
            <BarChart chartData={userData} />
            {/* <LineChart chartData={userData} />
            <PieChart chartData={userData} /> */}
            
          </div>
         
        </div>
      );
}


/*function BarChart({ chartData }) {
  return <Bar data={chartData} />;
}*/

function BarChart({ chartData }){
  return <Bar data = {chartData} />
}


/*function LineChart({ chartData }){
    return <Line data = {chartData} />
}
  
function PieChart({ chartData }){
    return <Pie data = {chartData} />
}*/