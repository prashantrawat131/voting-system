import { useState } from "react";
import Poll from "./poll";

function Homefeed(props) {
  const [polls, setPolls] = useState([]);

  fetch("/getPolls")
    .then((res) => res.json())
    .then((data) => {
      if(data.message){
        alert(data.message);
      }else{
        console.log("Poll data received: "+JSON.stringify(data));
        setPolls(data);
      }
    });

  return (
    <div>
      <p>Home feed</p>
      {polls.forEach((poll) => {
        <Poll data={poll} />;
      })}
    </div>
  );
}

export default Homefeed;
