import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";
import { useAuth } from "../hooks/useAuth";

// Mock the useAuth hook
vi.mock("../hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

const renderHomePage = () => {
  return render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>,
  );
};

describe("HomePage", () => {
  it("renders welcome message", () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      loading: false,
      login: vi.fn(),
      logout: vi.fn(),
      refreshUser: vi.fn(),
    });

    renderHomePage();
    expect(screen.getByText(/Welcome to CUP/i)).toBeInTheDocument();
    expect(
      screen.getByText(/This is a skeleton React \+ TypeScript frontend/i),
    ).toBeInTheDocument();
  });

  it("shows login and signup buttons when not logged in", () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      loading: false,
      login: vi.fn(),
      logout: vi.fn(),
      refreshUser: vi.fn(),
    });

    renderHomePage();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Signup/i })).toBeInTheDocument();
  });

  it("shows go to profile button when logged in", () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        id: 1,
        email: "test@example.com",
        is_active: true,
        is_superuser: false,
        is_verified: true,
      },
      loading: false,
      login: vi.fn(),
      logout: vi.fn(),
      refreshUser: vi.fn(),
    });

    renderHomePage();
    expect(
      screen.getByRole("button", { name: /Go to Profile/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Login/i }),
    ).not.toBeInTheDocument();
  });
});
