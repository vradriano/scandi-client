export interface CardProps {
  id: number;
  sku: string;
  name: string;
  price: number;
  type: string;
  value: string;
  handleSelectProductToDelete: (sku: string, id: number) => void;
}