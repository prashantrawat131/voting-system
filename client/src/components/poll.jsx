import { useState } from "react";

function Poll(props) {
  const [selected, setSelected] = useState(-1);
  const style = { backgroundColor: "green" };
  const noStyle = {};
  const pollJson = props.data;

  function getSelected(){
    const url="/getSelected?poll_id="+pollJson._id+"&voter_email="+props.username;
    // console.log("Url: "+url);
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
      const optionSelected=data.optionSelected;
      setSelected(optionSelected);
      // console.log("Seleted: "+selected);
    });
  }

  getSelected();

  function optionClicked(poll_id, optionNumber) {
    // console.log("Poll id: " + poll_id + "\toption number: " + optionNumber);
    setSelected(optionNumber);
    fetch("/vote", {
      method: "POST",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify({
        poll_id,
        optionNumber,
        voter_email: props.username,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // if (data.message) {
          // console.log(JSON.stringify(data));
        // } else {
          // console.log("After voting data: " + JSON.stringify(data));
          // props.refreshPoll(data);
        // }
      });
  }


  return (
    <div className="card mx-auto poll">
      <div className="card-body">
        <div className="container poll-div">
          <div className="row">
            <p>{pollJson.poll_title}</p>
          </div>
          <div className="row">
            <div
              className="col option"
              style={selected === 1 ? style : noStyle}
              onClick={() => optionClicked(pollJson._id, 1)}
            >
              {pollJson.option1}
            </div>
            <div
              className="col option"
              style={selected === 2 ? style : noStyle}
              onClick={() => optionClicked(pollJson._id, 2)}
            >
              {pollJson.option2}
            </div>
          </div>
          <div className="row">
            <div
              className="col option"
              style={selected === 3 ? style : noStyle}
              onClick={() => optionClicked(pollJson._id, 3)}
            >
              {pollJson.option3}
            </div>
            <div
              className="col option"
              style={selected === 4 ? style : noStyle}
              onClick={() => optionClicked(pollJson._id, 4)}
            >
              {pollJson.option4}
            </div>
          </div>
        </div>
        <p>---------------------------</p>
        <div className="graph-div">
          <p>
            {pollJson.option1}--{pollJson.option1_votes}
          </p>

          <p>
            {pollJson.option2}--{pollJson.option2_votes}
          </p>

          <p>
            {pollJson.option3}--{pollJson.option3_votes}
          </p>

          <p>
            {pollJson.option4}--{pollJson.option4_votes}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Poll;
