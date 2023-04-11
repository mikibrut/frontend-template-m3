import React, {useState} from 'react'
import './Search.css';
import { FaSearch } from 'react-icons/fa';

export default function Search(props) {
  const { handleSearchValue } = props;
  const [expanded, setExpanded] = useState(false);

  const handleChange = (e) => {
    handleSearchValue(e.target.value)
  }

  const handleExpand = () => {
    setExpanded(!expanded);
  }

  return (
    <div className="search-container">
      <button className="search-button" onClick={handleExpand}>
        <FaSearch />
      </button>
      {expanded && (
        <div className="search-input-container">
           <input type="text" name="search" onChange={handleChange} placeholder="Search" />
        </div>
      )}
    </div>
  );
}