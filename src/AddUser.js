import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import UserEdit from './UserEdit';
import AddUser from './AddUser';

function App() {
  const [users, setUsers] = useState([
    { username: 'admin', name: 'Admin', email: 'admin@yahoo.com', role: 'Administrator', posts: 16 },
    { username: 'dealer', name: 'dealer dealer', email: 'dealer@dealer.com', role: 'Dealers', posts: 0 },
  ]);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserEdit />} />
        <Route path="/add-user" element={<AddUser onAddUser={addUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
