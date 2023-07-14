import { useEffect, useState } from 'react';
import LaunchList from './LaunchList';
import SearchForm from './components/SearchForm';
import axios from 'axios';

function App() {
  const [launches, setLaunches] = useState([]);
  const [filteredLaunches, setFilteredLaunches] = useState(launches);
  const [searchString, setSearchString] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'https://api.spacexdata.com/v4/launches/query',
        {
          options: {
            limit: 10,
            page: page,
          },
        }
      );

      const data = await response.data;

      // Add the newly fetched launches to the existing array
      setLaunches((prevLaunches) => [...prevLaunches, ...data.docs]);
      // Set to true if there is a next page
      setHasNextPage(data.hasNextPage);
      // Add 1 to the page number
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isLoading]);

  // Render the list when searching.
  useEffect(() => {
    setIsLoading(true);

    const newFilteredLaunches = launches.filter((launch) => {
      return launch.name.toLocaleLowerCase().includes(searchString);
    });

    setFilteredLaunches(newFilteredLaunches);

    setIsLoading(false);
  }, [launches, searchString, isLoading]);

  const onSearchChange = (event) => {
    setIsLoading(true);
    const searchBoxString = event.target.value.toLocaleLowerCase();

    setSearchString(searchBoxString);
    setIsLoading(false);
  };

  return (
    <main className='bg-slate-100 p-8'>
      <header className='max-w-4xl mx-auto bg-white rounded-sm mb-4'>
        <SearchForm onChangeHandler={onSearchChange} />
      </header>
      <section className='max-w-4xl mx-auto bg-white rounded-sm'>
        <LaunchList
          launches={filteredLaunches}
          dataLength={filteredLaunches.length}
          next={fetchData}
          hasMore={hasNextPage}
          error={error}
        />
      </section>
    </main>
  );
}

export default App;
