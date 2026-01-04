import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Container className="text-center mt-5">
      <div className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Welcome to CUP</h1>
          <p className="col-md-8 fs-4 mx-auto">
            This is a skeleton React + TypeScript frontend for the CUP platform.
            It handles authentication and user profile management out of the box.
          </p>
          {user ? (
            <Button onClick={() => navigate('/profile')} variant="primary" size="lg">Go to Profile</Button>
          ) : (
            <div className="d-flex justify-content-center gap-3">
              <Button onClick={() => navigate('/login')} variant="primary" size="lg">Login</Button>
              <Button onClick={() => navigate('/signup')} variant="outline-primary" size="lg">Signup</Button>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
