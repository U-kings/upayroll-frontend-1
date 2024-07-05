import React, { useRef } from "react";

const SearchBar = ({ term, searchKeyWord }) => {
  const inputEl = useRef(null);
  const getSearchTerm = () => {
    searchKeyWord(inputEl.current.value);
    // searchKeyWord(inputEl.current.value);
  };
  return (
    <>
      <input
        style={{ width: "100%" }}
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
