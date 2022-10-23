import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import Adminnavbar from "../navbar/Adminnavbar";
import Navbar from "../navbar/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { BarChart } from './BarChart';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'
ChartJS.register(...registerables);

const IndividualPrediction = () => {
    const navigate = useNavigate();
    const [users, setUser] = useState([]);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
      });
    const [TotalVisiter, setTotalVisiter] = useState([]);
    
    const [ options, setOptions ] = useState(null);
//     const getMuseums = () => {
// const  data  = axios.get("http://localhost:3000/allmuseums")
// const option = data.map((item)=>({
//     "value" : item.name,
//     "label" : item.name
// }))
//     }  


    useEffect(() => {
    //  getMuseums();
      
        const usermobile = localStorage.getItem('umobile');
        if(typeof usermobile == 'undefined' || usermobile == null )
        {
            navigate("/adminlogin");
           // console.log("Empty");
        }
        loadUsers();
      }, [users]);

    const loadUsers = async () => {
        const result = await axios.post("http://localhost:9002/get_season_prediction");
        setUser(result.data);
        setTotalVisiter(users.Winter + users.Spring + users.Summer +users.Monsoon + users.Autumn + users.PreWinter);
        console.log(TotalVisiter);
        setChartData({
            labels:  ['Winter', 'Spring', 'Summer', 'Monsoon', 'Autumn', 'PreWinter'] ,
            datasets: [
              {
                label: "Visiting Percentage",
                data: [(((users.Winter)*100)/TotalVisiter),(((users.Spring)*100)/TotalVisiter),(((users.Summer)*100)/TotalVisiter),(((users.Monsoon)*100)/TotalVisiter),(((users.Autumn)*100)/TotalVisiter),(((users.PreWinter)*100)/TotalVisiter)],
                backgroundColor: [
                  "#ffbb11",
                  "#ecf0f1",
                  "#50AF95",
                  "#f3ba2f",
                  "#2a71d0",
                  "#ecf0f1",
                ]
              }
            ]
          });
        
        
    };




    return (
        <div>
            <Adminnavbar/>
           {console.log(options)}
            <div className="row mt-1 p-2">
                <div className="col-sm-1 "></div>
                <div className="col-sm-10">
                    <h2>All Museum Prediction</h2>
                    <table className="table table-dark table-hover">
                        <thead>
                            <tr>
                                <td>sr</td>
                                <td>Season</td>
                                <td>Month</td>
                                <td>Prediction</td>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                                    <th scope="row">1</th>
                                    <td>Winter</td>
                                    <td>Jan - Feb</td>
                                    <td>{((users.Winter)*100)/TotalVisiter} %</td>              
                        </tr>
                        <tr>
                                    <th scope="row">2</th>
                                    <td>Spring</td>
                                    <td>Mar - Apr</td>
                                    <td>{(((users.Winter)*100)/TotalVisiter)} %</td>              
                        </tr>
                        <tr>
                                    <th scope="row">3</th>
                                    <td>Summer</td>
                                    <td>May - Jun</td>
                                    <td>{((users.Summer)*100)/TotalVisiter} %</td>              
                        </tr>
                        <tr>
                                    <th scope="row">4</th>
                                    <td>Monsoon</td>
                                    <td>Jul - Aug</td>
                                    <td>{((users.Monsoon)*100)/TotalVisiter} %</td>              
                        </tr>
                        <tr>
                                    <th scope="row">5</th>
                                    <td>Autumn</td>
                                    <td>Sep - Oct</td>
                                    <td>{((users.Autumn)*100)/TotalVisiter} %</td>              
                        </tr>
                        <tr>
                                    <th scope="row">6</th>
                                    <td>PreWinter</td>
                                    <td>Nov - Dec</td>
                                    <td>{((users.PreWinter)*100)/TotalVisiter} %</td>              
                        </tr>
                          
                        </tbody>
                    </table>
                </div>
                <div className="col-sm-1 "></div>
            </div>
            <div>
            <h3>Prediction Chart </h3>
            <div style={{ height:'500px',width:'500px',margin:'0 auto' }}>
            <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Visiter S"
            },
            legend: {
              display: false,
              position: "bottom"
           }
          }
        }}
      />
      </div>
                
            </div>
          
        </div>
    );


}
export default IndividualPrediction;