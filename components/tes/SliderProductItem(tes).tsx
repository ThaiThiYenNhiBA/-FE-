import React from "react";

interface Product {
  product_id: number;
  title: string;
  prices: { original: number; sale?: number };
  in_stock: boolean;
  images: { url: string; is_default: boolean }[];
  labels?: string[];
}

interface SliderProductItemProps {
  product: Product;
}

export default function SliderProductItem({ product }: SliderProductItemProps) {
  return (
    <div className="product-item">
      <img src={product.images[0].url} alt={product.title} className="product-item__image" />
      <h3 className="product-item__title">{product.title}</h3>
      <div className="product-item__price">
        {product.prices.sale ? (
          <>
            <span className="product-item__price--original">${product.prices.original}</span>
            <span className="product-item__price--sale">${product.prices.sale}</span>
          </>
        ) : (
          <span>${product.prices.original}</span>
        )}
      </div>
      <div className="product-item__stock">
        {product.in_stock ? "In stock" : "Out of stock"}
      </div>
    </div>
  );
}
