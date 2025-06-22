function Home(props){
    let user = props.user;
    console.log(user);
    return(
        <>
        <h1>hi {user.name} Welcome to the Home</h1>
        </>
    )
}

export default Home