import Cookies from "universal-cookie";
const cookies=new Cookies();
function CreatePoll(props) {
  function generatePoll() {
    const poll_title = document.getElementById("poll_title").value;
    const option1 = document.getElementById("poll_option1").value;
    const option2 = document.getElementById("poll_option2").value;
    const option3 = document.getElementById("poll_option3").value;
    const option4 = document.getElementById("poll_option4").value;
    console.log("User trying to generate poll: " + props.username);
    fetch("/generatePoll", {
      method: "POST",
      body: JSON.stringify({
        poll_title,
        option1,
        option2,
        option3,
        option4,
        username: cookies.get("loggedInUserEmail"),
      }),
      headers: { "Content-type": "application/json;charset=UTF-8" },
    })
      .then((res) => res.text())
      .then((data) => {
        if (data === "Poll created") {
          alert("Poll created");
        } else {
          alert("Failed to create poll");
        }
        props.setAppState(2);
      });
  }

  function close() {
    props.setAppState(2);
  }

  return (
    <div className="card mx-auto create-poll-div">
      <div className="card-body">
        <div style={{ textAlign: "end", marginBottom: "10px" }}>
          <button type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <label htmlFor="poll_title">Enter the title of the poll</label>
        <br />
        <input className="form-control" type="text" id="poll_title" />
        <br />

        <label htmlFor="poll_option1">Enter option 1</label>
        <br />
        <input className="form-control" type="text" id="poll_option1" />
        <br />

        <label htmlFor="poll_option1">Enter option 2</label>
        <br />
        <input className="form-control" type="text" id="poll_option2" />
        <br />

        <label htmlFor="poll_option1">Enter option 3</label>
        <br />
        <input className="form-control" type="text" id="poll_option3" />
        <br />

        <label htmlFor="poll_option1">Enter option 4</label>
        <br />
        <input className="form-control" type="text" id="poll_option4" />
        <br />

        <button
          className="btn btn-warning"
          onClick={generatePoll}
          id="generate_poll_button"
        >
          Generate poll
        </button>
        <button
          style={{ "margin-left": "10px" }}
          className="btn btn-warning"
          onClick={close}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default CreatePoll;
