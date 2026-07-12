import { CartItem } from "@/types/cart";
import { Product } from "@/types/product";

const KEY = "avocado-cart";

export function getCart(): CartItem[] {
    if (typeof window === "undefined") return [];

    return JSON.parse(localStorage.getItem(KEY) || "[]");
}

export function saveCart(cart: CartItem[]) {
    localStorage.setItem(KEY, JSON.stringify(cart));
}

export function addToCart(product: Product) {
    const cart = getCart();

    const index = cart.findIndex((p) => p.id === product.id);

    if (index >= 0) {
        cart[index].quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image_url: product.image_url,
            quantity: 1,
        });
    }

    saveCart(cart);
}

export function removeFromCart(id: number) {
    saveCart(getCart().filter((p) => p.id !== id));
}

export function updateQuantity(id: number, quantity: number) {
    const cart = getCart();

    const item = cart.find((p) => p.id === id);

    if (!item) return;

    item.quantity = quantity;

    if (item.quantity <= 0) {
        removeFromCart(id);
        return;
    }

    saveCart(cart);
}

export function clearCart() {
    saveCart([]);
}
