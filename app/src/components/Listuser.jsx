import { useEffect,useState } from "react";

function Listuser(){
    const [userList,setuserList] = useState([]);

    useEffect(()=>{
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(res=>res.json()).then(data=>{
            setuserList(data);
        })
        .catch(err=>{
            console.error(err);
        });
    },[])

    return (
        (userList.length===0)?<p>User not found</p>:
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {userList.map((user,index)=>{
                    return <tr key={user.id}>
                        <td>{index+1}</td>
                         <td>{user.name}</td>
                          <td>{user.email}</td>
                    </tr>
                })}
            </tbody>
        </table>
    )
}

export default Listuser;