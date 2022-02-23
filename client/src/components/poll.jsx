function Poll(props) {
  const pollJson=props.poll;

  return (
    <div>
      <p>Poll</p>
      <p>{pollJson.poll_title}</p>
      <br />
      <br />
      <div class="container">
        <div class="row">
          <div class="col">{pollJson.option1}</div>
          <div class="col">{pollJson.option2}</div>
          <div class="w-100"></div>
          <div class="col">{pollJson.option3}</div>
          <div class="col">{pollJson.option4}</div>
        </div>
      </div>
    </div>
  );
}

export default Poll;