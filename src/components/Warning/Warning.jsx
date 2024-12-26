import React from 'react'
import { Button } from '../Button/Button'
import './Warning.css'

export const Warning = ({ text, onClick, onClose }) => {

  return (
    <>
        <div className='warningDiv'>
            <p className='warningText'>{ text }</p>
        <div className='yesOrNo'>
            <Button
                type="button"
                text="SI"
                colorText="white"
                width="100px"
                padding="10px"
                backgroundColor="var(--color-aubergine)"
                hoverBackgroundColor="var(--color-barbiePink)"
                tapBackgroundColor="var(--color-pushTheButton)"
                onClick={onClick}
            />
            <Button
                type="button"
                text="NO"
                colorText="white"
                width="100px"
                padding="10px"
                backgroundColor="var(--color-aubergine)"
                hoverBackgroundColor="var(--color-barbiePink)"
                tapBackgroundColor="var(--color-pushTheButton)"
                onClick={onClose}
                >
            </Button>
            </div>
        </div>
    </>
  )
}
