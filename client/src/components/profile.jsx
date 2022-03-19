import Poll from "./poll";
import Cookies from "universal-cookie";
import Polllist from "./polllist";

const cookies = new Cookies();

function Profile(props) {
  function refreshPoll() {
    //it does nothing
  }

  return (
    <div>
      <button onClick={props.goToSearch}>go back</button>
      {props.selectedPersonPolls.length === 0 && <p>Polls not found</p>}

      <p>{props.selectedPersonData.name}</p>
      <p>{props.selectedPersonData.email}</p>

      {/* {props.selectedPersonPolls.map((poll) => {
        return (
          <Poll
            key={poll._id}
            data={poll}
            setPolls={props.setSelectedPersonPolls}
            refreshPoll={refreshPoll}
            username={cookies.get("loggedInUserEmail")}
          />
        );
      })} */}

      <Polllist list={props.selectedPersonPolls} setList={props.setSelectedPersonPolls}/>
    </div>
  );
}

export default Profile;
