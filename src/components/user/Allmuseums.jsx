import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import Navbar from "../navbar/Navbar";
import Usernavbar from "../navbar/Usernavbar";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { Link } from "react-router-dom";

const Allmuseums = () => {
    const [users, setUser] = useState([]);
    const [museums, setMuseum] = useState([]);
    const [ museumFind, setMuseumFind] = useState({
        name:""
    })

    const navigate = useNavigate()

    const loadUsers = async () => {
        const usermobile = localStorage.getItem('umobile');
        if(typeof usermobile == 'undefined' || usermobile == null )
        {
            navigate("/userlogin");
           // console.log("Empty");
        }

        const result = await axios.post("http://localhost:9002/userprofile", { 'usermobile': usermobile });
        console.log(result.data);
        setUser(result.data);

    };
    const loadMuseums = async () => {
        const result = await axios.get("http://localhost:9002/allmuseums");
        console.log(result.data.reverse());
        setMuseum(result.data.reverse());
    };

    useEffect(() => {
        loadUsers();
        loadMuseums();
    }, []);



       const handleChange = e => {
        const { name, value } = e.target
        setMuseumFind({
            ...museumFind,
            [name]: value
        })    
     }

    const searchMuseum = () =>{
        console.log(museumFind)

        axios.post("http://localhost:9002/FindMuseums", museumFind)
            .then( res => {
             console.log(res.data);
            setMuseum(res.data);
            })
     
     
    }
    return (
        <React.Fragment>

            <Usernavbar />
            <div className="row mt-5">
                <div className="col-sm-4"></div>
                <div className="col-sm-4 text-center">
                    <h4>Search Museum</h4>
            <input type="text" className="form-control" name="name" value={museumFind.name} onChange={handleChange} id="floatingInput" placeholder="Museum Name"  />
            <button className="w-100 btn btn-lg btn-primary mt-3" onClick={searchMuseum}>Search</button>
            </div>
            <div className="col-sm-4"></div>
            </div>
            <div className="row d-flex">
            {museums.map((museum, index) => (
                <div className="col-sm-3 text-center pt-3 ">
            <div className="card bg-warning text-white" >
                
                    <div className="card-header">
                    <img src={"assets/museums/"+museum.image} className="card-img-top" alt="..." />
                    </div>
                   
                    <div className="card-body">
                    <h5 className="card-title">{museum.name}</h5><hr/>
                        <p className="card-text">{museum.description}</p><hr/>
                        <p className="card-link">{museum.address}</p><hr/>
                        <p className="card-link">{museum.price}</p>
                    </div>
                    <div className="card-footer">
                    <Link className="btn btn-primary mr-2" to={"/bookticket"}  state={{ museum_id: museum._id }}>
                    Book </Link>
                    </div>
            </div>
            </div>
            ))}
            </div>
        </React.Fragment>
    );

}
export default Allmuseums;