import React from 'react'

interface isHrLine{
    className?:any
}

const HrLine = ({className}: isHrLine) => {
  return (
    <div className={'border-b-[1px] border-solid border-grey-200' + className}></div>
  )
}

export default HrLine