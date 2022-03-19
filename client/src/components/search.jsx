import { useState } from "react";
import Sprofile from "./sprofile";
import Profile from "./profile";

function Search(props) {
  const [peopleList, setPeopleList] = useState([]);
  const [searchMessage, setSearchMessage] = useState("");
  const [searchState, setSearchState] = useState(0);
  const [selectedPersonPolls, setSelectedPersonPolls] = useState([]);
  const [selectedPersonData, setSelectedPersonData] = useState({});

  function goToProfilePage(personEmail) {
    //chaning state to show user profile
    setSearchState(1);

    console.log(
      "Saving data: " +
        peopleList.find((person) => person.email === personEmail)
    );

    //setting select persons data
    setSelectedPersonData(
      peopleList.find((person) => person.email === personEmail)
    );

    //searching for polls and setting them for the selected person
    fetch("/getUserPolls?personEmail=" + personEmail)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          console.log("Selected person poll data: " + JSON.stringify(data));
        } else {
          setSelectedPersonPolls(data);
        }
      });
  }

  function performSearch() {
    const searchInput = document.getElementById("search_input").value;
    fetch("/search?searchInput=" + searchInput)
      .then((res) => res.json())
      .then((data) => {
        console.log("Search data: " + JSON.stringify(data));
        if (data.message) {
          setSearchMessage(data.message);
        } else {
          setPeopleList(data);
          setSearchMessage("");
        }
      });
  }

  function goToSearch() {
    setSearchState(0);
  }

  return (
    <div id="search-div">
      {searchState === 0 && (
        <div>
          <input type="text" id="search_input" />
          <img
            id="search-button"
            src="./search.svg"
            alt="Search button"
            onClick={performSearch}
          />

          {peopleList.map((person) => {
            return (
              <Sprofile
                goToProfilePage={goToProfilePage}
                personEmail={person.email}
                personName={person.name}
              />
            );
          })}

          <p>{searchMessage}</p>
        </div>
      )}

      {searchState === 1 && (
        <Profile
          goToSearch={goToSearch}
          selectedPersonData={selectedPersonData}
          selectedPersonPolls={selectedPersonPolls}
          setSelectedPersonPolls={setSelectedPersonPolls}
        />
      )}
    </div>
  );
}

export default Search;
