export type ProductUnit = 'штука' | 'компл'

export interface ProductsFilter {
  limit: number
  offset: number
}

export interface Product {
  id: string
  code: number
  part_number: string
  name: string
  manufacturer: string
  unit: ProductUnit
  price: number
  balance: number
  is_new: boolean
  image_url: string
  active: boolean
}
