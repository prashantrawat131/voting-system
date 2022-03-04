import { useState } from "react";
import Poll from "./poll";
import Cookies from "universal-cookie";

const cookies=new Cookies();

function Homefeed(props) {
  //it is true when the polls are need to be loaded
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

  // function refreshPoll(newPollData) {
  //   console.log("Resfresh: "+JSON.stringify(newPollData));
  //   const newPolls = polls;

  //   newPolls.forEach((value, index, arr) => {
  //     if (value._id === newPollData._id) {
  //       value=newPollData;
  //     }
  //   });

  //   setPolls(newPolls);
  //   // alert(JSON.stringify(polls));
  // }

  return (
    <div>
      {/* <h6>Home feed</h6> */}
      {polls.map((poll) => {
        // console.log("Home feed poll: "+JSON.stringify(poll));
        return (
          <Poll
            // refreshPoll={refreshPoll}
            key={poll._id}
            data={poll}
            username={cookies.get("loggedInUserEmail")}
          />
        );
      })}
    </div>
  );
}

export default Homefeed;
