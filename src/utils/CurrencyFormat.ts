export const CurrencyFormat = (num: number) => {
  return (
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(num)
  )
}