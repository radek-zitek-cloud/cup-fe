import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Tab,
  Nav,
} from "react-bootstrap";
import { useForm, FieldValues } from "react-hook-form";
import api from "../api/axios";
import { useAuth } from "../hooks/useAuth";

const ProfilePage: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const [profileMsg, setProfileMsg] = useState<{
    type: string;
    text: string;
  } | null>(null);
  const [passwordMsg, setPasswordMsg] = useState<{
    type: string;
    text: string;
  } | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  const {
    register: regProfile,
    handleSubmit: handleProfileSubmit,
    reset: resetProfile,
  } = useForm();
  const {
    register: regPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    watch: watchPassword,
  } = useForm();

  useEffect(() => {
    if (user) {
      resetProfile({
        email: user.email,
        first_name: user.first_name || "",
        last_name: user.last_name || "",
      });
    }
  }, [user, resetProfile]);

  const onUpdateProfile = async (data: FieldValues) => {
    setLoadingProfile(true);
    setProfileMsg(null);
    try {
      await api.patch(`/users/${user?.id}`, data);
      await refreshUser();
      setProfileMsg({ type: "success", text: "Profile updated successfully!" });
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosErr = err as {
          response: { data: { detail?: string | Array<{ msg: string }> } };
        };
        const detail = axiosErr.response?.data?.detail;
        if (Array.isArray(detail)) {
          setProfileMsg({ type: "danger", text: detail[0]?.msg || "Failed to update profile." });
        } else {
          setProfileMsg({ type: "danger", text: detail || "Failed to update profile." });
        }
      } else {
        setProfileMsg({ type: "danger", text: "An unexpected error occurred." });
      }
    } finally {
      setLoadingProfile(false);
    }
  };

  const onChangePassword = async (data: FieldValues) => {
    setLoadingPassword(true);
    setPasswordMsg(null);
    try {
      await api.post("/auth/jwt/change-password", {
        password: data.old_password,
        new_password: data.new_password,
      });
      setPasswordMsg({
        type: "success",
        text: "Password changed successfully!",
      });
      resetPassword();
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosErr = err as { response: { data: { detail?: string } } };
        setPasswordMsg({
          type: "danger",
          text: axiosErr.response?.data?.detail || "Failed to change password.",
        });
      } else {
        setPasswordMsg({ type: "danger", text: "An unexpected error occurred." });
      }
    } finally {
      setLoadingPassword(false);
    }
  };

  if (!user)
    return (
      <Container className="mt-5">
        <Alert variant="warning">Please login to view profile.</Alert>
      </Container>
    );

  return (
    <Container>
      <Row className="mt-4">
        <Col md={4}>
          <Card className="text-center mb-4">
            <Card.Body>
              <div className="mb-3">
                <div
                  className="rounded-circle bg-secondary d-inline-flex align-items-center justify-content-center"
                  style={{
                    width: "100px",
                    height: "100px",
                    fontSize: "40px",
                    color: "white",
                  }}
                >
                  {user.email.charAt(0).toUpperCase()}
                </div>
              </div>
              <Card.Title>
                {user.first_name} {user.last_name}
              </Card.Title>
              <Card.Text className="text-muted">{user.email}</Card.Text>
              <hr />
              <div className="text-start">
                <p>
                  <strong>Status:</strong>{" "}
                  {user.is_active ? "Active" : "Inactive"}
                </p>
                <p>
                  <strong>Verified:</strong> {user.is_verified ? "Yes" : "No"}
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Tab.Container defaultActiveKey="profile">
            <Card>
              <Card.Header>
                <Nav variant="tabs">
                  <Nav.Item>
                    <Nav.Link eventKey="profile">Edit Profile</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="password">Change Password</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
              <Card.Body>
                <Tab.Content>
                  <Tab.Pane eventKey="profile">
                    {profileMsg && (
                      <Alert variant={profileMsg.type}>{profileMsg.text}</Alert>
                    )}
                    <Form onSubmit={handleProfileSubmit(onUpdateProfile)}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          {...regProfile("email")}
                          disabled
                        />
                        <Form.Text className="text-muted">
                          Email cannot be changed.
                        </Form.Text>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          {...regProfile("first_name")}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          {...regProfile("last_name")}
                        />
                      </Form.Group>
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={loadingProfile}
                      >
                        {loadingProfile ? "Saving..." : "Save Changes"}
                      </Button>
                    </Form>
                  </Tab.Pane>
                  <Tab.Pane eventKey="password">
                    {passwordMsg && (
                      <Alert variant={passwordMsg.type}>
                        {passwordMsg.text}
                      </Alert>
                    )}
                    <Form onSubmit={handlePasswordSubmit(onChangePassword)}>
                      <Form.Group className="mb-3">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control
                          type="password"
                          {...regPassword("old_password", { required: true })}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                          type="password"
                          {...regPassword("new_password", {
                            required: true,
                            minLength: 8,
                          })}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                          type="password"
                          {...regPassword("confirm_new_password", {
                            validate: (v) =>
                              v === watchPassword("new_password") ||
                              "Passwords do not match",
                          })}
                        />
                      </Form.Group>
                      <Button
                        variant="warning"
                        type="submit"
                        disabled={loadingPassword}
                      >
                        {loadingPassword ? "Changing..." : "Change Password"}
                      </Button>
                    </Form>
                  </Tab.Pane>
                </Tab.Content>
              </Card.Body>
            </Card>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
