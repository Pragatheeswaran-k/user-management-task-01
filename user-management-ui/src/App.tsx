import { Routes, Route } from 'react-router-dom';
import UserList from './components/List';
import RegisterForm from './components/RegisterForm';
import Authentication from './pages/Authentication'

function App() {
  return (
      <Routes>
        <Route path="/login" element={<Authentication />} />
        <Route path="/" element={<UserList />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
  );
}

export default App;
