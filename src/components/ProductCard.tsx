import React, { useState } from "react";
import { Product } from "../types";
import { Minus, Plus, Camera, Cpu, FileText, Box } from "lucide-react";

interface Props {
  product: Product;
  getQuantity: (productId: string, variantId?: string) => number;
  onUpdateQuantity: (
    productId: string,
    variantId: string | undefined,
    delta: number,
  ) => void;
  isHorizontalOnDesktop?: boolean;
}

const getIcon = (cat: string) => {
  switch (cat) {
    case "CAMERAS":
      return <Camera size={40} className="text-gray-400" strokeWidth={1} />;
    case "SENSORS":
      return <Cpu size={40} className="text-gray-400" strokeWidth={1} />;
    case "PLAN":
      return <FileText size={40} className="text-gray-400" strokeWidth={1} />;
    case "ACCESSORIES":
      return <Box size={40} className="text-gray-400" strokeWidth={1} />;
    default:
      return <Box size={40} className="text-gray-400" strokeWidth={1} />;
  }
};

export const ProductCard: React.FC<Props> = ({
  product,
  getQuantity,
  onUpdateQuantity,
  isHorizontalOnDesktop,
}) => {
  const [activeVariantId, setActiveVariantId] = useState<string | undefined>(
    product.variants && product.variants.length > 0
      ? product.variants[0].id
      : undefined,
  );

  const quantity = getQuantity(product.id, activeVariantId);
  const isSelected = quantity > 0;

  return (
    // Card Container
    <div
      className={`w-full h-full relative border rounded-xl p-3 flex flex-col ${isHorizontalOnDesktop ? "xl:flex-row xl:items-stretch" : ""} bg-white transition-all ${isSelected ? "border-[#583bb6] shadow-sm ring-1 ring-[#583bb6]" : "border-gray-200 hover:border-[#583bb6]/60 hover:shadow-lg"}`}
    >
      {/* 1. Left Side: Badge & Image */}
      <div
        className={`relative flex flex-col items-center justify-start flex-shrink-0 ${isHorizontalOnDesktop ? "xl:w-[35%] xl:pr-4" : "w-full mb-3"}`}
      >
        <div className="w-full flex justify-start mb-1 h-5">
          {product.savings && (
            <div className="bg-[#583bb6] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide flex items-center">
              {product.savings}
            </div>
          )}
        </div>

        {/* Image */}
        <div className="w-full h-20 xl:h-24 flex items-center justify-center">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-contain mix-blend-multiply"
            />
          ) : (
            getIcon(product.category)
          )}
        </div>
      </div>

      {/* 2. Right Side: Details */}
      <div
        className={`flex flex-col flex-grow ${isHorizontalOnDesktop ? "xl:w-[65%]" : "w-full"}`}
      >
        <div className="flex flex-col">
          <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 mb-1 leading-tight line-clamp-2">
            {product.description}
          </p>
          <a
            href="#"
            className="text-xs text-blue-700 underline mb-2.5 inline-block font-medium"
          >
            Learn More
          </a>

          {/* Color Selector */}
          {product.variants && product.variants.length > 0 && (
            <div className="flex flex-row items-center gap-1.5 mb-2 overflow-x-auto no-scrollbar">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setActiveVariantId(variant.id)}
                  className={`flex flex-row items-center space-x-1.5 focus:outline-none px-2 py-1 rounded border transition-all flex-shrink-0 ${
                    activeVariantId === variant.id
                      ? "border-teal-400 bg-teal-50/60 shadow-sm" // التظليل الأخضر الخفيف المريح للعين
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div
                    className={`w-3.5 h-3.5 rounded-sm border border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0 ${variant.colorCode}`}
                  >
                    {(variant.imageUrl || product.imageUrl) && (
                      <img
                        src={variant.imageUrl || product.imageUrl}
                        alt={variant.name}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    )}
                  </div>
                  <span
                    className={`text-[10px] font-medium whitespace-nowrap ${activeVariantId === variant.id ? "text-teal-900" : "text-gray-600"}`}
                  >
                    {variant.name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 3. Footer Controls */}
        <div className="flex items-end justify-between w-full mt-auto pt-2">
          {/* Quantity Toggle */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => onUpdateQuantity(product.id, activeVariantId, -1)}
              className="w-6 h-6 flex items-center justify-center text-gray-400 border border-gray-200 rounded-md hover:text-gray-600 hover:bg-gray-50 disabled:opacity-30"
              disabled={quantity === 0}
            >
              <Minus size={12} strokeWidth={2} />
            </button>
            <span className="w-4 text-center text-sm font-medium text-gray-900">
              {quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(product.id, activeVariantId, 1)}
              className="w-6 h-6 flex items-center justify-center text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 border border-transparent"
            >
              <Plus size={12} strokeWidth={2} />
            </button>
          </div>

          {/* Price */}
          <div className="flex flex-col items-end justify-end shrink-0 min-w-0">
            {product.originalPrice > product.price && (
              <span className="text-xs text-red-500 line-through leading-none mb-1">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-base font-medium text-gray-600 leading-none truncate">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
