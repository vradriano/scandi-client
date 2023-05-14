import { ProductTypeValues, TypeSwitcherFields } from "../interfaces/ProductPage";

//The start label, where you can just add a new label and the value of input.
export const productTypeValues: ProductTypeValues = {
  DVD: { size: "" },
  Book: { weight: "" },
  Furniture: { height: "", width: "", length: "" }
}

//You can add a new label and its corresponding input value to the start label.
export const typeSwitcherFields: TypeSwitcherFields = {
  DVD: [{ label: "Size (MB)", name: "size" }],
  Book: [{ label: "Weight (KG)", name: "weight" }],
  Furniture: [
    { label: "Height (Inch)", name: "height" },
    { label: "Width (CM)", name: "width" },
    { label: "Length (L)", name: "length" },
  ],
};
