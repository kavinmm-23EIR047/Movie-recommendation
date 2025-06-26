// import { useState } from "react"
// import { Routes,Route, BrowserRouter } from "react-router-dom";
// import Listuser from "./components/Listuser";
// import Home from "./components/Home.jsx"
// function App() {
//   // let newList =

//   // let [userList ,setuserList]=useState( [
//   //               {name:'siva',email:'mmkavin96@gmail.com',password:'1234'},
//   //                ]
//   //               )
//   // return (
//   //   <>
//   //   <input type="text" placeholder="Enter name" onClick={(e) =>setuserList([...userList,{name:e.target.value}])}/>
//   //   <input type="text"  onClick={(e) =>setuserList([...userList,{name:e.target.value}])}/>
//   //   <ul>
//   //     {
//   //       userList.map((user )=>{
//   //         return <li key={user.id}>
//   //           {user.name}
//   //         </li>
//   //       })
//   //     }
//   //   </ul>
//   //   </>


//   // let [count,setCount] = useState(0)
//   // return (
//   //   <> 
//   //   {/* or <div></div> extra node is create use above method name is fragmentaion */}
//   //     <button onClick={()=>setCount(count+1)}>
//   //       click
//   //     </button>
//   //     <div>
//   //       <h1>{count}</h1>
//   //     </div>
//   //   </>

// // let [users,setusers]=useState({name:"suresh",username:"sur2"});

// //   return(
// //     <>
// //       <Home user={users}/>

// //     </>
// //   )

// // let [userList,setuserList]=useState([])
// // let [user,setuser]=useState({name:'',email:''});
// // return (
// //   <>
// //   <form onSubmit={(e)=>{
// //     e.preventDefault()
// //     setuserList([...userList,{...user}]);
// //   }}>
// //     <input type="text" placeholder="name" onChange={(e)=>{
// //       user.name=e.target.value;
// //     }}/>
// //      <input type="text" placeholder="name" onChange={(e)=>{
// //       user.email=e.target.value;
// //           }}/>
// //      <button type="submit">Submit</button>
// //   </form>

// //   <div>
// //     <table className="table table-striped">
// //       <thead>
// //         <tr>
// //           <th>name</th>
// //           <th>Email</th>
// //         </tr>
// //         </thead>
// //        {
// //         userList.map((user,index)=>(
// //           <tr key={index}>
// //             <td>{user.name}</td>
// //             <td>{user.email}</td>
// //           </tr>
// //         ))
// //        }

// //     </table>
// //   </div>
// //   </>

// // )
// // return (
// //   <Listuser/>
// // )


// return(
//   <>
//   <BrowserRouter>
//   <Routes>
//     <Route path ="/" element={<Home/>}/>
//      <Route path ="/listuser" element={<Listuser/>}/>

//   </Routes>
//   </BrowserRouter>
//   </>
// )
// }


// export default App





import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Search from './pages/Search';
import Recommended from './pages/Recommended';
import Filter from './pages/Filter';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './styles/global.css';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? children : <Navigate to="/login" />;
};

const AppLayout = () => {
  const location = useLocation();
  const hideNavAndFooter = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {!hideNavAndFooter && <Navbar />}
      <main className="main-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recommended"
            element={
              <ProtectedRoute>
                <Recommended />
              </ProtectedRoute>
            }
          />
          <Route
            path="/filter"
            element={
              <ProtectedRoute>
                <Filter />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {!hideNavAndFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
