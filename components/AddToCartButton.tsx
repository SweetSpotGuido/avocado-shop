"use client";

import { Product } from "@/types/product";
import { addToCart } from "@/lib/cart";

interface Props {
    product: Product;
}

export default function AddToCartButton({
    product,
}: Props) {
    function handleClick() {
        addToCart(product);
        alert("Producto agregado al carrito");
    }

    return (
        <button
            onClick={handleClick}
            className="mt-10 bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-xl"
        >
            Agregar al carrito
        </button>
    );
}