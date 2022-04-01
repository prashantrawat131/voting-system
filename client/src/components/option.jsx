function Option(props) {
  return (
    <div
      className="col option"
      style={props.selected === props.optionNumber ? props.style : props.noStyle}
      onClick={() => props.optionClicked(props.poll_id, props.optionNumber)}
    >
      {props.optionText}
    </div>
  );
}

export default Option;
