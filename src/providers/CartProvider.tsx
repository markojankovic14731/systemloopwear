"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { FirstDropProduct } from "@/data/placeholders";
import {
  createCartItem,
  getCartItemCount,
  getCartSubtotal,
  type CheckoutFormData,
  type LoopCartItem,
} from "@/lib/cart-utils";

const CART_STORAGE_KEY = "loop_cart_items";

type CheckoutMode = "cart" | "buyNow";

interface CartContextValue {
  items: LoopCartItem[];
  checkoutItems: LoopCartItem[];
  itemCount: number;
  subtotal: number;
  subtotalLabel: string;
  checkoutSubtotalLabel: string;
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  toastMessage: string | null;
  orderPlaced: boolean;
  isSubmittingOrder: boolean;
  orderError: string | null;
  addItem: (product: FirstDropProduct, size: string, quantity: number) => void;
  removeItem: (lineId: string) => void;
  updateItemQuantity: (lineId: string, quantity: number) => void;
  openCart: () => void;
  closeCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  buyNow: (product: FirstDropProduct, size: string, quantity: number) => void;
  placeOrder: (data: CheckoutFormData) => Promise<void>;
  dismissToast: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function loadStoredItems(): LoopCartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored) as LoopCartItem[];
  } catch {
    return [];
  }
}

function persistItems(items: LoopCartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<LoopCartItem[]>([]);
  const [checkoutItems, setCheckoutItems] = useState<LoopCartItem[]>([]);
  const [checkoutMode, setCheckoutMode] = useState<CheckoutMode>("cart");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(loadStoredItems());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    persistItems(items);
  }, [items, hydrated]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 2400);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const addItem = useCallback(
    (product: FirstDropProduct, size: string, quantity: number) => {
      setItems((current) => {
        const lineId = `${product.id}-${size}`;
        const existing = current.find((item) => item.lineId === lineId);

        if (existing) {
          return current.map((item) =>
            item.lineId === lineId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }

        return [...current, createCartItem(product, size, quantity)];
      });
      setToastMessage("Added to cart");
    },
    []
  );

  const removeItem = useCallback((lineId: string) => {
    setItems((current) => current.filter((item) => item.lineId !== lineId));
  }, []);

  const updateItemQuantity = useCallback((lineId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((current) =>
      current.map((item) =>
        item.lineId === lineId ? { ...item, quantity } : item
      )
    );
  }, []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const openCheckout = useCallback(() => {
    setIsCartOpen(false);
    setCheckoutMode("cart");
    setCheckoutItems(items);
    setIsCheckoutOpen(true);
    setOrderPlaced(false);
    setOrderError(null);
  }, [items]);

  const closeCheckout = useCallback(() => {
    setIsCheckoutOpen(false);
    setOrderPlaced(false);
    setOrderError(null);
    setCheckoutItems([]);
    setCheckoutMode("cart");
  }, []);

  const buyNow = useCallback(
    (product: FirstDropProduct, size: string, quantity: number) => {
      setCheckoutMode("buyNow");
      setCheckoutItems([createCartItem(product, size, quantity)]);
      setIsCartOpen(false);
      setIsCheckoutOpen(true);
      setOrderPlaced(false);
      setOrderError(null);
    },
    []
  );

  const placeOrder = useCallback(
    async (data: CheckoutFormData) => {
      if (checkoutItems.length === 0) return;

      setIsSubmittingOrder(true);
      setOrderError(null);

      const orderItems = checkoutItems.map((item) => ({
        name: item.name,
        size: item.size,
        quantity: item.quantity,
        lineTotal: item.priceAmount * item.quantity,
      }));
      const total = getCartSubtotal(checkoutItems);

      try {
        const response = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customer: data,
            items: orderItems,
            total,
            paymentMethod: "Cash on delivery",
          }),
        });

        const result = (await response.json()) as { error?: string };

        if (!response.ok) {
          throw new Error(result.error ?? "Unable to submit order. Please try again.");
        }

        const order = {
          id: `LOOP-${Date.now()}`,
          createdAt: new Date().toISOString(),
          paymentMethod: "cash_on_delivery",
          customer: data,
          items: checkoutItems,
          total,
        };

        if (typeof window !== "undefined") {
          try {
            const existing = localStorage.getItem("loop_orders");
            const orders = existing ? JSON.parse(existing) : [];
            localStorage.setItem("loop_orders", JSON.stringify([order, ...orders]));
          } catch {
            localStorage.setItem("loop_orders", JSON.stringify([order]));
          }
        }

        if (checkoutMode === "cart") {
          setItems([]);
        }

        setOrderPlaced(true);
      } catch (error) {
        setOrderError(
          error instanceof Error
            ? error.message
            : "Unable to submit order. Please try again."
        );
      } finally {
        setIsSubmittingOrder(false);
      }
    },
    [checkoutItems, checkoutMode]
  );

  const dismissToast = useCallback(() => setToastMessage(null), []);

  const subtotal = useMemo(() => getCartSubtotal(items), [items]);
  const checkoutSubtotal = useMemo(
    () => getCartSubtotal(checkoutItems),
    [checkoutItems]
  );
  const itemCount = useMemo(() => getCartItemCount(items), [items]);
  const subtotalLabel = useMemo(
    () => `${subtotal.toLocaleString("en-US")} RSN`,
    [subtotal]
  );
  const checkoutSubtotalLabel = useMemo(
    () => `${checkoutSubtotal.toLocaleString("en-US")} RSN`,
    [checkoutSubtotal]
  );

  const value = useMemo(
    () => ({
      items,
      checkoutItems,
      itemCount,
      subtotal,
      subtotalLabel,
      checkoutSubtotalLabel,
      isCartOpen,
      isCheckoutOpen,
      toastMessage,
      orderPlaced,
      isSubmittingOrder,
      orderError,
      addItem,
      removeItem,
      updateItemQuantity,
      openCart,
      closeCart,
      openCheckout,
      closeCheckout,
      buyNow,
      placeOrder,
      dismissToast,
    }),
    [
      items,
      checkoutItems,
      itemCount,
      subtotal,
      subtotalLabel,
      checkoutSubtotalLabel,
      isCartOpen,
      isCheckoutOpen,
      toastMessage,
      orderPlaced,
      isSubmittingOrder,
      orderError,
      addItem,
      removeItem,
      updateItemQuantity,
      openCart,
      closeCart,
      openCheckout,
      closeCheckout,
      buyNow,
      placeOrder,
      dismissToast,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
