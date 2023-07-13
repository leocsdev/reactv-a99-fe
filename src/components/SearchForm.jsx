export default function SearchForm({ onChangeHandler }) {
  return (
    <div className='max-w-4xl mx-auto mb-4 bg-white rounded-sm p-2 '>
      <input
        onChange={onChangeHandler}
        placeholder='Enter keywords'
        className='w-full p-2'
      />
    </div>
  );
}
