import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:8083/api/employees";

function App() {
  const [employees, setEmployees] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    salary: "",
  });

  const [editingId, setEditingId] = useState(null);

  // GET - Display Employees
  const fetchEmployees = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle form input
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // ADD / UPDATE
  const handleSubmit = async (event) => {
    event.preventDefault();

    const employee = {
      name: formData.name,
      email: formData.email,
      department: formData.department,
      salary: Number(formData.salary),
    };

    try {
      let response;

      if (editingId !== null) {
        response = await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employee),
        });
      } else {
        response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employee),
        });
      }

      if (response.ok) {
        setFormData({
          name: "",
          email: "",
          department: "",
          salary: "",
        });

        setEditingId(null);

        fetchEmployees();
      }
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  // EDIT
  const handleEdit = (employee) => {
    setEditingId(employee.id);

    setFormData({
      name: employee.name,
      email: employee.email,
      department: employee.department,
      salary: employee.salary,
    });
  };

  // DELETE
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchEmployees();
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  // CANCEL UPDATE
  const handleCancel = () => {
    setEditingId(null);

    setFormData({
      name: "",
      email: "",
      department: "",
      salary: "",
    });
  };

  return (
    <div className="app-container">
      {/* Header */}

      <div className="header">
        <h1>Employee Management System</h1>

        <p>Manage your organization's employees</p>
      </div>

      {/* Add / Update Employee */}

      <div className="card">
        <h2>{editingId !== null ? "Update Employee" : "Add Employee"}</h2>

        <form className="employee-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>

            <input
              name="name"
              type="text"
              placeholder="Enter employee name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              name="email"
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Department</label>

            <input
              name="department"
              type="text"
              placeholder="Enter department"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Salary</label>

            <input
              name="salary"
              type="number"
              placeholder="Enter salary"
              value={formData.salary}
              onChange={handleChange}
              required
            />
          </div>

          <div className="button-container">
            <button type="submit" className="primary-button">
              {editingId !== null ? "Update Employee" : "Add Employee"}
            </button>

            {editingId !== null && (
              <button
                type="button"
                className="cancel-button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Employee List */}

      <div className="card">
        <div className="employee-header">
          <h2>Employees</h2>

          <span className="employee-count">{employees.length} Employees</span>
        </div>

        <div className="table-container">
          <table className="employee-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>

                  <td>{employee.name}</td>

                  <td>{employee.email}</td>

                  <td>{employee.department}</td>

                  <td>₹{employee.salary}</td>

                  <td>
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(employee)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-button"
                      onClick={() => handleDelete(employee.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
