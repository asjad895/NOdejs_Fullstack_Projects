import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import "./style.scss";

const ContactInfo = () => {
    return (
        <div className="contact-info-box">
            <h4>
                I would be happy to answer any questions you may have about
                my work or project!
            </h4>
            <div className="contact-option">
                <FaPhoneAlt />
                <span className="text">+91 9852940253</span>
            </div>
            <div className="contact-option">
                <MdEmail />
                <span className="text">mdasjad895@gmail.com</span>
            </div>
        </div>
    );
};

export default ContactInfo;
