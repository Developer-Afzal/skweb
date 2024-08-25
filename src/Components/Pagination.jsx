import React from 'react'
import { Stack,  Col } from 'react-bootstrap'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const PaginationCompo = (props) => {
  const {currentPage, PageChange, count} = props
  const NextPage = ()=>{
    PageChange(Number(currentPage) + 1)
  }
  const PrevPage = ()=>{
    PageChange(Number(currentPage) - 1)
  }
  const DirectChange = (value)=>{
    PageChange(Number(value))
  }
  return (
    <Stack spacing={2} className='mt-2 pe-3 justify-content-end' direction='row'>
       <Col className='_flex justify-content-end'> 
       <button className='bg-transparent border-0' onClick={PrevPage} disabled={currentPage === 1 ? true : false }> <KeyboardDoubleArrowLeftIcon/></button>
       {currentPage > 1 ? <button className='px-2 border-0 rounded-2 ' onClick={()=> DirectChange(currentPage - 1)}>{currentPage - 1}</button> : null}
       <button className='px-2 border-0 rounded-2 page-active' onClick={()=> DirectChange(currentPage)}>{currentPage}</button>
        <button className='bg-transparent border-0' onClick={NextPage} disabled={count < 5 ? true : false }> <KeyboardDoubleArrowRightIcon color='success'/></button>
       </Col>
    </Stack> 
  )
}

export default PaginationCompo