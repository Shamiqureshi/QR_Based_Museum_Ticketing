import React from "react";
import { NavLink, useNavigate } from "react-router-dom"
import Navbar2 from "../navbar/Navbar";
import Footer from "../navbar/Footer";
const Contcatus = () => {
    const navigate = useNavigate()
    return (
        <React.Fragment>

            <Navbar2 />
            <div className="pb-5" style={{ backgroundColor: "#d7fcd7" }}>
                <div className="">
                    <div className="container">
                        <div className=" text-center mt-2">
                            <h1 >Contact Us</h1>
                        </div>
                        <div className="row me-0">
                            <div className="col-lg-7 mx-auto">
                                <div className="card mt-2 mx-auto p-4 bg-light">
                                    <div className="card-body bg-light">
                                        <div className="container">
                                            <form id="contact-form" role="form">
                                                <div className="controls">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label for="form_name">Firstname *</label>
                                                                <input id="form_name" type="text" name="name" className="form-control" placeholder="Please enter your firstname *" required="required" data-error="Firstname is required." />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label for="form_lastname">Lastname *</label>
                                                                <input id="form_lastname" type="text" name="surname" className="form-control" placeholder="Please enter your lastname *" required="required" data-error="Lastname is required." />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label for="form_email">Email *</label>
                                                                <input id="form_email" type="email" name="email" className="form-control" placeholder="Please enter your email *" required="required" data-error="Valid email is required." />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label for="form_mobile">Mobile Number *</label>
                                                                <input id="form_mobile" type="text" name="moile_no" className="form-control" placeholder="Please enter your mobile no *" required="required" data-error="Valid mobile number is required." />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label for="form_message">Message *</label>
                                                                <textarea id="form_message" name="message" className="form-control" placeholder="Write your message here." rows="4" required="required" data-error="Please, leave us a message."></textarea>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <input type="submit" className="btn btn-success btn-send  pt-2 btn-block" value="Send Message" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
<Footer/>
        </React.Fragment>
    );

}
export default Contcatus;