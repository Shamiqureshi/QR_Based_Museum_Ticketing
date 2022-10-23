import React, { useState,useEffect } from "react"
import axios from "axios"
import { NavLink, useNavigate } from "react-router-dom"
import Navbar from "../navbar/Navbar";
import Adminnavbar from "../navbar/Adminnavbar";
const Addmuseum = () => {
       
    const navigate = useNavigate()

    const [ user, setUser] = useState({
        image:"",
        name: "",
        description:"",
        address:"",
        price:"",
        keywords: ""
    })

    const [ photo, setImage] = useState({
        selectedFile: null
    });
    const formData = new FormData();
    const onFileUpload = () => {
    
         formData.append(
           "file",
           photo.selectedFile,
           //photo.selectedFile.name
         );
      
        console.log(photo.selectedFile);
        console.log(photo.selectedFile.name);
        axios.post("http://localhost:9002/upload", formData);
      };

    const onFileChange = event => {
    
        // Update the state
        const img = event.target.files[0];
        setImage({ selectedFile: img  });
       
        setUser({...user,
            image:event.target.files[0].name});
      //onFileUpload();
      };

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = () => {
        onFileUpload();
        const { image,name,description,address,price,keywords } = user
        if( name && address && price ){
            axios.post("http://localhost:9002/addmuseum",user)
            .then( res => {
               console.log(res);
                alert(res.data.message)
                navigate("/managemuseums")
            })
        } else {
            alert("invlid input")
        }
        
    }
    useEffect(() => {
        const usermobile = localStorage.getItem('umobile');
        if(typeof usermobile == 'undefined' || usermobile == null )
        {
            navigate("/adminlogin");
           // console.log("Empty");
        }
    }, []); 
    return (
        <React.Fragment>

           <Adminnavbar />
        <div className="register">
            {console.log("User", user)}
            {/* {console.log(photo.selectedFile)}
            {console.log(photo.selectedFile.name)} */}
            <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-4">
               <h1 className="h3 mb-3 fw-normal">New Museum</h1>

               <div className="form-floating mb-3">
                    <input type="file" className="form-control" onChange={onFileChange}/>
                    <label for="floatingInput">Image</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" name="name" value={user.name} onChange={handleChange} id="floatingInput" placeholder="Name"/>
                    <label for="floatingInput">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <textarea className="form-control" name="description" value={user.description} onChange={handleChange}>
                    </textarea>
                    <label for="floatingInput">Description</label>                  
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" name="address" value={user.address} onChange={handleChange} id="floatingInput" placeholder="Address"/>
                    <label for="floatingInput">Address</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" name="price" value={user.price} onChange={handleChange} id="floatingInput" placeholder="Price"/>
                    <label for="floatingInput">Price</label>
                </div>
                <div className="form-floating mb-3">
                    <textarea className="form-control" name="keywords" value={user.keywords} onChange={handleChange}>
                    </textarea>
                    <label for="floatingInput">Keywords</label>                  
                </div>

                <button className="w-100 btn btn-lg btn-primary" onClick={register}>Add</button>
                <div>or</div>
                
            <div className="col-sm-4"></div>
            </div>
        </div>

           
        </div>

        </React.Fragment>
    );


}
export default Addmuseum;