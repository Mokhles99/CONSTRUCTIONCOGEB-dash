import React, { useState } from 'react';

import './styles/Dashboard.css'; // Assurez-vous d'avoir votre fichier CSS dans le même répertoire


import { RxDashboard } from "react-icons/rx";
import { TbMessageDots } from "react-icons/tb";
import { FiUsers } from "react-icons/fi";
import { LiaHotelSolid } from "react-icons/lia";
import { MdOutlineModeOfTravel } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { LiaPercentageSolid } from "react-icons/lia";
import { FaWpforms, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import admin from '../../assets/hbib.jpg'
const Sidebar = () => {
  



    return (
        <nav className='navDashboard'>
            <div className='divnav'>
                <ul>
                    <li>
                        <a href="#" className="logoadmin">
                            {/* <div>
                                <img className="logoAdmin" alt="men" />
                            </div> */}
                            <span className="nav-item">COGEB</span>
                        </a>
                    </li>
                    <li>
                        <Link to="/admin" className='link-hover'>
                            <div className='messageLogo'>
                                <RxDashboard className='LogoLogout' />
                                <span className="nav-item-Dash">Dashboard</span>
                            </div>
                        </Link>
                    </li>
                    {/* <li>
                        <Link to="/message" className='link-hover'>
                            <div className='messageLogo'>
                                <TbMessageDots className='msgLogo' />
                                <span className="nav-item-msg">Messages</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/clients" className='link-hover'>
                            <div className='messageLogo'>
                                <FiUsers className='userLogo' />
                                <span className="nav-item-user">Clients</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/hotelAdmin" className='link-hover'>
                            <div className='hotelLogo'>
                                <LiaHotelSolid className='HotelLogo' />
                                <span className="nav-item-hotel">Hôtels</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/voyageAdmin" className='link-hover'>
                            <div className='voyagesLogo'>
                                <MdOutlineModeOfTravel className='VoyageLogo' />
                                <span className="nav-item-voyages">Voyages</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/congresAdmin" className='link-hover'>
                            <div className='congresLogo'>
                                <SiGoogleclassroom className='CongresLogo' />
                                <span className="nav-item-voyages">Congrés</span>
                            </div>
                        </Link>
                    </li> */}
                   
                 
                </ul>
            </div>
        </nav>
    );
};

export default Sidebar;