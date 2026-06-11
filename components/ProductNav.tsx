"use client";

import { useState } from "react";
import type { ProductId, ProductNavItem } from "@/lib/types";

type ProductNavProps = {
  products: ProductNavItem[];
};

export function ProductNav({ products }: ProductNavProps) {
  const [activeProduct, setActiveProduct] = useState<ProductId>("flights");

  return (
    <nav className="productNav" aria-label="Travel products">
      {products.map((product) => (
        <button
          className={`productButton ${activeProduct === product.id ? "active" : ""}`}
          key={product.id}
          onClick={() => setActiveProduct(product.id)}
          type="button"
        >
          {product.badge ? <span className="productBadge">{product.badge}</span> : null}
          <span className={`productIcon productIcon-${product.id}`} aria-hidden="true" />
          <span>{product.label}</span>
        </button>
      ))}
    </nav>
  );
}
