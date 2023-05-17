import React, { type FC } from 'react'
import './index.css'
import { SmileTwoTone } from '@ant-design/icons'

const Spinner: FC = () => {
  return (
    <div className='spin-container'>
      <SmileTwoTone
        style={{
          fontSize: 50
        }}
        spin
      />
    </div>
  )
}

export default Spinner
