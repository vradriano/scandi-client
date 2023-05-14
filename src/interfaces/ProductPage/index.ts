export interface FormValues {
  sku: string;
  name: string;
  price: string;
  typeSwitcher: string;
  [key: string]: string | undefined | boolean;
  size?: string;
  weight?: string;
  height?: string;
  width?: string;
  length?: string;
}

export interface ErrorsValues {
  [key: string]: {
    hasError: boolean;
    errorType: "" | "required-data" | "invalid-data-type" | "invalid-value" | "sku-exists"
  };

}

export interface TypeSwitcherFields {
  [key: string]: { label: string; name: string }[];
}

export type ProductTypeValues = {
  DVD: { size: string };
  Book: { weight: string };
  Furniture: { height: string, width: string, length: string };
  [key: string]: { [key: string]: string };
};

export type ProductTypeErrors = {
  [key: string]: {
    hasError: boolean | undefined;
    errorType: "" | "required-data" | "invalid-data-type" | "sku-exists" | "invalid-value";
  };
};

export interface TypeValueMap {
  [key: string]: string | undefined;
  DVD: string | undefined;
  Book: string | undefined;
  Furniture: string;
}