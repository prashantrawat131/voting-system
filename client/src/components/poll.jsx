function Poll(props) {
  return (
    <div>
      <p>props.data.poll_title</p>
      <br />
      <br />
      <div class="container">
        <div class="row">
          <div class="col">props.data.option1</div>
          <div class="col">props.data.option2</div>
          <div class="w-100"></div>
          <div class="col">props.data.option3</div>
          <div class="col">props.data.option4</div>
        </div>
      </div>
    </div>
  );
}

export default Poll;