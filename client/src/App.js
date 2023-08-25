import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from "./components/Home";
import Recommend from "./components/Recommend";
import "./styles.css";

function App() {
  return (
    <Router>
      <nav className="navbar">
        <ul className="nav navbar-nav">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/recommend_books">Recommend</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recommend_books" element={<Recommend />} />
      </Routes>
    </Router>
  );
}

export default App;










// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const App = () => {
//   const [data, setData] = useState([]);
//   const [formData, setFormData] = useState({});

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:5000/api/data');
//       setData(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleCreate = async () => {
//     try {
//       await axios.post('http://127.0.0.1:5000/api/data', formData);
//       fetchData();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleUpdate = async (id) => {
//     try {
//       await axios.put(`http://127.0.0.1:5000/api/data/${id}`, formData);
//       fetchData();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://127.0.0.1:5000/api/data/${id}`);
//       fetchData();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);
//   return (
//     <div>
//       <h1>CRUD Application</h1>

//       {/* Create Form */}
//       <div>
//         <h2>Create Data</h2>
//         <input type="text" name="name" placeholder="Name" onChange={handleInputChange} />
//         <input type="text" name="age" placeholder="Age" onChange={handleInputChange} />
//         <button onClick={handleCreate}>Create</button>
//       </div>

//       {/* Display Data */}
//       <div>
//         <h2>Data List</h2>
//         <ul>
//           {data.map((item) => (
//             <li key={item._id}>
//               {item.name}, {item.age}
//               <button onClick={() => handleUpdate(item._id)}>Update</button>
//               <button onClick={() => handleDelete(item._id)}>Delete</button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default App;