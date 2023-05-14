import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/Card"
import { DefaultTemplate } from "../../templates/DefaultTemplate"
import { ScandiWebApi } from "../../utils/ScandiWebApi";
import { ProductsDataProps } from "../../interfaces/ProductLists";
import "./ProductList.sass"

function ProductList() {
  const navigate = useNavigate();
  const [productsData, setProductsData] = useState<ProductsDataProps[]>();
  const [skusIdsToDelete, setSkusIdsToDelete] = useState<Array<string>>([]);
  
  function handleRedirect() {
    navigate("/add-product")
  }

 const loadProductsData = useCallback( () => {
    ScandiWebApi.get('/products')
      .then(response => {
        setProductsData(response.data)
    })
  }, [])

  useEffect(() => loadProductsData(), [loadProductsData])

  function handleSelectProductToDelete(id: string) {
    if(skusIdsToDelete.includes(id)) {
      setSkusIdsToDelete(skusIdsToDelete.filter(skuId => skuId !== id));
    } else {
      setSkusIdsToDelete(prevIds => ([...prevIds, id]));
    }
  }

  async function handleDeleteSelectedSKUs() {
    /* 
      I'm not sure which method is better (POST or DELETE), 
      so I chose the 'semantic' way as I couldn't find a document to help me.
    */
    const skusIds = skusIdsToDelete.join(',')
    
    await ScandiWebApi.delete(`/products?skus=${skusIds}`)

    setSkusIdsToDelete([])
    loadProductsData();
  }
  
  
  return (
    <DefaultTemplate 
      title="Product List" 
      leftButton="ADD" 
      rightButton="MASS DELETE"
      type="button"
      handleActionLeftButton={handleRedirect}
      handleActionRightButton={handleDeleteSelectedSKUs}
    >
      <div className="container">
        {
          productsData && productsData.map((product: ProductsDataProps) => {
            return (
              <Card
                key={product.sku}
                id={product.id}
                sku={product.sku} 
                name={product.name}
                price={product.price}
                type={product.type}
                value={product.value}
                handleSelectProductToDelete={handleSelectProductToDelete}
              />     
            )
          }) 
        }
      </div>  
    </DefaultTemplate>
  )
}

export default ProductList
