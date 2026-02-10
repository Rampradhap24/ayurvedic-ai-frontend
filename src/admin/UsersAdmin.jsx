import { useState } from "react";
import { usersData } from "./adminData";
import "../styles/admin.css";

function UsersAdmin() {
  const [users, setUsers] = useState(usersData);

  const updateUser = (id, field, value) => {
    setUsers(users.map(u =>
      u.id === id ? { ...u, [field]: value } : u
    ));
  };

  return (
    <div className="admin-bg">
      <div className="admin-panel">

        <h2>Users Management</h2>

        <div className="admin-table">
          {users.map(user => (
            <div className="row-card" key={user.id}>
              <h4>{user.name}</h4>

              <input value={user.age}
                onChange={e => updateUser(user.id,"age",e.target.value)} />

              <input value={user.height}
                onChange={e => updateUser(user.id,"height",e.target.value)} />

              <input value={user.weight}
                onChange={e => updateUser(user.id,"weight",e.target.value)} />

              <input value={user.workType}
                onChange={e => updateUser(user.id,"workType",e.target.value)} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default UsersAdmin;