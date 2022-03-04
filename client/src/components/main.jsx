import { useState } from "react";
import Homefeed from "./homefeed";
import Navbar from "./navbar";
import Search from "./search";

function Main(props){

    const [mainState,setMainState]=useState(0);


    return (
        <div>
            <Navbar setMainState={setMainState} setAppState={props.setAppState}/>
            {/* <p>Main Page</p> */}
            {mainState===0 && <Homefeed/>}

            {mainState===1 && <Search/>}
        </div>
    );
}

export default Main;