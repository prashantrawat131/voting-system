function Poll(props) {
  function optionClicked(poll_id, optionNumber) {
    // console.log("Poll id: " + poll_id + "\toption number: " + optionNumber);
    fetch("/vote", {
      method: "POST",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify({
        poll_id,
        optionNumber,
        voter_id: props.username,
      }),
    })
      .then((res) => res.text())
      .then((data) => {
        console.log("After voting data: " + data);
      });
  }

  const pollJson = props.data;

  return (
    <div>
      {/* <p>Poll</p> */}
      <div className="container">
        <div className="row">
          <p>{pollJson.poll_title}</p>
        </div>
        <div className="row">
          <div className="col" onClick={() => optionClicked(pollJson._id, 1)}>
            {pollJson.option1}
          </div>
          <div className="col" onClick={() => optionClicked(pollJson._id, 2)}>
            {pollJson.option2}
          </div>
        </div>
        <div className="row">
          <div className="col" onClick={() => optionClicked(pollJson._id, 3)}>
            {pollJson.option3}
          </div>
          <div className="col" onClick={() => optionClicked(pollJson._id, 4)}>
            {pollJson.option4}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Poll;
