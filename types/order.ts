export interface Order {
  id?: number;

  customer_name: string;

  customer_email: string;

  customer_phone: string;

  address: string;

  city: string;

  province: string;

  zip_code: string;

  total: number;

  status: string;

  created_at?: string;
}
