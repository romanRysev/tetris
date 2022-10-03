import React from 'react'
import './Button.scss'

interface Props {
  className?: string
  content: React.ReactNode | string
  onClick?: () => void
  disabled?: boolean
}

const Button: React.FC<Props> = ({
  className,
  content,
  onClick,
  disabled = false,
}) => {

  
  return (
    <button onClick={onClick} className={`button button_theme_light ${className}`} disabled={disabled}>
      {content}
    </button>
  )
}

export default Button
