import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const techStack = [
    { name: "React", category: "Frontend Core" },
    { name: "Flutter / Dart", category: "Mobile UI Engine" },
    { name: "Node.js", category: "Server Architecture" },
    { name: "MongoDB", category: "NoSQL DB Cluster" },
    { name: "MySQL / SQL Server", category: "Relational DB Layers" },
    { name: "Git Engine", category: "DevOps & Control" },
  ];

  return (
    <div className="bg-white text-dark min-vh-100">
      {/* Global Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top py-3">
        <div className="container px-4">
          <Link
            className="navbar-brand fw-black tracking-tight text-dark"
            to="/"
          >
            ABASS.DEV
          </Link>
          <div className="ms-auto d-flex gap-2">
            <Link to="/auth" className="btn btn-outline-dark rounded-pill px-4">
              Portal Sign-In
            </Link>
            <a
              href="#contact"
              className="btn btn-dark rounded-pill px-4 d-none d-md-inline-block"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </nav>

      {/* Engineering Hero Identity Banner */}
      <header className="container py-5 my-md-5 px-4">
        <div className="row align-items-center g-5">
          <div className="col-lg-7">
            <span className="badge bg-dark text-white px-3 py-2 rounded-3 mb-3 fw-semibold">
              Available for Engineering Roles
            </span>
            <h1
              className="display-3 fw-black text-dark mb-3 tracking-tight"
              style={{ lineHeight: 1.1 }}
            >
              Building High-Velocity,{" "}
              <span className="text-secondary">Decoupled Web Systems.</span>
            </h1>
            <p className="lead text-secondary mb-4 col-md-10">
              I am a Full-Stack Software Engineer executing high-fidelity
              interfaces in React coupled with decoupled, secure Node.js
              micro-architectures.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Link
                to="/auth"
                className="btn btn-dark btn-lg px-4 rounded-3 py-2 fs-6"
              >
                Run Live Portal Application
              </Link>
              <a
                href="https://www.linkedin.com/in/shanks-abdul-3a8945361?"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-secondary btn-lg px-4 rounded-3 py-2 fs-6"
              >
                <i className="bi bi-linkedin me-2"></i>Sync LinkedIn
              </a>
            </div>
          </div>
          <div className="col-lg-5 text-center">
            <div className="p-5 bg-light rounded-5 border d-inline-block shadow-sm">
              <div className="fs-1 Handjet fw-bold text-dark">A.A</div>
              <div className="text-muted fw-mono small mt-2">
                v2.0.26 // PRODUCTION
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Strategic Engineering Metrics Block */}
      <section className="bg-light py-5 border-top border-bottom">
        <div className="container py-4 px-4">
          <div className="row g-5">
            <div className="col-md-4">
              <h3 className="fw-bold text-dark tracking-wider">TRACK RECORD</h3>
              <p className="text-secondary small mt-3">
                Active implementations demonstrating baseline capacity across
                structural data schemas and state-driven operations dashboards.
              </p>
            </div>
            <div className="col-md-8">
              <div className="row g-4">
                <div className="col-sm-6">
                  <div className="p-4 bg-white rounded-4 shadow-sm h-100">
                    <h5 className="fw-bold text-dark">
                      Advanced Engineering Diploma
                    </h5>
                    <p className="text-muted small mb-0">
                      Rigorous technical qualification validation emphasizing
                      system patterns, entity safety rules, and decoupling
                      styles.
                    </p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="p-4 bg-white rounded-4 shadow-sm h-100">
                    <h5 className="fw-bold text-dark">
                      Team Lead — Moonlight Events
                    </h5>
                    <p className="text-muted small mb-0">
                      Chaired component architecture parameters, audited
                      repository commits, and managed secure registration loops.
                    </p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="p-4 bg-white rounded-4 shadow-sm h-100">
                    <h5 className="fw-bold text-dark">
                      Scalable Portal Clusters
                    </h5>
                    <p className="text-muted small mb-0">
                      Designing responsive school portal components processing
                      highly concurrent administrative records pipelines.
                    </p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="p-4 bg-white rounded-4 shadow-sm h-100">
                    <h5 className="fw-bold text-dark">
                      Client Matrix Operations
                    </h5>
                    <p className="text-muted small mb-0">
                      Managed data communication pathways and customer
                      resolution structures within a high-throughput travels
                      agency framework.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Stack Block */}
      <section className="container py-5 my-5 px-4">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-dark">
            Verified Production Core Tech Stack
          </h2>
          <p className="text-muted">
            Languages and technical frameworks deployed frequently across live
            instances.
          </p>
        </div>
        <div className="d-flex flex-wrap justify-content-center gap-3 max-w-2xl mx-auto">
          {techStack.map((tech, idx) => (
            <div
              key={idx}
              className="px-4 py-3 bg-white border rounded-4 shadow-sm d-flex align-items-center gap-2"
            >
              <span
                className="bg-dark rounded-circle"
                style={{ width: "8px", height: "8px" }}
              ></span>
              <div>
                <span
                  className="fw-bold text-dark d-block"
                  style={{ fontSize: "0.95rem" }}
                >
                  {tech.name}
                </span>
                <small
                  className="text-muted d-block"
                  style={{ fontSize: "0.75rem" }}
                >
                  {tech.category}
                </small>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dedicated Contact Section */}
      <section id="contact" className="bg-dark text-white py-5 mt-5 border-top">
        <div className="container py-4 px-4">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <span className="text-info font-monospace small d-block mb-2">
                // SECURE COMMUNICATION CHANNEL
              </span>
              <h2 className="display-5 fw-black text-white tracking-tight mb-3">
                Let's Build Something Impactful.
              </h2>
              <p className="text-secondary col-md-10">
                Whether you are looking to clear engineering backlogs, architect
                a decoupled web platform, or add a technical contributor to your
                engineering squad, let's open a dialogue.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="p-4 bg-secondary bg-opacity-10 rounded-4 border border-secondary border-opacity-25 shadow-sm">
                <h5 className="fw-bold mb-4 font-monospace text-info">
                  DIRECT CONNECTIONS
                </h5>

                <div className="d-flex align-items-center gap-3 mb-3">
                  <div
                    className="bg-white bg-opacity-10 rounded-3 p-2.5 text-center"
                    style={{ width: "45px" }}
                  >
                    <i className="bi bi-envelope-fill text-white"></i>
                  </div>
                  <div>
                    <small
                      className="text-muted d-block font-monospace"
                      style={{ fontSize: "0.75rem" }}
                    >
                      OFFICIAL SECURE MAIL
                    </small>
                    {/* FIXED LINK: Opens directly inside web browser Gmail tab */}
                    <a
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=abdulshanks2007@gmail.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-white text-decoration-none fw-bold"
                    >
                      abdulshanks2007@gmail.com{" "}
                      <i
                        className="bi bi-box-arrow-up-right small ms-1"
                        style={{ fontSize: "0.65rem" }}
                      ></i>
                    </a>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3 mb-3">
                  <div
                    className="bg-white bg-opacity-10 rounded-3 p-2.5 text-center"
                    style={{ width: "45px" }}
                  >
                    <i className="bi bi-linkedin text-white"></i>
                  </div>
                  <div>
                    <small
                      className="text-muted d-block font-monospace"
                      style={{ fontSize: "0.75rem" }}
                    >
                      PROFESSIONAL NETWORK
                    </small>
                    <a
                      href="https://www.linkedin.com/in/shanks-abdul-3a8945361?"
                      target="_blank"
                      rel="noreferrer"
                      className="text-white text-decoration-none fw-bold"
                    >
                      Sync on LinkedIn →
                    </a>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <div
                    className="bg-white bg-opacity-10 rounded-3 p-2.5 text-center"
                    style={{ width: "45px" }}
                  >
                    <i className="bi bi-geo-alt-fill text-white"></i>
                  </div>
                  <div>
                    <small
                      className="text-muted d-block font-monospace"
                      style={{ fontSize: "0.75rem" }}
                    >
                      CURRENT DEPLOYMENT REGION
                    </small>
                    <span className="text-secondary fw-semibold">
                      Lagos, Nigeria
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-5 pt-4 border-top border-secondary border-opacity-25 text-muted font-monospace small">
            &copy; 2026 ABDULRAHMAN ABASS. ALL RIGHTS RESERVED.
          </div>
        </div>
      </section>
    </div>
  );
}
