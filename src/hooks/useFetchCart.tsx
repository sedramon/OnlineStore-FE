import { Cart } from "@/types/carts/Cart";
import { useState, useEffect } from "react";

export function useFetchCart(url: string, refetch: () => void): Cart | null {
      const [cart, setCart] = useState<Cart | null>(null);
    
      useEffect(() => {
        const fetchCart = async () => {
          try {
            const response = await fetch(url);
            const data = await response.json();
            setCart(data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchCart();
      }, [url, refetch]);
    
      return cart;
    }