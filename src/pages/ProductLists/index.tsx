import { useNavigate } from "react-router-dom";
import { Card } from "../../components/Card"
import { DefaultTemplate } from "../../templates/DefaultTemplate"
import "./ProductList.sass"

function ProductList() {
  const navigate = useNavigate();

  function handleRedirect() {
    navigate("/add-product")
  }
  
  return (
    <DefaultTemplate 
      title="Product List" 
      leftButton="ADD" 
      rightButton="MASS DELETE"
      type="button"
      handleUserAction={handleRedirect}
    >
      <div className="container">
        <Card
          key={123}
          sku="Wooden Table" 
          name="Wooden Chair"
          price={123}
          specificAttributes="10x20x30"
        />     
      </div>  
    </DefaultTemplate>
  )
}

export default ProductList
