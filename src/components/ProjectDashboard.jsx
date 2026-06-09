import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ProjectDashboard() {
  const [userRole, setUserRole] = useState("Team Lead");
  const [projects, setProjects] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState([
    "SYSTEM INITIALIZATION... READY",
    "CONNECTING TO API ROUTER PIPELINE: PORT 5000...",
    "CONNECTED: MONGO_DB CLUSTER ESTABLISHED SUCCESSFULLY.",
  ]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Planning",
    progress: 0,
  });

  // 1. LIVE DATABASE DATA FETCH STREAM
  useEffect(() => {
    fetch("http://localhost:5000/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
        addTerminalLog(
          `SYNC SUCCESSFUL: Synced ${data.length} document entries from database collection.`,
        );
      })
      .catch((err) => {
        console.error("Database sync pipe failed:", err);
        setLoading(false);
        addTerminalLog(
          "ERROR: API Pipeline connection rejected. Run 'npm start' in backend.",
        );
      });
  }, []);

  const addTerminalLog = (msg) => {
    const time = new Date().toLocaleTimeString();
    setTerminalLogs((prev) => [`[${time}] ${msg}`, ...prev.slice(0, 4)]);
  };

  // 2. LIVE MONGODB PROVISION PIPE
  const handleCreateProject = async (e) => {
    e.preventDefault();
    addTerminalLog(
      `PROVISIONING: Broadcasting schema mutation request for "${form.title}"...`,
    );

    const targetProjectData = {
      title: form.title,
      description: form.description,
      status: form.status,
      progress: form.progress,
    };

    try {
      const response = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(targetProjectData),
      });

      if (response.ok) {
        const freshDatabaseRecord = await response.json();
        setProjects([freshDatabaseRecord, ...projects]);
        setShowModal(false);
        setForm({
          title: "",
          description: "",
          status: "Planning",
          progress: 0,
        });
        addTerminalLog(
          `SUCCESS: Instantiated Document ID: ${freshDatabaseRecord._id}`,
        );
      }
    } catch (err) {
      console.error("Failed to write record:", err);
      addTerminalLog(
        "CRITICAL ERROR: Failed to write system document to cluster schema.",
      );
    }
  };

  // UI Analytics Computations
  const totalProjects = projects.length;
  const completedProjects = projects.filter(
    (p) => p.status === "Completed",
  ).length;
  const avgProgress =
    totalProjects > 0
      ? Math.round(
          projects.reduce((acc, curr) => acc + (curr.progress || 0), 0) /
            totalProjects,
        )
      : 0;

  const displayedProjects =
    filteredStatus === "All"
      ? projects
      : projects.filter((p) => p.status === filteredStatus);

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark text-white">
        <div
          className="spinner-border text-primary mb-3"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        ></div>
        <div className="fw-mono tracking-wider">
          AWAITING CLUSTER SCHEMAS...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100 text-dark">
      {/* Upper Dashboard Sub-Navigation Header */}
      <nav className="navbar navbar-dark bg-dark shadow-sm py-3 px-4">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold font-monospace text-white d-flex align-items-center gap-2">
            <i className="bi bi-cpu-fill text-info"></i> ABASS_CORE // SYSTEM
            EXECUTIVE PORTAL
          </span>
          <div className="d-flex align-items-center gap-3">
            <div className="bg-secondary bg-opacity-25 border border-secondary text-white px-3 py-1.5 rounded-3 font-monospace small d-none d-md-block">
              NODE_ENV:{" "}
              <span className="text-success fw-bold">development</span>
            </div>
            <Link
              to="/"
              className="btn btn-outline-light btn-sm rounded-2 px-3"
            >
              Exit System
            </Link>
          </div>
        </div>
      </nav>

      <div className="container-fluid py-4 px-3 px-md-5">
        {/* Control Hub Identity Strip */}
        <div className="row g-3 align-items-center justify-content-between mb-4 p-4 bg-white rounded-4 shadow-sm border-start border-dark border-5">
          <div className="col-12 col-md-7">
            <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
              <span className="badge bg-dark px-3 py-2 text-uppercase tracking-wider rounded-2 small font-monospace">
                ACTIVE CONTEXT: {userRole}
              </span>
              <select
                className="form-select form-select-sm w-auto rounded-3 font-monospace"
                value={userRole}
                onChange={(e) => {
                  setUserRole(e.target.value);
                  addTerminalLog(
                    `CONTEXT CHANGED: Context switched to role permission level [${e.target.value}].`,
                  );
                }}
              >
                <option value="Team Lead">
                  Simulate Role: Team Lead (Read/Write)
                </option>
                <option value="Engineer">
                  Simulate Role: Engineer (Read-Only)
                </option>
              </select>
            </div>
            <h2 className="fw-black text-dark tracking-tight m-0">
              Project Environment Cluster Engine
            </h2>
          </div>
          <div className="col-12 col-md-5 text-md-end">
            {userRole === "Team Lead" && (
              <button
                className="btn btn-dark px-4 py-2.5 rounded-3 fw-bold shadow-sm"
                onClick={() => setShowModal(true)}
              >
                <i className="bi bi-plus-square-fill me-2"></i>Provision System
                Row
              </button>
            )}
          </div>
        </div>

        {/* Live Micro-Analytics Panels */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-sm-6 col-xl-3">
            <div className="card border-0 shadow-sm rounded-4 p-3 bg-white">
              <div className="text-muted font-monospace small text-uppercase">
                TOTAL DATA RECORDS
              </div>
              <div className="d-flex justify-content-between align-items-baseline mt-2">
                <span className="display-6 fw-bold text-dark">
                  {totalProjects}
                </span>
                <i className="bi bi-folder-fill text-secondary fs-3"></i>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-xl-3">
            <div className="card border-0 shadow-sm rounded-4 p-3 bg-white">
              <div className="text-muted font-monospace small text-uppercase">
                STABLE COMPLETIONS
              </div>
              <div className="d-flex justify-content-between align-items-baseline mt-2">
                <span className="display-6 fw-bold text-success">
                  {completedProjects}
                </span>
                <i className="bi bi-check-circle-fill text-success fs-3"></i>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-xl-3">
            <div className="card border-0 shadow-sm rounded-4 p-3 bg-white">
              <div className="text-muted font-monospace small text-uppercase">
                MEAN MATRIX PROGRESS
              </div>
              <div className="d-flex justify-content-between align-items-baseline mt-2">
                <span className="display-6 fw-bold text-dark">
                  {avgProgress}%
                </span>
                <i className="bi bi-speedometer2 text-info fs-3"></i>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-xl-3">
            <div className="card border-0 shadow-sm rounded-4 p-3 bg-dark text-success font-monospace">
              <div className="text-light opacity-50 small text-uppercase">
                CLUSTER STATUS
              </div>
              <div className="d-flex justify-content-between align-items-baseline mt-2">
                <span className="fs-4 fw-bold text-success tracking-wide">
                  ONLINE
                </span>
                <span
                  className="spinner-grow text-success spinner-grow-sm"
                  role="status"
                ></span>
              </div>
            </div>
          </div>
        </div>

        {/* Built-In Live Terminal Logging Monitor Component */}
        <div className="card bg-dark border-0 rounded-4 shadow-sm mb-4 overflow-hidden">
          <div className="bg-secondary bg-opacity-25 py-2 px-3 d-flex justify-content-between align-items-center">
            <span className="font-monospace text-light small d-flex align-items-center gap-2">
              <span
                className="bg-danger rounded-circle d-inline-block"
                style={{ width: "8px", height: "8px" }}
              ></span>
              <span
                className="bg-warning rounded-circle d-inline-block"
                style={{ width: "8px", height: "8px" }}
              ></span>
              <span
                className="bg-success rounded-circle d-inline-block"
                style={{ width: "8px", height: "8px" }}
              ></span>
              System Terminal Standard Output Stream
            </span>
            <small className="text-muted font-monospace small">
              v1.0.0 // LISTENER
            </small>
          </div>
          <div
            className="card-body p-3 font-monospace small bg-black text-light-inline text-start"
            style={{
              maxHeight: "140px",
              overflowY: "auto",
              backgroundColor: "#050505",
              color: "#39ff14",
              lineHeight: "1.6",
            }}
          >
            {terminalLogs.map((log, i) => (
              <div key={i} className="text-opacity-75">
                {log}
              </div>
            ))}
          </div>
        </div>

        {/* Filter Controller Navigation Row */}
        <div className="d-flex gap-2 overflow-x-auto pb-3 mb-4">
          {["All", "Planning", "In Progress", "Completed"].map((status) => (
            <button
              key={status}
              onClick={() => setFilteredStatus(status)}
              className={`btn btn-sm rounded-3 px-4 font-monospace ${filteredStatus === status ? "btn-dark text-white" : "btn-white border bg-white text-muted"}`}
            >
              {status.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Project Dynamic Grid Container */}
        <div className="row g-4">
          {displayedProjects.length === 0 ? (
            <div className="col-12 text-center py-5 bg-white rounded-4 border border-dashed">
              <i className="bi bi-box-seam text-muted display-4 mb-3 d-block"></i>
              <h4 className="fw-bold text-secondary">
                No Targeted Schemas Found
              </h4>
              <p className="text-muted small">
                No database array documents current match the requested filter
                pipeline rules.
              </p>
            </div>
          ) : (
            displayedProjects.map((proj) => (
              <div
                className="col-12 col-md-6 col-xl-4"
                key={proj._id || proj.id}
              >
                <div className="card h-100 shadow-sm border-0 rounded-4 bg-white hover-up transitions-all">
                  <div className="card-body p-4 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span
                        className={`badge px-3 py-1.5 rounded-pill font-monospace small ${
                          proj.status === "Completed"
                            ? "bg-success bg-opacity-10 text-success border border-success border-opacity-25"
                            : proj.status === "In Progress"
                              ? "bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25"
                              : "bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-25"
                        }`}
                      >
                        {proj.status}
                      </span>
                      <span className="font-monospace text-muted small px-2 py-1 bg-light rounded-2">
                        ID: {String(proj._id || proj.id).slice(-6)}
                      </span>
                    </div>
                    <h4 className="fw-bold text-dark tracking-tight mb-2">
                      {proj.title}
                    </h4>
                    <p
                      className="text-secondary small flex-grow-1"
                      style={{ lineHeight: "1.5" }}
                    >
                      {proj.description}
                    </p>
                    <div className="my-3">
                      <div className="d-flex justify-content-between text-muted font-monospace small mb-1">
                        <span>Pipeline Velocity Metric</span>
                        <span className="fw-bold text-dark">
                          {proj.progress}%
                        </span>
                      </div>
                      <div
                        className="progress rounded-pill"
                        style={{ height: "8px", backgroundColor: "#e9ecef" }}
                      >
                        <div
                          className="progress-bar rounded-pill bg-dark progress-bar-striped progress-bar-animated"
                          role="progressbar"
                          style={{ width: `${proj.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="bg-light p-2 rounded-3 text-center small text-secondary font-monospace border">
                      Lead Engineer:{" "}
                      <span className="text-dark fw-bold">
                        {proj.lead || "Abdulrahman Abass"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Creation Modal Modal Architecture */}
      {showModal && (
        <div className="modal d-block position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-70 z-3 d-flex align-items-center justify-content-center">
          <div
            className="modal-dialog modal-dialog-centered w-100 p-3"
            style={{ maxWidth: "520px" }}
          >
            <div className="modal-content border-0 rounded-4 shadow-lg p-3 bg-white text-dark">
              <div className="modal-header border-0 pb-0 d-flex justify-content-between">
                <h5 className="modal-title fw-black text-dark">
                  <i className="bi bi-terminal-plus me-2"></i>Provision New
                  Database Row
                </h5>
                <button
                  type="button"
                  className="btn-close shadow-none"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form
                onSubmit={handleCreateProject}
                className="modal-body font-monospace"
              >
                <div className="mb-3">
                  <label className="form-label small fw-bold">
                    SYSTEM PROJECT TITLE
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control rounded-3 py-2 font-monospace shadow-sm"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    placeholder="e.g. Multi-Tenant Gateway"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold">
                    ENGINEERING SCOPE DETAIL DESCRIPTION
                  </label>
                  <textarea
                    required
                    className="form-control rounded-3 font-monospace shadow-sm"
                    rows="3"
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    placeholder="Describe architectural keys, data pipeline, deployment environments..."
                  ></textarea>
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <label className="form-label small fw-bold">
                      TARGET STATUS
                    </label>
                    <select
                      className="form-select rounded-3 shadow-sm font-monospace"
                      value={form.status}
                      onChange={(e) =>
                        setForm({ ...form, status: e.target.value })
                      }
                    >
                      <option value="Planning">Planning</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-bold">
                      VELOCITY CAPACITY (%)
                    </label>
                    <input
                      type="number"
                      max="100"
                      min="0"
                      required
                      className="form-control rounded-3 shadow-sm font-monospace"
                      value={form.progress}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          progress: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="d-flex gap-2 justify-content-end mt-4">
                  <button
                    type="button"
                    className="btn btn-light rounded-3 px-4 fw-bold"
                    onClick={() => setShowModal(false)}
                  >
                    Abort
                  </button>
                  <button
                    type="submit"
                    className="btn btn-dark rounded-3 px-4 fw-bold shadow-sm"
                  >
                    Commit Document
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
