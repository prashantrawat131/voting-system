import { useState } from "react";
import Poll from "./poll";

function Homefeed(props) {
  const [loadPolls, setLoadPolls] = useState(true);

  const [polls, setPolls] = useState([]);
  if (loadPolls) {
    fetch("/getPolls")
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
        } else {
          // console.log("Poll data received: " + JSON.stringify(data));
          setPolls(data);
        }
      });
    setLoadPolls(false);
  }

  return (
    <div>
      {/* <h6>Home feed</h6> */}
      {polls.map((poll) => {
        // console.log("Home feed poll: "+JSON.stringify(poll));
        return <Poll key={poll._id} data={poll} username={props.username}/>;
      })}
    </div>
  );
}

export default Homefeed;
