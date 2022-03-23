import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroupAddon,
  InputGroup,
  Input,
  Button,
} from "reactstrap";
import { Style } from "./styles";

const names = [
  {
    id: 1,
    name: "test 01",
  },
  {
    id: 2,
    name: "test 02",
  },
  {
    id: 3,
    name: "test 03",
  },
];

const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : languages.filter(
        (lang) => lang.name.toLowerCase().slice(0, inputLength) === inputValue
      );
};

const getSuggestionValue = (suggestion) => suggestion.name;

const AutoSuggestCustom = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => {
    setDropdownOpen(true);
  };

  const onChange = (e, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  return <Style></Style>;
};

export default AutoSuggestCustom;
