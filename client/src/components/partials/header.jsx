function Header(props){

  function showPollCreation(){
      props.setAppState(3);
  }

  return <div>
    <h1>Header</h1>
    <button onClick={showPollCreation}>Create poll</button>
  </div>;
}

export default Header;
