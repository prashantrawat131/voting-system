function CreatePoll(props) {
  function generatePoll() {
    const poll_title = document.getElementById("poll_title").value;
    const option1 = document.getElementById("poll_option1").value;
    const option2 = document.getElementById("poll_option2").value;
    const option3 = document.getElementById("poll_option3").value;
    const option4 = document.getElementById("poll_option4").value;
    console.log("User trying to generate poll: "+props.username);
    fetch("/generatePoll", {
      method: "POST",
      body: JSON.stringify({
        poll_title,
        option1,
        option2,
        option3,
        option4,
        username:props.username
      }),
      headers: { "Content-type": "application/json;charset=UTF-8" },
    })
      .then((res) => res.text())
      .then((data) => {
          if(data==="Poll created"){
            alert("Poll created");
          }
          else{
              alert("Failed to create poll");
          }
          props.setAppState(2);
      });
  }

  function close() {
    props.setAppState(2);
  }

  return (
    <div>
      <label htmlFor="poll_title">Enter the title of the poll</label>
      <br />
      <input type="text" id="poll_title" />
      <br />
      <br />

      <label htmlFor="poll_option1">Enter option 1</label>
      <br />
      <input type="text" id="poll_option1" />
      <br />
      <br />

      <label htmlFor="poll_option1">Enter option 2</label>
      <br />
      <input type="text" id="poll_option2" />
      <br />
      <br />

      <label htmlFor="poll_option1">Enter option 3</label>
      <br />
      <input type="text" id="poll_option3" />
      <br />
      <br />

      <label htmlFor="poll_option1">Enter option 4</label>
      <br />
      <input type="text" id="poll_option4" />
      <br />
      <br />

      <button onClick={generatePoll} id="generate_poll_button">
        Generate poll
      </button>
      <button onClick={close}>Close</button>
    </div>
  );
}

export default CreatePoll;
