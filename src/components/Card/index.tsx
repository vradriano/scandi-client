import { CardProps } from '../../interfaces/Card'
import { CurrencyFormat } from '../../utils/CurrencyFormat'
import './Card.sass'

export function Card({ sku, name, price, specificAttributes }: CardProps) {
  return (
    <article className="cardContainer">
      <input type="checkbox" className="delete-checkbox" />
        <section className="infoContainer">
          <ul>
            <li>{sku}</li>
            <li>{name}</li>
            <li>{CurrencyFormat(price)} $</li>
            <li>Dimension: {specificAttributes}</li>
          </ul>
        </section>
    </article>
  )
}
