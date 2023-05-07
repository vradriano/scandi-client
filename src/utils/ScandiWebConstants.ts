import { ProductTypeValues, TypeSwitcherFields } from "../interfaces/ProductPage";

export const productTypeValues: ProductTypeValues = {
  DVD: { size: "" },
  Book: { weight: "" },
  Furniture: { height: "", width: "", length: "" }
}

export const typeSwitcherFields: TypeSwitcherFields = {
  DVD: [{ label: "Size (MB)", name: "size" }],
  Book: [{ label: "Weight (KG)", name: "weight" }],
  Furniture: [
    { label: "Height (Inch)", name: "height" },
    { label: "Width (CM)", name: "width" },
    { label: "Length (L)", name: "length" },
  ],
};