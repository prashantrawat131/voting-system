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
          console.log("Poll data received: " + JSON.stringify(data));
          setPolls(data);
        }
      });
      setLoadPolls(false);
  }


  // console.log("no. of polls: "+polls[0].name);

  return (
    <div>
      <p>Home feed</p>
      {
      polls.forEach((poll) => {
        <Poll data={poll} />
      })
      }
    </div>
  );
}

export default Homefeed;
