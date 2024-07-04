import { useState } from 'react';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux'

import { selectAllStatus } from '@/redux/reducers/statusSlice'
import { setStatusTaskFilter, selectStatusFilter } from '@/redux/reducers/tasksSlice'

import Dropdown from './dropdown'

const FilterTasks = ({ onSuccess }) => {
  const dispatch = useDispatch()

  const status_options = useSelector(selectAllStatus)
  const selectedOption = useSelector(selectStatusFilter)

  const onFilterBy = (o) => dispatch(setStatusTaskFilter(o))
  console.log('selectedOption', selectedOption)
  return (
    <Dropdown
      title={() => (<FontAwesomeIcon icon={faFilter}/>)}
      options={status_options}
      onOptionSelected={onFilterBy}
      selectedOption={selectedOption}
    />
  )
}

export default FilterTasks;
