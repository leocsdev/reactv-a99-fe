import InfiniteScroll from 'react-infinite-scroll-component';

export default function LaunchList({
  launches,
  dataLength,
  next,
  hasMore,
  error,
}) {
  return (
    <div className='flex flex-col items-center'>
      <InfiniteScroll
        dataLength={dataLength}
        next={next}
        hasMore={hasMore}
        loader={<img src='/spinner.gif' className='w-24 mx-auto' />}
        endMessage={
          <p className='text-center p-4 text-slate-400'>No more data to load</p>
        }
        className=''
      >
        <ul>
          {launches.map((launch, index) => (
            <li
              key={`${launch.payloads[0]}-${index}`}
              className='flex p-8 items-center'
            >
              <img
                src={launch.links.patch.small}
                width='120px'
                alt={launch.name}
                className='pr-2 mr-4'
              />
              <div>
                <h2 className='text-xl mb-2'>
                  {launch.flight_number}: {launch.name} (
                  {launch.date_local.slice(0, 4)})
                </h2>
                <p>{launch.details}</p>
              </div>
            </li>
          ))}
        </ul>
      </InfiniteScroll>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
