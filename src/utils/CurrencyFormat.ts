export const CurrencyFormat = (num: number) => {
  return (
    new Intl.NumberFormat('en-IN', {
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num)
  )
}