import React from 'react'

interface Props {
  style?: React.CSSProperties
  content: React.ReactNode | string
  onClick?: () => void
  disabled?: boolean
}

const Button: React.FC<Props> = ({
   style = {
    border: 'none',
    backgroundColor: '#3369F3',
    color: 'white',
    height: '40px',
    borderRadius: '8px',
    width: '200px',
    cursor: 'pointer'
  },
  content,
  onClick,
  disabled = false,
}) => {

  
  return (
    <button onClick={onClick} style={style} disabled={disabled}>
      {content}
    </button>
  )
}

export default Button
