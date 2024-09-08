export interface Property {
  _id?: string,
  name: string,
  ptype?: string
}

export const EMPTY_PROPERTY: Property = {
  _id: "",
  name: "",
}