import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator";

function LoginForm({route}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password })
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
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
            </MDBCol>
            <form onSubmit={handleSubmit} className="form-container">
            <MDBCol col='4' md='6'>   
                <MDBInput wrapperClass='mb-4' 
                label='login' 
                id='formControlLg' 
                type='text' 
                size="lg" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}/>
                <MDBInput wrapperClass='mb-4' 
                label='Password' 
                id='formControlLg' 
                type='password' 
                size="lg" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
                <div className='text-center text-md-start mt-4 pt-2'>
                {loading && <LoadingIndicator />}
                <MDBBtn type='submit' className="mb-0 px-5" size='lg'>Login</MDBBtn>
                <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <Link to="/register" className="link-danger">Register</Link></p>
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

export default LoginForm