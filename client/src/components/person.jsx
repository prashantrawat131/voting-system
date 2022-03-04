function Person(props) {
  return (
    <div style={{"padding":"20px"}} onClick={()=>props.goToProfilePage(props.personEmail)}>
      <img style={{"display":"inline"}} className="searched-person-image" src="person.svg" alt="person" />
      <p style={{"display":"inline"}}>{props.personName}</p>
    </div>
  );
}

export default Person;
