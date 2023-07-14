export default function SearchForm({ onChangeHandler }) {
  return (
    <input
      onChange={onChangeHandler}
      placeholder='Enter keywords'
      className='w-full p-2'
    />
  );
}
