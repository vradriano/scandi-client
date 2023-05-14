import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { DefaultTemplate } from "../../templates/DefaultTemplate"
import { FormValues, ErrorsValues, ProductTypeErrors, TypeValueMap } from "../../interfaces/ProductPage"
import { typeDescription } from "../../utils/typeDescription"
import { productTypeValues, typeSwitcherFields } from "../../utils/ScandiWebConstants"
import { ScandiWebApi } from "../../utils/ScandiWebApi";
import "./ProductPage.sass"
import { CurrencyFormat } from "../../utils/CurrencyFormat";

function ProductPage() {
  const navigate = useNavigate(); 

  const [formValues, setFormValues] = useState<FormValues>({
    sku: "",
    name: "",
    price: "",
    typeSwitcher: "",
  })
  const [errors, setErrors] = useState<ErrorsValues>({})
  
  function handleRedirectToHome() {
    navigate("/")
  }

  function handleChangeValues(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target
  
    const errorsUpdated = validateIfDataIsValid(name, value)
  
    if (
      errorsUpdated &&
      errorsUpdated[name]?.hasError &&
      (errorsUpdated[name].errorType === "required-data" || errorsUpdated[name].errorType === "sku-exists")
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: {
          hasError: false,
          errorType: "",
        },
      }))
    }

    if (name === "price") {
      const inputPrice = value.replace(/[^\d]/g, "");
  
      const formattedPrice = CurrencyFormat(Number(inputPrice) / 100) 
  
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [name]: formattedPrice,
      }));
    } else if (name === "typeSwitcher") {
      setFormValues((prevFormValues) => ({
        sku: prevFormValues.sku,
        name: prevFormValues.name,
        price: prevFormValues.price,
        typeSwitcher: value,
        ...productTypeValues[value],
      }))
      setErrors((prevErrors) => ({
        sku: prevErrors.sku,
        name: prevErrors.name,
        price: prevErrors.price,
      }))
    } else {
      setFormValues((prevFormValues) => ({ ...prevFormValues, [name]: value }));
    }
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
      const numericValue = value.replace(/[$,]/g, '');

      if (isNaN(Number(numericValue)) || !numericValue.trim() || numericValue.charAt(0) === "-")   {
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

  function handleOnBlur() {
    if(Number(formValues.price.replace(/[^\d-]/g, '')) !== 0 && errors.price.hasError) {
      setErrors(prevErrors => ({
        ...prevErrors,
        price: {
          hasError: false,
          errorType: ""
        }
      })
    )}
  }

  function renderErrorMessage(error: ProductTypeErrors[string]) {
    if (error?.hasError) {
      switch(error?.errorType) {
        case 'sku-exists':
          return (
            <span className="errorMessage">Sorry, that SKU is already taken. Please choose a different one.</span>
          )
          case 'invalid-data-type':
          return (
            <span className="errorMessage">Please, provide the data of indicated type</span>
          )
          case 'required-data':
          return (
            <span className="errorMessage">Please, submit required data</span>
          )
          case 'invalid-value':
          return (
            <span className="errorMessage">Please, provide a value bigger than zero</span>
          )
        default:
          break;
      }
    }
    return null;
  }

  function validateForm() {
    const furnitureOptions: Record<string, boolean> = {
      price: true,
      size: true,
      weight: true,
      height: true,
      width: true,
      length: true
    }
  
    let hasError = false;
  
    Object.entries(formValues).forEach(([name, value]) => {
      if (!value && name !== "typeSwitcher") {
        setErrors(prevErrors => ({
          ...prevErrors,
          [name]: {
            hasError: true,
            errorType: "required-data"
          }
        }));
        hasError = true;
      } else if (furnitureOptions[name]) {
        const numericValue = (value as string).replace(/[$,]/g, '');

        if (isNaN(Number(numericValue)) || !numericValue.trim() || numericValue.charAt(0) === "-")   {
          setErrors(prevErrors => ({
            ...prevErrors,
            [name]: {
              hasError: true,
              errorType: "invalid-data-type"
            }
          }));
          hasError = true;
        } else if (Number(numericValue) <= 0) {
          setErrors(prevErrors => ({
            ...prevErrors,
            [name]: {
              hasError: true,
              errorType: "invalid-value"
            }
          }));
          hasError = true;
        } else {
          setErrors(prevErrors => ({
            ...prevErrors,
            [name]: {
              hasError: false,
              errorType: ""
            }
          }));
        }
      }
    });
  
    return hasError;
  }

  async function handleSubmit() {
    const hasEmptyFields = validateForm()
    const hasInvalidData = Object.keys(errors).some(item => errors[item]?.hasError)

    if(hasEmptyFields || hasInvalidData) return
    
    const typeValueMap: TypeValueMap = {
      DVD: formValues.size,
      Book: formValues.weight,
      Furniture: `${formValues.height}x${formValues.width}x${formValues.length}`,
    };

    try {
      const data = {
        sku: formValues.sku,
        name: formValues.name,
        price: formValues.price.replace(/[$,]/g, ''),
        type: formValues.typeSwitcher,
        value: typeValueMap[formValues.typeSwitcher]
      }

      await ScandiWebApi.post('/products', data)
  
      handleRedirectToHome()
    } catch (err) {
      setErrors(prevErrors => ({
        ...prevErrors,
        "sku": {
          hasError: true,
          errorType: "sku-exists"
        }
      }));
    }
  }
  
  return (
    <DefaultTemplate 
      title="Product Add" 
      leftButton="Save" 
      rightButton="Cancel"
      type="submit"
      handleActionLeftButton={handleSubmit}
      handleActionRightButton={handleRedirectToHome}
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
                onBlur={handleOnBlur}
                onChange={handleChangeValues} 
                value={formValues.price}
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
                <option value="" disabled>Select a product type</option>
                <option value="DVD">DVD</option>
                <option value="Book">Book</option>
                <option value="Furniture">Furniture</option>
              </select>
            </div>
            {renderErrorMessage(errors.typeSwitcher)}
            
            {
              typeSwitcherFields[formValues.typeSwitcher]?.map(field => (
                <div key={field.name}>
                  <div className="formWrapper">
                    <label htmlFor={formValues.typeSwitcher}>{field.label}</label>
                    <input
                      
                      id={formValues.typeSwitcher}
                      name={field.name}
                      type="number"
                      min={0.01}
                      onBlur={handleOnBlur}
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
