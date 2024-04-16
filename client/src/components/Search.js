function Search({ searchTerm, onSearchChange }) {
    return (
      <div className="searchbar">
        <label htmlFor="search">Search Fitness Activities:</label>
        <input
          type="text"
          id="search"
          placeholder="Type a title to search..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    );
  }
  
  export default Search;