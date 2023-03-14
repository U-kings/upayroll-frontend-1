import React, { useRef } from "react";

const SearchBar = ({ term, searchKeyWord }) => {
  const inputEl = useRef("");
  const getSearchTerm = () => {
    searchKeyWord(inputEl.current.value);
  };
  return (
    <>
      <input
        ref={inputEl}
        type="text"
        className="search__input"
        placeholder="Search..."
        value={term}
        onChange={getSearchTerm}
      />
    </>
  );
};

export default SearchBar;
