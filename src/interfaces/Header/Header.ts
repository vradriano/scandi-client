export interface HeaderProps {
  title: string;
  leftButton: string;
  rightButton: string;
  type?: "button" | "submit" | "reset";
  handleUserAction?: () => void;
}