import { useEffect } from 'react';
import LaunchList from './LaunchList';
import SearchForm from './components/SearchForm';
import axios from 'axios';
import { useState } from 'react';

function App() {
  const [launches, setLaunches] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.spacexdata.com/v4/launches')
      .then((res) => setLaunches(res.data));
  }, []);

  console.log(launches);
  return (
    <main className='bg-slate-100 p-8'>
      <SearchForm />
      <LaunchList launches={launches} />
    </main>
  );
}

export default App;
