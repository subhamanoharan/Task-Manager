import { useState } from 'react';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Dropdown = ({options, onOptionSelected, selectedOption, title: TitleComp}) => {
  const [isOpen, setIsOpen] = useState("");

  const toggleDropdown = () => setIsOpen(!isOpen)

  const onOptionClick = (o) => {
    setIsOpen(!isOpen)
    onOptionSelected(o)
  }

  const onClear = (e) => {
    setIsOpen(false)
    onOptionSelected()
  }

  return (<div className="relative inline-block text-left m-1">
    <div>
      <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
        {selectedOption ? <>
          <p>{selectedOption}</p>
          <span className="px-1 text-red-400">
            <FontAwesomeIcon icon={faTimes} onClick={onClear}/>
          </span>
          </> : <TitleComp onClick={toggleDropdown} />}
        <span className=" text-center" onClick={toggleDropdown} >
          <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </span>
      </button>
    </div>
    {isOpen && <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
      <div className="py-1" role="none">
        {options.map((o, i) => (
          <p
            className={`ml-2 ${selectedOption === o ? 'text-black': ''}`}
            key={o}
            tabIndex="-1"
            onClick={() => onOptionClick(o)}
            id={"menu-item-" + i}>
            {o}
          </p>
        ))}
      </div>
    </div>}
  </div>
  )
}

export default Dropdown;
