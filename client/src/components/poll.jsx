import { useState } from "react";
import Result from "./result";
import Option from "./option";

function Poll(props) {
  const [selected, setSelected] = useState(-1);
  const style = { backgroundColor: "#90EE90" };
  const noStyle = {};
  const pollCreationDate = new Date(props.pollData.date);

  // calculatePercentages();

  const data = [
    { name: "Option A", value: props.pollData.option1_votes, text:props.pollData.option1 },
    { name: "Option B", value: props.pollData.option2_votes, text:props.pollData.option2 }, 
    { name: "Option C", value: props.pollData.option3_votes, text:props.pollData.option3 },
    { name: "Option D", value: props.pollData.option4_votes, text:props.pollData.option4 },
  ];

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
      });
  }

  return (
    <div className="card mx-auto poll">
      <div className="card-body container-fluid poll-div">
        <div className="row poll-creator-name-div">
          <div className="col">{props.pollData.creator}</div>
          <div className="col date-div">
            {pollCreationDate.getDate()}/{pollCreationDate.getMonth()}/
            {pollCreationDate.getFullYear()}
          </div>
          <div className="col time-div">
            {pollCreationDate.getHours()}:{pollCreationDate.getMinutes()}
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-lg-6 col-12">
            <div className="row">
              <p>{props.pollData.poll_title}</p>
            </div>
            <div className="row">
              <div>
                {data.map((option, index) => {
                  return (
                    <Option
                      poll_id={props.pollData._id}
                      optionText={option.text}
                      optionClicked={optionClicked}
                      style={style}
                      noStyle={noStyle}
                      selected={selected}
                      optionNumber={index + 1}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-12">
            <Result data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Poll;
