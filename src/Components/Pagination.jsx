import React from 'react'

const Pagination = () => {
  return (
    <Stack spacing={2} className='mt-2 pe-3' direction='row' justifyContent="flex-end">
    <Pagination page={currentPage} siblingCount={2} count={Math.ceil(userData.length/5)} onChange={handlePageChange} className='pagination'/>
    </Stack> 
  )
}

export default Pagination