import { useState } from "react"
import Listuser from "./components/Listuser";
// import Home from "./components/Home.jsx"
function App() {
  // let newList =

  // let [userList ,setuserList]=useState( [
  //               {name:'siva',email:'mmkavin96@gmail.com',password:'1234'},
  //                ]
  //               )
  // return (
  //   <>
  //   <input type="text" placeholder="Enter name" onClick={(e) =>setuserList([...userList,{name:e.target.value}])}/>
  //   <input type="text"  onClick={(e) =>setuserList([...userList,{name:e.target.value}])}/>
  //   <ul>
  //     {
  //       userList.map((user )=>{
  //         return <li key={user.id}>
  //           {user.name}
  //         </li>
  //       })
  //     }
  //   </ul>
  //   </>


  // let [count,setCount] = useState(0)
  // return (
  //   <> 
  //   {/* or <div></div> extra node is create use above method name is fragmentaion */}
  //     <button onClick={()=>setCount(count+1)}>
  //       click
  //     </button>
  //     <div>
  //       <h1>{count}</h1>
  //     </div>
  //   </>

// let [users,setusers]=useState({name:"suresh",username:"sur2"});

//   return(
//     <>
//       <Home user={users}/>

//     </>
//   )

// let [userList,setuserList]=useState([])
// let [user,setuser]=useState({name:'',email:''});
// return (
//   <>
//   <form onSubmit={(e)=>{
//     e.preventDefault()
//     setuserList([...userList,{...user}]);
//   }}>
//     <input type="text" placeholder="name" onChange={(e)=>{
//       user.name=e.target.value;
//     }}/>
//      <input type="text" placeholder="name" onChange={(e)=>{
//       user.email=e.target.value;
//           }}/>
//      <button type="submit">Submit</button>
//   </form>

//   <div>
//     <table className="table table-striped">
//       <thead>
//         <tr>
//           <th>name</th>
//           <th>Email</th>
//         </tr>
//         </thead>
//        {
//         userList.map((user,index)=>(
//           <tr key={index}>
//             <td>{user.name}</td>
//             <td>{user.email}</td>
//           </tr>
//         ))
//        }

//     </table>
//   </div>
//   </>

// )
return (
  <Listuser/>
)
}


export default App
