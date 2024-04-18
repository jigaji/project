import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator";

function RegistrationForm({route}) {
    const [username, setUsername] = useState("");
    const [full_name, setFull_name] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, full_name, email, password, password2 })
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    };

    return (
        <MDBContainer fluid className="p-3 my-5 h-custom">
        <MDBRow>
          <MDBCol col='10' md='6'>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" 
            className="img-fluid" alt="Sample image" />
          </MDBCol>
          <form onSubmit={handleSubmit} className="form-container">
          <MDBCol col='4' md='6'>
            <div className="divider d-flex align-items-center my-4">
              <MDBInput wrapperClass='mb-4' label='Login' 
              id='formControlLg' 
              type='text' 
              size="lg"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}/>
              <MDBInput wrapperClass='mb-4' label='Full name' 
              id='formControlLg' 
              type='text' 
              size="lg"
              value={full_name}
              onChange={(e)=>setFull_name(e.target.value)}/>
              <MDBInput wrapperClass='mb-4' label='Email address' 
              id='formControlLg' 
              type='email' 
              size="lg"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}/>
              <MDBInput wrapperClass='mb-4' label='Password' 
              id='formControlLg' 
              type='password' 
              size="lg"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}/>
              <MDBInput wrapperClass='mb-4' label='Password' 
              id='formControlLg' 
              type='password' 
              size="lg" 
              value={password2}
              onChange={(e)=>setPassword2(e.target.value)}/>
            </div>
            <div>
              {loading && <LoadingIndicator />}
              <MDBBtn className="mb-0 px-5" size='lg'>Register</MDBBtn>
            </div>
          </MDBCol>
          </form>
        </MDBRow>
        <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
          <div className="text-white mb-3 mb-md-0">
            Copyright © 2020. All rights reserved.
          </div>
        </div>
      </MDBContainer>
    );
}

export default RegistrationForm