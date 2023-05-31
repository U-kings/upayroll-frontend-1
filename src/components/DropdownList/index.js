import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  DropDownContainer,
  DropDownListContainer,
  DropDownHeader,
  ListItem,
  DropDownList,
} from "../../styles/library";

const DropdownList = ({
  list,
  isOpen,
  toggling,
  selectedOption,
  dataSet,
  onOptionClicked,
  text,
  cssClass,
  cssClass2,
  cssClass3,
  payheadDropdown,
  maxHeight,
}) => {
  return list ? (
    <DropDownContainer className={cssClass3}>
      <DropDownHeader onClick={toggling} className={cssClass2}>
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
        <DropDownListContainer>
          <DropDownList style={{ height: maxHeight ? maxHeight : "auto" }}>
            {dataSet?.map((data) => (
              <ListItem
                onClick={
                  payheadDropdown
                    ? (e) => onOptionClicked(data)
                    : onOptionClicked(data)
                }
                key={data?.id}
              >
                {data?.name}
              </ListItem>
            ))}
          </DropDownList>
        </DropDownListContainer>
      )}
    </DropDownContainer>
  ) : (
    <DropDownContainer className={cssClass3}>
      <DropDownHeader onClick={toggling} className={cssClass2}>
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
                onClick={onOptionClicked(data)}
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
