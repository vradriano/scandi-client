import { useState } from "react"
import { useNavigate } from "react-router-dom";

import { DefaultTemplate } from "../../templates/DefaultTemplate"
import { FormValues, ErrorsValues, ProductTypeErrors } from "../../interfaces/ProductPage"
import { typeDescription } from "../../utils/typeDescription"
import { productTypeValues, typeSwitcherFields } from "../../utils/ScandiWebConstants"
import "./ProductPage.sass"

function ProductPage() {
  const navigate = useNavigate(); 

  const [formValues, setFormValues] = useState<FormValues>({
    sku: "",
    name: "",
    price: "",
    typeSwitcher: "DVD",
    size: ""
  })
  const [errors, setErrors] = useState<ErrorsValues>({})

  function handleChangeValues(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target

    const errorsUpdated = validateIfDataIsValid(name, value)

    if(
        (errorsUpdated && errorsUpdated[name]?.hasError && errorsUpdated[name].errorType === "required-data") 
      ) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: {
          hasError: false,
          errorType: ""
        },
      }))    
    }

    name === "typeSwitcher"
      ? (
          setFormValues(prevFormValues => ({
            sku: prevFormValues.sku,
            name: prevFormValues.name,
            price: prevFormValues.price,
            typeSwitcher: value,
            ...productTypeValues[value]
          })),
          setErrors(prevErrors => ({
            sku: prevErrors.sku,
            name: prevErrors.name,
            price: prevErrors.price,
          }))
        )
      : setFormValues(prevFormValues => ({ ...prevFormValues, [name]: value }))
  }

  function validateIfDataIsValid(name: string, value: string) {
    const furnitureOptions: Record<string, boolean> = {
      price: true,
      size: true,
      weight: true,
      height: true,
      width: true,
      length: true
    }

    if (furnitureOptions[name]) {
      if (isNaN(Number(value)) || !value.trim())   {
        setErrors(prevErrors => ({
          ...prevErrors,
          [name]: {
            hasError: true,
            errorType: "invalid-data-type"
          }
        }))
        return
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          [name]: {
            hasError: false,
            errorType: ""
          }
        }))
      }
    }
  
    return errors
  }

  function validateIfHasEmptyFields() {
    const hasEmptyItem = Object.keys(formValues).some(item => !formValues[item])
    let hasError = false

    if(hasEmptyItem) {
      hasError = true

      Object.entries(formValues).map((values) => {

        !values[1] && setErrors(prevErrors => ({
          ...prevErrors,
          [values[0]]: {
            hasError: true,
            errorType: "required-data"
          }
        }))
      })
    } 
    
    return hasError
  }

  function handleSubmit() {
    const hasEmptyFields = validateIfHasEmptyFields()
    const hasInvalidData = Object.keys(errors).some(item => errors[item]?.hasError)

    if(hasEmptyFields || hasInvalidData) return

    
    navigate("/");
  }

  function renderErrorMessage(error: ProductTypeErrors[string]) {
    if (error?.hasError) {
      return error?.errorType === "invalid-data-type" 
        ? <span className="errorMessage">Please, provide the data of indicated type</span>
        : <span className="errorMessage">Please, submit required data</span>;
    }
    return null;
  }

  return (
    <DefaultTemplate 
      title="Product Add" 
      leftButton="Save" 
      rightButton="Cancel"
      type="submit"
      handleUserAction={handleSubmit}
    >
      <div className="container">
        <form id="product_form" className="formContainer">
          <div>
            <div className="formWrapper">
              <label htmlFor="sku">SKU</label>
              <input
                id="sku"
                name="sku"
                type="text"
                onChange={handleChangeValues}
                required
              />
            </div>
            {renderErrorMessage(errors?.sku)}
          </div>
          
          <div>
            <div className="formWrapper">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                onChange={handleChangeValues}
                required
              />
            </div>
            {renderErrorMessage(errors.name)}
          </div>

          <div>
            <div className="formWrapper">
              <label htmlFor="price">Price ($)</label>
              <input
                id="price"
                name="price"
                type="text"
                onChange={handleChangeValues} 
                required
              />
            </div>
            {renderErrorMessage(errors.price)}
          </div>
          
          <div className="formSwitcherWrapper">
            <div className="formWrapper">
              <label htmlFor="productType">Type Switcher</label >
              <select
                id="productType"
                name="typeSwitcher"
                className="select-opt"
                value={formValues.typeSwitcher}
                onChange={handleChangeValues}
                required
              >
                <option value="DVD">DVD</option>
                <option value="Book">Book</option>
                <option value="Furniture">Furniture</option>
              </select>
            </div>
            {
              typeSwitcherFields[formValues.typeSwitcher].map(field => (
                <div>
                  <div key={field.name} className="formWrapper">
                    <label htmlFor={formValues.typeSwitcher}>{field.label}</label>
                    <input
                      id={formValues.typeSwitcher}
                      name={field.name}
                      type="text"
                      onChange={handleChangeValues}
                      required
                    />
                  </div>
                  {renderErrorMessage(errors[field.name])}
                </div>
              ))
            }

            <br />
            <b className="switcherDescription">
              {typeDescription[formValues.typeSwitcher]}
            </b>
          </div>
        </form>
      </div>  
    </DefaultTemplate>
  )
}

export default ProductPage
