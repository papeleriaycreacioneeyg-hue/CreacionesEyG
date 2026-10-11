"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";

export interface QuoteItem {
  id: string;
  slug: string;
  name: string;
  categoryName: string;
  quantity: number;
  notes?: string;
  themeColor: string;
  accentColor: string;
}

interface QuoteContextType {
  items: QuoteItem[];
  addItem: (item: Omit<QuoteItem, "quantity"> & { quantity?: number }) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  updateNotes: (id: string, notes: string) => void;
  clearQuote: () => void;
  totalItems: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
}

const STORAGE_KEY = "creaciones_eyg_quote_v1";

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage once on client
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch {
      // Ignore storage errors
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save to localStorage when items change
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore quota errors
    }
  }, [items, isHydrated]);

  const addItem = (newItem: Omit<QuoteItem, "quantity"> & { quantity?: number }) => {
    const qty = Math.max(1, newItem.quantity ?? 1);
    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === newItem.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        const current = updated[existingIndex];
        updated[existingIndex] = {
          ...current,
          quantity: current.quantity + qty,
          notes: newItem.notes || current.notes,
        };
        return updated;
      }
      return [
        ...prev,
        {
          id: newItem.id,
          slug: newItem.slug,
          name: newItem.name,
          categoryName: newItem.categoryName,
          quantity: qty,
          notes: newItem.notes ?? "",
          themeColor: newItem.themeColor ?? "#fdf1ed",
          accentColor: newItem.accentColor ?? "#e04b88",
        },
      ];
    });
    // Open drawer automatically as feedback
    setIsDrawerOpen(true);
  };

  const updateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: Math.min(1000, newQty) } : item))
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateNotes = (id: string, notes: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, notes } : item)));
  };

  const clearQuote = () => {
    setItems([]);
  };

  const totalItems = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  return (
    <QuoteContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        updateNotes,
        clearQuote,
        totalItems,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        toggleDrawer,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
}

const defaultContext: QuoteContextType = {
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  removeItem: () => {},
  updateNotes: () => {},
  clearQuote: () => {},
  totalItems: 0,
  isDrawerOpen: false,
  openDrawer: () => {},
  closeDrawer: () => {},
  toggleDrawer: () => {},
};

export function useQuote() {
  const context = useContext(QuoteContext);
  if (!context) {
    return defaultContext;
  }
  return context;
}
