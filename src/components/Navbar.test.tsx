import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import AppNavbar from "./Navbar";
import { useAuth } from "../hooks/useAuth";

// Mock the useAuth hook
vi.mock("../hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

const renderNavbar = () => {
  return render(
    <BrowserRouter>
      <AppNavbar />
    </BrowserRouter>,
  );
};

describe("AppNavbar", () => {
  it("renders brand and common links", () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      loading: false,
      login: vi.fn(),
      logout: vi.fn(),
      refreshUser: vi.fn(),
    });

    renderNavbar();
    expect(screen.getByText(/CUP Frontend/i)).toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });

  it("shows login and signup links when not authenticated", () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      loading: false,
      login: vi.fn(),
      logout: vi.fn(),
      refreshUser: vi.fn(),
    });

    renderNavbar();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Signup/i)).toBeInTheDocument();
    expect(screen.queryByText(/Profile/i)).not.toBeInTheDocument();
  });

  it("shows profile and logout when authenticated", () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        id: 1,
        email: "user@test.com",
        is_active: true,
        is_superuser: false,
        is_verified: true,
      },
      loading: false,
      login: vi.fn(),
      logout: vi.fn(),
      refreshUser: vi.fn(),
    });

    renderNavbar();
    expect(screen.getByText(/Profile/i)).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
    expect(screen.getByText(/user@test.com/i)).toBeInTheDocument();
  });
});
