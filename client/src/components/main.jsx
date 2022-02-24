import Homefeed from "./homefeed";

function Main(props){
    return (
        <div>
            {/* <p>Main Page</p> */}
            <Homefeed username={props.username}/>
        </div>
    );
}

export default Main;