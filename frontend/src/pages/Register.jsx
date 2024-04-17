import {useState, useContext} from 'react';
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import Authentication from '../components/Authentication';
import '../styles/Login.css';


const Register = () => {
  const [full_name, setFull_name] = useState()
  const [email, setEmail] = useState()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [password2, setPassword2] = useState()

  const registerUser = useContext(Authentication)

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(full_name)
    console.log(email)
    console.log(username)

    registerUser(full_name, email, username, password, password2)
  }

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">

      <MDBRow>

        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" 
          className="img-fluid" alt="Sample image" />
        </MDBCol>

        <MDBCol col='4' md='6'>
        <form onSubmit={handleSubmit}>
          <div className="divider d-flex align-items-center my-4">
  
          
          
          <MDBInput wrapperClass='mb-4' label='Login' id='formControlLg' type='text' size="lg"
            onChange={(e)=>setUsername(e.target.value)}
          />
          <MDBInput wrapperClass='mb-4' label='Full name' id='formControlLg' type='text' size="lg"
            onChange={(e)=>setFull_name(e.target.value)}
          />
          <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg"
            onChange={(e)=>setEmail(e.target.value)}
          />
          <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"
          onChange={(e)=>setPassword(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" 
          onChange={(e)=>setPassword2(e.target.value)}/>
  
          </div>
          <div>
          <MDBBtn className="mb-0 px-5" size='lg'>Register</MDBBtn>
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


export default Register