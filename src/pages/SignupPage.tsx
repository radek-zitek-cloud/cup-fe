import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Alert,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import api from "../api/axios";
import { useAuth } from "../hooks/useAuth";

const SignupPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const password = watch("password");

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);
    setError(null);
    try {
      await api.post("/users/signup", {
        email: data.email,
        password: data.password,
      });

      navigate("/login");
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosErr = err as {
          response: { data: { detail?: string | Array<{ msg: string }> } };
        };
        const detail = axiosErr.response?.data?.detail;
        if (Array.isArray(detail)) {
          setError(detail[0]?.msg || "Failed to sign up.");
        } else {
          setError(detail || "Failed to sign up.");
        }
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center mb-4">Signup</Card.Title>
              {error && (
                <Alert variant="danger">
                  {typeof error === "string" ? error : JSON.stringify(error)}
                </Alert>
              )}
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    {...register("email", { required: "Email is required" })}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.message as string}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password?.message as string}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    {...register("confirmPassword", {
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    isInvalid={!!errors.confirmPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword?.message as string}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="success" type="submit" disabled={loading}>
                    {loading ? "Signing up..." : "Signup"}
                  </Button>
                </div>
              </Form>
              <div className="text-center mt-3">
                Already have an account? <Link to="/login">Login</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
