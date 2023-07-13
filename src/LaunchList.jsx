export default function LaunchList({ launches }) {
  return (
    <ul>
      {launches.map((launch) => (
        <li
          key={launch.name}
          className='flex p-8 items-center max-w-4xl mx-auto bg-white rounded-md'
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
  );
}
