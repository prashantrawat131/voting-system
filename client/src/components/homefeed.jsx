import { useState } from "react";
import Polllist from "./polllist";

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



  return (
    <div>
      {/* <p>{JSON.stringify(polls)}</p> */}
      {/* <h6>Home feed</h6> */}
      {/* {polls.map((poll) => {
        // console.log("Home feed poll: "+JSON.stringify(poll));
        return (
          <Poll
            // refreshPoll={refreshPoll}
            key={poll._id}
            data={poll}
            setPolls={setPolls}
            refreshPoll={refreshPoll}
            username={cookies.get("loggedInUserEmail")}
          />
        );
      })} */}
      <Polllist list={polls} setList={setPolls}/>
    </div>
  );
}

export default Homefeed;
