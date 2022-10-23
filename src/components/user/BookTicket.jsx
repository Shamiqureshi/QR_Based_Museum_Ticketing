import React, { useState, useEffect } from "react"
import axios from "axios"
import { NavLink, useNavigate } from "react-router-dom"
import Usernavbar from "../navbar/Usernavbar"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useLocation } from "react-router-dom";
import emailjs from '@emailjs/browser';

const BookTicket = ({ setLoginUser }) => {
    const navigate = useNavigate()
    const location = useLocation();
    const { museum_id } = location.state;
    var total_amount = 0;
    const usermobile = localStorage.getItem('umobile'); 
    const [user, setUser] = useState({
        museum: "",
        name: "",
        address: "",
        desciption: "",
        price: "",
        no_of_persons: "",
        booking_date: "",
        user_mobile:"",
        user_email:"",
        user_name:"",
        visited:"0",
        discount:"",
        total:""
    })
    const [userDetails,setUserDetail] = useState({});
    const [paymentDeatil, setPaymentDetal] = useState({
        card_no:"",
        cvv:"",
        expire_date:"",
        paid_amount:""
    })    
    const [discountCal, setDiscouuntCal] = useState({
        discount:""
        })

   
   

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
        setPaymentDetal({
            ...paymentDeatil,
            [name]: value
        })
        total_amount = user.price * user.no_of_persons;
  
    }
   
    const loadMuseums = async () => {
        const data = {usermobile}; 

        if(typeof usermobile == 'undefined' || usermobile == null )
        {
            navigate("/userlogin");
          
        }

        const result3 = await axios.post("http://localhost:9002/userprofile", { 'usermobile': usermobile });
        // console.log(result3.data)
        // setUser({
        //     ...user,
        //     user_email:result3.data.email,
        //     user_name:result3.data.name,
        //     user_mobile: usermobile
        // })

        axios.post("http://localhost:9002/get_prediction", data)
        .then(res => {
           
            if(typeof res.data !== 'undefined' && res.data !== null )
            {
               if( res.data <= 25)
               {
                setDiscouuntCal({
                    discount:res.data
                })
            
                 }
                 else
                 {
                    setDiscouuntCal({
                        discount:25
                    })
                
                     }
            } 
            
        })
      setUser({
            ...user,
            museum: museum_id
        })
        const result = await axios.post("http://localhost:9002/getmuseum", { 'museum_id': museum_id });  
        setUser({
            ...user,
            name: result.data.name,
            address: result.data.address,
            desciption: result.data.desciption,
            price: result.data.price,
            user_email:result3.data.email,
            user_name:result3.data.name,
            user_mobile: usermobile
        }); 
    };
 
   

    const disablePastDate = () => {
        const today = new Date();
        const dd = String(today.getDate() + 1).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
        };

        const loadUserDetails = () => {       
         
            setUser({
                ...user,
                discount: ((user.price * user.no_of_persons)*discountCal.discount)/100,
                total:(user.price * user.no_of_persons)-(((user.price * user.no_of_persons)*discountCal.discount)/100)
            })
        };
        
    const register = () => {
       
        const { museum, name, address, desciption, price, no_of_persons, booking_date } = user
        if (name && address) {            
            loadUserDetails();
            emailjs.send("service_kmighyi","template_r3zn37i",{
                from_name: "MuseumProject",
                message: `Booking Details \n 
                Person Name : ${user.user_name}\n
                Mobile No. : ${user.user_mobile}\n
                Museum Name : ${user.user_name}\n
                Museum Address : ${user.address}\n
                Visit Date : ${user.booking_date}\n
                No Of Persons : ${user.no_of_persons}\n
                Fees Per Person : ${user.price}\n
                Amount : ${(user.price * user.no_of_persons)}\n
                Discount : ${((user.price * user.no_of_persons)*discountCal.discount)/100} \n
                Total Amount : ${(user.price * user.no_of_persons)-(((user.price * user.no_of_persons)*discountCal.discount)/100)}\n
                `,
                to_email: user.user_email,
                },'FxduH9ThDepDgKc3A');

            axios.post("http://localhost:9002/book_ticket", user)
                .then(res => {
                    alert(res.data.message)
                    
                    const data = {usermobile,user}; 
                    axios.post("http://localhost:9002/get_ticket_print", data)
                    .then(res => {
                        window.open('backend'+res.data.path, '_blank');
                    })
                    navigate("/userprofile")
                })
        } else {
            alert("invlid input")
        }

    }

    useEffect(() => {
        loadMuseums();
       
    },[]);
    return (
        <React.Fragment>

            <Usernavbar />
            <div className="register text-center" style={{ backgroundColor: "#d7fcd7" }}>
             
                <div className="row justify-content-center pb-5 pt-3 me-0">
                    <div className="col-lg-4 mx-auto">
                        <div className="card mt-2 mx-auto p-4 bg-light">
                            <div className="card-body bg-dark text-white ">
                                <div className="container">
                                    <div className="col-sm-12 pb-3 pt-3">
                                        <h1 className="h3 mb-3 fw-normal text-uppercase">Book Ticket</h1>

                                        <div className="form-outline form-white mb-4">
                                            <label for="floatingInput">Name</label>
                                            <input type="text" className="form-control" name="name" value={user.name} placeholder="Your Name" onChange={handleChange} readOnly />

                                        </div>
                                        <div className="form-outline form-white mb-4">
                                            <label for="floatingInput">Description</label>
                                            <input type="text" className="form-control" name="description" value={user.desciption} onChange={handleChange} id="floatingInput" placeholder="description" readOnly />

                                        </div>
                                        <div className="form-outline form-white mb-4">
                                            <label for="floatingInput">Address</label>
                                            <input type="text" className="form-control" name="address" value={user.address} onChange={handleChange} id="floatingInput" placeholder="Address" readOnly />

                                        </div>
                                        <div className="form-outline form-white mb-4">
                                            <label for="floatingPassword">Price</label>
                                            <input type="text" className="form-control" name="price" value={user.price} onChange={handleChange} id="floatingPassword" placeholder="Price" readOnly />

                                        </div>
                                        <div className="form-outline form-white mb-4">
                                            <label for="floatingPassword">No Of Persons</label>
                                            <input type="number" className="form-control" name="no_of_persons" value={user.no_of_persons} placeholder="No Of Persons" onChange={handleChange} />

                                        </div>
                                        <div className="form-outline form-white mb-4">
                                            Booking Date <input type="date" className="form-control" name="booking_date" min={disablePastDate()} value={user.booking_date} onChange={handleChange} />
                                        </div>
                                        <div className="form-outline form-white mb-4">
                                            <label for="floatingPassword"> Amount</label>
                                            <input type="number" className="form-control" name="" value={(user.price * user.no_of_persons)} placeholder="Total Amount" onChange={handleChange} readOnly />

                                        </div>
                                        <div className="form-outline form-white mb-4">
                                            <label for="floatingPassword">Discount Amount</label>
                                            <input type="number" className="form-control" name="discount" value={((user.price * user.no_of_persons)*discountCal.discount)/100} placeholder="Discount" onChange={handleChange} readOnly />

                                        </div>
                                        <div className="form-outline form-white mb-4">
                                            <label for="floatingPassword">Total Amount</label>
                                            <input type="number" className="form-control" name="total_amount" value={(user.price * user.no_of_persons)-(((user.price * user.no_of_persons)*discountCal.discount)/100)} placeholder="Total Amount" onChange={handleChange} readOnly />

                                        </div>


                                        <Popup trigger={<button className="button w-100 btn btn-lg btn-primary" > Checkout </button>} modal>
                                            <div className="register text-center" style={{ backgroundColor: "#d7fcd7" }}>
                                           
                                                <div className="row justify-content-center pb-5 pt-3 me-0">
                                                    <div className="col-lg-12 mx-auto">
                                                        <div className="card mt-2 mx-auto p-4 bg-light">
                                                            <div className="card-body bg-dark text-white ">
                                                                <div className="container">
                                                                    <div className="col-sm-12 pb-3 pt-3">
                                                                        <h1 className="h3 mb-3 fw-normal text-uppercase">Checkout</h1>
                                                                        <div className="form-outline form-white mb-4">
                                            <label for="floatingPassword">Total Amount</label>
                                            <input type="number" className="form-control" name="paid_amount" value={user.price * user.no_of_persons} placeholder="Total Amount" onChange={handleChange} readOnly />

                                        </div>
                                        <div className="form-outline form-white mb-4">
                                            <label for="floatingPassword">Card Number</label>
                                            <input type="text" className="form-control" name="card_no" value={paymentDeatil.card_no} placeholder="Card Number" onChange={handleChange}  />

                                        </div>
                                        <div className="d-flex">
                                        <div className="form-outline form-white mb-4 pe-5">
                                            <label for="floatingPassword">Expiration</label>
                                            <input type="number" className="form-control" name="expire_date" value={paymentDeatil.expire_date} placeholder="Expiration" onChange={handleChange}  />

                                        </div>
                                        <div className="form-outline form-white mb-4">
                                            <label for="floatingPassword">CVV</label>
                                            <input type="number" className="form-control" name="cvv" value={paymentDeatil.cvv} placeholder="CVV" onChange={handleChange}  />
                                        </div>
                                        </div>
                                        <button className="w-100 btn btn-lg btn-primary" onClick={register}>Checkout</button>
                                        </div></div></div></div></div></div></div>                                    
                                        </Popup>
                                        <div className="col-sm-4"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    );

}
export default BookTicket;