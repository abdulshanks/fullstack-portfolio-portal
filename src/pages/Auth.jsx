import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/portal");
  };

  // Fast-track entry mechanism for recruiters
  const handleGuestLogin = () => {
    setEmail("recruiter@enterprise.com");
    setPassword("guest_token_2026");
    navigate("/portal");
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light px-3">
      <div
        className="card border-0 shadow-lg rounded-4 overflow-hidden w-100"
        style={{ maxWidth: "450px" }}
      >
        <div className="card-body p-4 p-md-5 bg-white">
          <div className="text-center mb-4">
            <Link
              to="/"
              className="text-decoration-none text-dark d-block mb-2 fs-3 fw-black"
            >
              ABAS.DEV
            </Link>
            <h4 className="fw-bold text-dark">
              {isLogin ? "Access System Portal" : "Register Secure Profile"}
            </h4>
            <p className="text-muted small">
              Ecosystem architecture validation sandbox
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="mb-3">
                <label className="form-label small fw-bold">
                  Full Identity Name
                </label>
                <input
                  type="text"
                  required
                  className="form-control py-2 rounded-3 shadow-sm border-secondary-subtle"
                  placeholder="Abdulrahman Abass"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div className="mb-3">
              <label className="form-label small fw-bold">
                System Email Address
              </label>
              <input
                type="email"
                required
                className="form-control py-2 rounded-3 shadow-sm border-secondary-subtle"
                placeholder="name@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="form-label small fw-bold">
                Secure Access Key (Password)
              </label>
              <input
                type="password"
                required
                className="form-control py-2 rounded-3 shadow-sm border-secondary-subtle"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-dark w-100 py-2.5 rounded-3 fw-semibold shadow-sm mb-2"
            >
              {isLogin
                ? "Authenticate Access Engine"
                : "Provision Account Wrapper"}
            </button>
          </form>

          {/* Recruiter One-Click Fast Lane */}
          <button
            onClick={handleGuestLogin}
            className="btn btn-outline-primary w-100 py-2 rounded-3 fw-bold small mb-3 border-2"
          >
            <i className="bi bi-lightning-charge-fill me-1"></i> Instant
            Recruiter Guest Demo Login
          </button>

          <div className="text-center mt-2">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="btn btn-link text-secondary text-decoration-none small fw-semibold"
            >
              {isLogin
                ? "Need a system profile key? Register here"
                : "Already hold access tokens? Authenticate instead"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
