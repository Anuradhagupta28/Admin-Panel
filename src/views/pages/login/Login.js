import React from 'react';
import { Link } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';

const Login = () => {
  return (
    <div
      className="min-vh-100 d-flex flex-row align-items-center"
      style={{ backgroundColor: '#f8f9fa', justifyContent: 'center' }}
    >
      <CContainer style={{ maxWidth: '400px' }}>
        <CRow className="justify-content-center">
          <CCol>
            <CCardGroup>
              <CCard
                className="p-4"
                style={{
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  padding: '2rem',
                }}
              >
                <CCardBody className="d-flex flex-column align-items-center">
                <img
                    src="https://dev-v1.solvedudar.com/assets/web/images/logo/logo.png"
                    alt="Logo"
                    height={50}
                    style={{ width: 'auto', marginBottom: '1.5rem' }}
                  />
                  <h2 className="text-center" >
                    Admin - Login
                  </h2>
                 
                  <p
                    className="text-body-secondary text-center"
                    style={{ color: '#6c757d', marginBottom: '2rem',marginTop: '-0.3rem' }} 
                  >
                    Sign in to your account
                  </p>
                  <CForm style={{ width: '100%', maxWidth: '320px' }}>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol className="d-flex justify-content-center mb-3">
                        <CButton color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol className="d-flex justify-content-center">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                     
                    </CRow>
                    <p
                    className="text-body-secondary text-center"
                    style={{ fontSize:'13px', color: '#6c757d', marginBottom: '2rem' }}
                  >
                   ©2024 Dudar Tech Pvt. Ltd. All Rights Reserved.
                  </p>
             
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
