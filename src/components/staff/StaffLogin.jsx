import React, {useState} from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import Navbar from "../navbar/Navbar";
const StaffLogin = () => {
    const navigate = useNavigate();

    const [ user, setUser] = useState({
        email:"",
        password:""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = (event) => {
        event.preventDefault();
        axios.post("http://localhost:9002/stafflogin", user)
        .then(res => {
            if(res.data.message=="0")
            {
                const umobile = res.data.user;
                console.log(umobile);
                alert("Login Successfull");
                localStorage.setItem('umobile',umobile);
              //  setLoginUser(res.data.user)
                navigate("/staffprofile")
            }
            else if(res.data.message=="1"){
                alert("Password didn't match");
                navigate("/StaffLogin")
            }
            else{
                alert("User not registered");
                navigate("/StaffLogin")
            }
        //    console.log(res.data.user)
        //    console.log(res.data.message)
        })
    }
    return (
        <React.Fragment>

<Navbar />
            <div className="text-center login">
                {/* {console.log(user)} */}
                <div className="row justify-content-center pt-5">
                    <div className="col-sm-4">
                        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                        <form onSubmit={login}>
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control" name="email" value={user.email} onChange={handleChange} id="floatingInput" placeholder="name@example.com" required pattern="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,4}" />
                                <label for="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control" name="password" value={user.password} onChange={handleChange} id="floatingPassword" placeholder="Password" required />
                                <label for="floatingPassword">Password</label>
                            </div>

                            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                        </form>
                        <p className="mt-5 mb-3 text-muted">&copy; 2021–2022</p>
                        <div className="col-sm-4"></div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    );

}
export default StaffLogin;