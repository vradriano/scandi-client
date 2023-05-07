import { Footer } from "../components/Footer";
import { Header } from "../components/Header"
import { HeaderProps } from "../interfaces/Header/Header"
import "./DefaultTemplate.sass"

interface DefaultTemplateProps extends HeaderProps {
  children: React.ReactNode;
}

export function DefaultTemplate ({ title, leftButton, rightButton, handleUserAction, children }: DefaultTemplateProps) {
  return (
    <div>
      <Header
        title={title}
        leftButton={leftButton}
        rightButton={rightButton}
        handleUserAction={handleUserAction}
      />
      
        <main className="defaultContainer"> 
          {children}
        </main>
      
      <Footer />
    </div>
  )
}