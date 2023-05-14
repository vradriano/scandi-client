import { HeaderProps } from "../../interfaces/Header/Header"
import { useLocation } from "react-router-dom";

import './Header.sass'

export function Header({
  title,
  leftButton,
  rightButton,
  type,
  handleActionLeftButton,
  handleActionRightButton
}: HeaderProps
) {
  const location = useLocation();
  
  return (
    <header className="header">
      <h2>{title}</h2>

      <nav className="navigation">
        <button 
          onClick={handleActionLeftButton} 
          type={type} 
          className="button-left-side"
          >
          {leftButton}
        </button>

        <button 
          className="button-right-side"
          id={location.pathname === "/" ? "delete-product-btn" : ""}
          onClick={handleActionRightButton}
          type={type}
        >
          {rightButton}
        </button>
      </nav>
    </header>
  )
}