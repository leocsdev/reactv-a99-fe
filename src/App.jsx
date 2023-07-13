import { useEffect } from 'react';
import LaunchList from './LaunchList';
import SearchForm from './components/SearchForm';
import axios from 'axios';
import { useState } from 'react';

function App() {
  const [launches, setLaunches] = useState([]);
  const [filteredLaunches, setFilteredLaunches] = useState(launches);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    axios
      .get('https://api.spacexdata.com/v4/launches')
      .then((res) => setLaunches(res.data));
  }, []);

  useEffect(() => {
    const newFilteredLaunches = launches.filter((launch) => {
      return launch.name.toLocaleLowerCase().includes(searchString);
    });

    setFilteredLaunches(newFilteredLaunches);
  }, [launches, searchString]);

  const onSearchChange = (event) => {
    const searchBoxString = event.target.value.toLocaleLowerCase();

    setSearchString(searchBoxString);
  };

  return (
    <main className='bg-slate-100 p-8'>
      <SearchForm onChangeHandler={onSearchChange} />
      <LaunchList launches={filteredLaunches} />
    </main>
  );
}

export default App;
