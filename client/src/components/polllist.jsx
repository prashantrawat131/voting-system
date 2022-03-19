import Cookies from "universal-cookie";
import Poll from "./poll";
const cookies=new Cookies();


// In this component all the polls are in the props.list
// To change a list use props.setList


function Polllist(props) {

    function refreshPoll(poll_id){
        fetch("/getPoll?poll_id="+poll_id)
        .then(res=>res.json())
        .then(data=>{
          const newPolls=props.list.map((poll)=>{
            if(poll._id!==poll_id){
              return poll;
            }else{
              return data;
            }
          });
        //   console.log("New polls: "+newPolls);
          props.setList(newPolls);
        });
      }

  return (
    <div>
      {props.list.map((poll) => {
        return (
          <Poll
            key={poll._id}
            pollData={poll}
            refreshPoll={refreshPoll}
            username={cookies.get("loggedInUserEmail")}
          />
        );
      })}
    </div>
  );
}

export default Polllist;
