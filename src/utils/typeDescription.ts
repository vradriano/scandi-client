interface Item {
  [key: string]: string;
}

// You can just update or create a new item and add the description here.
export const typeDescription: Item = {
  DVD: "Please provide a size in megabytes(MB) format.",
  Book: "Please provide a weight in kilogram(KG) format.",
  Furniture: "Please provide dimensions in (Height x Width x Length) format." ,
};