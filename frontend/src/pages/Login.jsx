import React, { useContext } from 'react'
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import Authentication from '../components/Authentication'



const Login = () => {
  const {loginUser} = useContext(Authentication)

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(e.target)

    const email = e.target.email.value
    const password = e.target.password.value

    loginUser(email, password)
  }

  return (
      <MDBContainer fluid className="p-3 my-5 h-custom">
         
        
        <MDBRow>
    
          <MDBCol col='10' md='6'>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
          </MDBCol>
          <MDBCol col='4' md='6'>   
           <form onSubmit={handleSubmit}> 
            <MDBInput wrapperClass='mb-4' label='login' id='formControlLg' type='username' size="lg" />
            <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" />
             
            <div className='text-center text-md-start mt-4 pt-2'>
              <MDBBtn className="mb-0 px-5" size='lg'>Login</MDBBtn>
              <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href="/register" className="link-danger">Register</a></p>
            </div>
            </form>
          </MDBCol>
          </MDBRow>
        
        <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
  
          <div className="text-white mb-3 mb-md-0">
            Copyright © 2020. All rights reserved.
          </div>
        
        </div>
        
      </MDBContainer>
    );
}


export default Login