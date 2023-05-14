import { CardProps } from '../../interfaces/Card'
import { CurrencyFormat } from '../../utils/CurrencyFormat'
import './Card.sass'

export function Card({
  id,
  sku,
  name,
  price,
  type,
  value,
  handleSelectProductToDelete
}: CardProps) {
  const attributeValues: {
    [key: string]: string;
  } = {
    DVD: `Size: ${value} MB`,
    Book: `Weight: ${value} KG`,
    Furniture: `Dimension: ${value}`
  }

  return (
    <article className="cardContainer">
      <input
        type="checkbox"
        className="delete-checkbox"
        onClick={() => handleSelectProductToDelete(sku, id)}
      />
        <section className="infoContainer">
          <ul>
            <li>{sku}</li>
            <li>{name}</li>
            <li>{CurrencyFormat(price)}</li>
            <li>{attributeValues[type]}</li>
          </ul>
        </section>
    </article>
  )
}
