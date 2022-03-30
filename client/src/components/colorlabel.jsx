function ColorLabel(props) {
  return (
    <div>
      <input className="color-input" type={"color"} value={props.color} disabled={true} />
      <p className="color-label-para">{props.text}</p>
    </div>
  );
}

export default ColorLabel;
