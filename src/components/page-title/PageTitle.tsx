import React from 'react'
import nyanCat from './../asset/nyan-cat.gif'
import './PageTitle.css'

interface PageTitleInterface{
  pageName: string;
}

function PageTitle({pageName}:PageTitleInterface) {
  return (
    <div className='page-title-box'>
      <p className='page-title-text'>{pageName}</p>
      <img src={nyanCat} className="page-title-nyan-cat" alt="nyan-cat" />
    </div>
  )
}

export default PageTitle