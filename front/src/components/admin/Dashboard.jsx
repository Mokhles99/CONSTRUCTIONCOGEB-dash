import React from 'react';
import './styles/Dashboard.css'; // Assurez-vous d'avoir votre fichier CSS dans le même répertoire
import Sidebar from './Sidebar';
import TablesAdmin from '../tablesAdmin/Tables';
import Tables from '../tablesAdmin/Tables';





const AttendanceList = () => {
  return (
    <section className="attendance">
     
      <div className="attendance-list">
      <div className='ajout'>
        <h1>profile Admin</h1>
      
        </div>
        <table className="table">
          <thead>
            <tr>
             
              <th>Nom Admin</th>
              <th>Mot de Passe</th>
             
            </tr>
          </thead>
          <tbody>
          <tr>
                <td>admin</td>
                <td>admin123</td>
               
              
              </tr>
             
              
          </tbody>
        </table>
      </div>
      
    </section>
  );
};

const Dashboard = () => {
  return (
    <div className="containerDash">
      < Sidebar />
      <section className="main">
        <div className="main-top">
         
          
        </div>
        
       <Tables/>
      </section>
    </div>
    
  );
};

export default Dashboard;