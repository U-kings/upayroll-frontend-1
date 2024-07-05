import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useState } from "react";
import {
  DropDownContainer,
  DropDownListContainer,
  DropDownHeader,
  ListItem,
  DropDownList,
} from "../../styles/library";
import SearchBar from "../SearchBar";
import { COLORS } from "../../values/colors";

const DropdownList = ({
  list,
  // isOpen,
  // toggling,
  selectedOption,
  dataSet,
  onOptionClicked,
  text,
  cssClass,
  cssClass2,
  cssClass3,
  payheadDropdown,
  maxHeight,
  disable,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const keyUphandler = () => {};

  const toggling = () => {
    setIsOpen(!isOpen);
  };

  const filteredData = useCallback(
    (value) => {
      if (value !== "") {
        const filteredList = dataSet?.filter((data) => {
          return Object.values(data?.name)
            .join("")
            .toLowerCase()
            .includes(value?.toLowerCase());
        });
        setSearchResult(filteredList);
      } else {
        setSearchResult(dataSet);
      }
    },
    [dataSet]
  );

  const searchHandler = useCallback(
    (searchTerm) => {
      setSearchTerm(searchTerm);
      filteredData(searchTerm);
    },
    [filteredData]
  );

  const onOptionClickedFunc = (data) => {
    onOptionClicked(data);
    setSearchTerm("");
    toggling();
  };

  return list ? (
    <DropDownContainer className={cssClass3}>
      <DropDownHeader
        onClick={disable ? () => {} : toggling}
        className={cssClass2}
      >
        {selectedOption?.name || text}
        <span className="dropdown__icon">
          {isOpen ? (
            <FontAwesomeIcon icon={["fas", "angle-up"]} />
          ) : (
            <FontAwesomeIcon icon={["fas", "angle-down"]} />
          )}
        </span>
      </DropDownHeader>
      {isOpen && (
        <>
          {/* <input
            type="text"
            placeholder="search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyUp={keyUphandler}
          /> */}
          <DropDownListContainer>
            <DropDownList style={{ height: maxHeight ? maxHeight : "auto" }}>
              {isOpen && (
                <div
                  style={{
                    padding: ".3rem .5rem",
                    backgroundColor: COLORS?.white3,
                  }}
                  onClick={() => setIsOpen(true)}
                >
                  <SearchBar term={searchTerm} searchKeyWord={searchHandler} />
                </div>
              )}
              {(searchTerm ? searchResult : dataSet)?.map(
                // {(searchResult?.length > 0 ? searchResult : dataSet)?.map(
                (data) => (
                  <ListItem
                    onClick={
                      () => onOptionClickedFunc(data)
                      // payheadDropdown
                      //   ? () => onOptionClickedFunc(data)
                      //   : () => onOptionClickedFunc2(data)
                    }
                    key={data?.id}
                  >
                    {data?.name}
                  </ListItem>
                )
              )}
            </DropDownList>
          </DropDownListContainer>
        </>
      )}
    </DropDownContainer>
  ) : (
    <DropDownContainer className={cssClass3}>
      <DropDownHeader
        onClick={disable ? () => {} : toggling}
        className={cssClass2}
      >
        {selectedOption || text}
        <span className="dropdown__icon">
          {isOpen ? (
            <FontAwesomeIcon icon={["fas", "angle-up"]} />
          ) : (
            <FontAwesomeIcon icon={["fas", "angle-down"]} />
          )}
        </span>
      </DropDownHeader>
      {isOpen && (
        <DropDownListContainer>
          <DropDownList>
            {dataSet?.map((data, indexes) => (
              <ListItem
                onClick={() => onOptionClickedFunc(data)}
                key={++indexes}
                className={!cssClass ? "" : cssClass(data)}
              >
                {data}
              </ListItem>
            ))}
          </DropDownList>
        </DropDownListContainer>
      )}
    </DropDownContainer>
  );
};

export default DropdownList;
