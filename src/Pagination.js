import React from 'react'

export default function Pagination({goToNextPage,goToPrevPage}) {
    return (
        <div>
          {goToNextPage && <button onClick={goToNextPage}>Next</button> }
           {goToPrevPage &&  <button onClick={goToPrevPage}>Previous</button>}
        </div>
    )
}
