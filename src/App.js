import { Component } from 'react';

import './App.css';
import SearchBox from "./components/SearchBox/SearchBox";
import CardList from "./components/CardList/CardList";


class App extends Component {

  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: ""
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => {
        this.setState(
          () => {
            return {monsters: users};
          },
          () => {
            // console.log(this.state);
          }
        )
      });
  }

  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return {searchField};
    });
  };

  render() {

    const { monsters, searchField } = this.state;
    const { onSearchChange } = this; // destructure this object

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    })

    return (
      <div className="App">
        <SearchBox className="search-box" placeholder="search monsters" onChangeHandler={onSearchChange} />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }

}

export default App;
