function Option(props) {
  const optionAlpha = String.fromCharCode(props.optionNumber+64);

  return (
    <div
      className="col option"
      style={
        props.selected === props.optionNumber ? props.style : props.noStyle
      }
      onClick={() => props.optionClicked(props.poll_id, props.optionNumber)}
    >
      <div className="container">
        <div className="row">
          <div className="col-1 option_alpha">{optionAlpha}</div>
          <div className="col-11">{props.optionText}</div>
        </div>
      </div>
    </div>
  );
}

export default Option;
