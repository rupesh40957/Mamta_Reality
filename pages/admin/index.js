import { useEffect, useState } from 'react';
import AdminDashboard from '../../components/admin/index'
//import NotFound from '../../components/loader/NotFound';
import NotFound from '../../components/loader/NotFound';


const IndexPage = (props) => {



    // Check if the user is logged in based on the presence of the adminToken in localStorage
    useEffect(() => {
      const isLoggedIn = localStorage.getItem('adminToken') !== null;
      props.setIsLoggedInAdmin(isLoggedIn);
    }, []);

  return (
    <div>
      {props.isLoggedInAdmin ? (
        <div>
          <AdminDashboard setIsLoggedInAdmin={props.setIsLoggedInAdmin} />
        </div>
      ) : (
        <NotFound mode={props.mode} /> 
      )}
    </div>
  );
};

export default IndexPage;