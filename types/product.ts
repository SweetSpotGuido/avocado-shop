export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;

    category_id: number;

    sku: string;
    barcode: string;

    image_url: string;

    price: number;
    price_old: number;

    stock: number;

    weight: number;
    width: number;
    height: number;
    depth: number;

    featured: boolean;
    active: boolean;

    created_at?: string;
}

export type ProductInput = Omit<Product, "id" | "created_at">;