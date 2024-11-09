import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserEdit() {
  const [users, setUsers] = useState([
    { username: 'admin', name: 'Admin', email: 'admin@yahoo.com', role: 'Administrator', posts: 16 },
    { username: 'dealer', name: 'dealer dealer', email: 'dealer@dealer.com', role: 'Dealers', posts: 0 },
  ]);

  const navigate = useNavigate();

  const deleteUser = (username) => {
    setUsers(users.filter((user) => user.username !== username));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        Users
        <button onClick={() => navigate('/add-user')} style={styles.addNewButton}>Add New</button>
      </h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.headerCell}>Username</th>
            <th style={styles.headerCell}>Name</th>
            <th style={styles.headerCell}>Email</th>
            <th style={styles.headerCell}>Role</th>
            <th style={styles.headerCell}>Posts</th>
            <th style={styles.headerCell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.username}>
              <td style={styles.cell}>{user.username}</td>
              <td style={styles.cell}>{user.name}</td>
              <td style={styles.cell}>{user.email}</td>
              <td style={styles.cell}>{user.role}</td>
              <td style={styles.cell}>{user.posts}</td>
              <td style={styles.cell}>
                <button style={styles.editButton} onClick={() => alert(`Edit ${user.username}`)}>Edit</button>
                <button style={styles.deleteButton} onClick={() => deleteUser(user.username)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '20px auto',
    backgroundColor: '#f9f9f9',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '1.5em',
  },
  addNewButton: {
    padding: '5px 10px',
    backgroundColor: '#0073aa',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '15px',
  },
  headerCell: {
    padding: '10px',
    backgroundColor: '#f1f1f1',
    fontWeight: 'bold',
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
  },
  cell: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
  },
  editButton: {
    marginRight: '5px',
    padding: '5px 8px',
    fontSize: '12px',
    cursor: 'pointer',
    borderRadius: '3px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
  },
  deleteButton: {
    padding: '5px 8px',
    fontSize: '12px',
    cursor: 'pointer',
    borderRadius: '3px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
  },
};

export default UserEdit;
