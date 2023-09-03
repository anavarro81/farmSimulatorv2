import React from 'react'

const SearchText = ({search}) => {
    const handleChange = (event) => {
        const {value} = event.target;
        search(value);
    }
  return (
    
    <div>
    <input className="search" type="text" name="filter" placeholder="Buscar..." onChange={handleChange} />
    </div>
  )
}

export default SearchText

