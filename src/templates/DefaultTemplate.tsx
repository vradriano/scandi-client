import { Footer } from "../components/Footer";
import { Header } from "../components/Header"
import { HeaderProps } from "../interfaces/Header/Header"
import "./DefaultTemplate.sass"

interface DefaultTemplateProps extends HeaderProps {
  children: React.ReactNode;
}

export function DefaultTemplate ({ 
  title, 
  leftButton,
  rightButton, 
  handleActionLeftButton, 
  handleActionRightButton, 
  children 
}: DefaultTemplateProps) {
  return (
    <div>
      <Header
        title={title}
        leftButton={leftButton}
        rightButton={rightButton}
        handleActionLeftButton={handleActionLeftButton}
        handleActionRightButton={handleActionRightButton}
      />
      
        <main className="defaultContainer"> 
          {children}
        </main>
      
      <Footer />
    </div>
  )
}