import React from "react";
import bootstrap from "bootstrap";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate()
  return (
   <React.Fragment>
       <div className="bg-secondary p-2 ">
    <div className="footer-top">
        <div className="text-center">
            <p>
                <span className="style1">Copyright &copy; 2022 MGM's College Engineering,Nanded</span><br />
                <span className="style1">this site developed by MGM Students </span>
            </p>
        </div>
    </div>
</div>
   </React.Fragment>
  );
}
export default Footer;