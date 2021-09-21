import React, { useState } from 'react';
import './searchCompagny.scss';
import { FilterContext } from '../../Context/FilterContext';
import SavedSearch from '../../Components/SavedSearch';
import CompaniesResults from '../../Components/CompaniesResults';
import { API_URL } from '../../Config/API_URL';
import FilterSystem from '../../Components/FilterSystem';

const SearchCompany = () => {

  const[url, setUrl] = useState(API_URL + 'companies?');
  
  return (
    <FilterContext.Provider value={{url , setUrl}}>
    <div className="container__search--companies">
      <FilterSystem />
      <div className="container--right">
        <div className="container__results--all">
          <CompaniesResults/>
          <SavedSearch />
        </div>
      </div>
    </div>
    </FilterContext.Provider>
  );
};

export default SearchCompany;
