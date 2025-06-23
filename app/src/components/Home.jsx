import { Link } from "react-router-dom";


function Home(props){
    // let user = props.user;
    // console.log(user);
    return(
        <>
        {/* <h1>hi{user.name} Welcome to the Home</h1> */}
        <h1>hi Welcome to the Home</h1>
         <Link to="/Listuser">Click to go to List User</Link>
        </>
    )
}

export default Home