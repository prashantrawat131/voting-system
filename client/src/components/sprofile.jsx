function Sprofile(props) {
  return (
    <div id="small-profile-div" onClick={()=>props.goToProfilePage(props.personEmail)}>
      <img id="small-profile-image" className="searched-person-image" src="person.svg" alt="person" />
      <p id="small-profile-name">{props.personName}</p>
    </div>
  );
}

export default Sprofile;
