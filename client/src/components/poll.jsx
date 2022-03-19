import { useState } from "react";

function Poll(props) {
  const [selected, setSelected] = useState(-1);
  const style = { backgroundColor: "green" };
  const noStyle = {};
  const pollCreationDate = new Date(props.pollData.date);
  const [percents, setPercents] = useState([-1, -1, -1, -1]);

  function getPercent(o1, o2, o3, o4) {
    return (o1 / (o1 + o2 + o3 + o4)) * 100;
  }

  function calculatePercentages() {
    const { option1_votes, option2_votes, option3_votes, option4_votes } =
      props.pollData;
    const o1 = Number.parseFloat(option1_votes);
    const o2 = Number.parseFloat(option2_votes);
    const o3 = Number.parseFloat(option3_votes);
    const o4 = Number.parseFloat(option4_votes);
    const newPercents = [
      getPercent(o1, o2, o3, o4),
      getPercent(o2, o1, o3, o4),
      getPercent(o2, o2, o1, o4),
      getPercent(o4, o2, o3, o1),
    ];
    setPercents(newPercents);
  }

  // calculatePercentages();

  function getSelected() {
    const url =
      "/getSelected?poll_id=" +
      props.pollData._id +
      "&voter_email=" +
      props.username;
    // console.log("Url: "+url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const optionSelected = data.optionSelected;
        setSelected(optionSelected);
      });
  }

  getSelected();

  function optionClicked(poll_id, optionNumber) {
    // console.log("Poll id: " + poll_id + "\toption number: " + optionNumber);
    const lastSelectedOptionNumber = selected;
    setSelected(optionNumber);
    fetch("/vote", {
      method: "POST",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify({
        poll_id,
        optionNumber,
        voter_email: props.username,
        lastSelectedOptionNumber,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        props.refreshPoll(poll_id);
        calculatePercentages();
      });
  }

  return (
    <div className="card mx-auto poll">
      <div className="card-body">
        <div className="container poll-div">
          <div className="row poll-creator-name-div">
            <div className="col">{props.pollData.creator}</div>
            <div className="col">
              <div className="date-div">
              Date: {pollCreationDate.getDate()}/{pollCreationDate.getMonth()}/
              {pollCreationDate.getFullYear()}
              </div>
              <div className="time-div">
                Time: {pollCreationDate.getHours()}:
                {pollCreationDate.getMinutes()}
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <p>{props.pollData.poll_title}</p>
          </div>
          <div className="row">
              <div  className="col option"
                style={selected === 1 ? style : noStyle}
                onClick={() => optionClicked(props.pollData._id, 1)}
              >
              {props.pollData.option1}</div>
              {/* <div className="percent-div">{percents[0]}</div> */}

            <div
              className="col option"
              style={selected === 2 ? style : noStyle}
              onClick={() => optionClicked(props.pollData._id, 2)}
            >
              {props.pollData.option2}
            </div>
          </div>
          <div className="row">
            <div
              className="col option"
              style={selected === 3 ? style : noStyle}
              onClick={() => optionClicked(props.pollData._id, 3)}
            >
              {props.pollData.option3}
            </div>
            <div
              className="col option"
              style={selected === 4 ? style : noStyle}
              onClick={() => optionClicked(props.pollData._id, 4)}
            >
              {props.pollData.option4}
            </div>
          </div>
        </div>
        <hr style={{ height: "2px" }} />
        <div className="graph-div">
          <div className="right-ended-div">
            <img src="refresh.svg" alt="Refresh button" 
              onClick={() => props.refreshPoll(props.pollData._id)}
              className="refresh-button"/>
          </div>
          <p>
            {props.pollData.option1}--{props.pollData.option1_votes}
          </p>

          <p>
            {props.pollData.option2}--{props.pollData.option2_votes}
          </p>

          <p>
            {props.pollData.option3}--{props.pollData.option3_votes}
          </p>

          <p>
            {props.pollData.option4}--{props.pollData.option4_votes}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Poll;
