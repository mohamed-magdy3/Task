import React from "react";
import { CartItem, Category } from "../types";
import {
  ShieldCheck,
  Minus,
  Plus,
  Camera,
  Cpu,
  Box,
  Truck,
} from "lucide-react";
import badge from "../../assets/images/logo.jpg";
import icon from "../../assets/images/icon.jpg";

interface Props {
  cartItems: CartItem[];
  onUpdateQuantity: (
    productId: string,
    variantId: string | undefined,
    delta: number,
  ) => void;
  onSaveLater: () => void;
}

const categories: Category[] = ["CAMERAS", "SENSORS", "ACCESSORIES", "PLAN"];

const getIcon = (cat: Category) => {
  switch (cat) {
    case "CAMERAS":
      return <Camera size={25} className="text-gray-400" strokeWidth={1.5} />;
    case "SENSORS":
      return <Cpu size={25} className="text-gray-400" strokeWidth={1.5} />;
    case "PLAN":
      return (
        <ShieldCheck size={35} className="text-[#4438ca]" strokeWidth={1.5} />
      );
    case "ACCESSORIES":
      return <Box size={20} className="text-gray-400" strokeWidth={1.5} />;
  }
};

export function OrderSummary({
  cartItems,
  onUpdateQuantity,
  onSaveLater,
}: Props) {
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const totalOriginal = cartItems.reduce(
    (sum, item) => sum + item.product.originalPrice * item.quantity,
    0,
  );
  const totalSavings = totalOriginal - totalPrice;

return (
    <div
      className="w-full bg-[#f4f7ff] rounded-xl p-5 md:p-8 font-sans"
      style={{ fontFamily: "GoogleSans, sans-serif" }}
    >
      <div className="flex flex-col md:flex-row xl:flex-col md:gap-8 lg:gap-12 xl:gap-0">
        {/* ---------------- LIFT COLUMN---------------- */}
        <div className="flex-1 min-w-0">
          {/* Header Section */}
          <div className="pb-6 mb-6 border-b border-gray-200">
            <h3 className="-mt-3 text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-4">
              REVIEW
            </h3>
            <h2 className="text-[24px] md:text-[26px] font-bold text-gray-900 mb-1.5">
              Your security system
            </h2>
            <p className="text-[14px] md:text-[14.5px] text-gray-500 leading-relaxed">
              Review your personalized protection system designed to keep what
              matters most safe.
            </p>
          </div>

          {/* Categories & Items */}
          <div className="flex flex-col">
            {categories.map((category) => {
              const itemsInCat = cartItems.filter(
                (item) => item.product.category === category,
              );
              if (itemsInCat.length === 0) return null;

              return (
                <div
                  key={category}
                  className="flex flex-col pb-5 mb-5 border-b border-gray-200"
                >
                  <h4 className="text-[10px] md:text-[11px] xl:text-[10px] font-medium text-gray-400 mb-3 md:mb-4 xl:mb-3 tracking-wider uppercase">
                    {category}
                  </h4>
                  <div className="flex flex-col space-y-4">
                    {itemsInCat.map((item) => {
                      const itemKey = `${item.product.id}_${item.variant?.id || "default"}`;
                      const isPlan = item.product.category === "PLAN";

                      return (
                        <div
                          key={itemKey}
                          className="flex flex-row items-center justify-between gap-3 md:gap-2 xl:gap-3"
                        >
                          {/* Item Info */}
                          <div className="flex items-center space-x-3 md:space-x-4 xl:space-x-3 flex-grow min-w-0">
                            <div
                              className={`w-10 h-10 flex items-center justify-center flex-shrink-0 ${isPlan ? "" : "bg-white border border-gray-200 rounded p-1"}`}
                            >
                              {item.variant?.imageUrl ||
                              item.product.imageUrl ? (
                                <img
                                  src={
                                    item.variant?.imageUrl ||
                                    item.product.imageUrl
                                  }
                                  alt={item.product.name}
                                  className="w-full h-full object-contain mix-blend-multiply"
                                />
                              ) : (
                                getIcon(item.product.category)
                              )}
                            </div>

                            {isPlan ? (
                              <div className="text-[18px] md:text-[16px] xl:text-[18px] leading-tight truncate">
                                <span className="font-bold text-gray-900">
                                  Cam{" "}
                                </span>
                                <span className="font-bold text-[#4438ca]">
                                  Unlimited
                                </span>
                              </div>
                            ) : (
                              <p className="font-medium text-gray-900 text-[15px] leading-tight truncate">
                                {item.product.name}
                              </p>
                            )}
                          </div>

                          {/* Actions & Price */}
                          <div className="flex items-center justify-end space-x-4 flex-shrink-0">
                            {!isPlan ? (
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() =>
                                    onUpdateQuantity(
                                      item.product.id,
                                      item.variant?.id,
                                      -1,
                                    )
                                  }
                                  className="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 rounded text-black-500 hover:bg-gray-50 transition-colors"
                                >
                                  <Minus size={14} strokeWidth={2} />
                                </button>
                                <span className="w-3 md:w-4 xl:w-3 text-center text-[18px] md:text-[15px] xl:text-[18px] font-bold text-gray-900">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    onUpdateQuantity(
                                      item.product.id,
                                      item.variant?.id,
                                      1,
                                    )
                                  }
                                  className="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 rounded text-black-500 hover:bg-gray-50 transition-colors"
                                >
                                  <Plus size={14} strokeWidth={2} />
                                </button>
                              </div>
                            ) : (
                              <div className="w-[72px] hidden sm:block"></div>
                            )}
                            <div className="text-right flex flex-col md:flex-row xl:flex-col items-end md:items-center xl:items-end justify-center min-w-[3.5rem] md:space-x-2 xl:space-x-0">
                              {item.product.originalPrice >
                                item.product.price && (
                                <span className="text-[16px] md:text-[13px] xl:text-[16px] text-gray-500 md:text-gray-400 xl:text-gray-500 line-through mb-0.5 md:mb-0 xl:mb-0.5">
                                  $
                                  {(
                                    item.product.originalPrice * item.quantity
                                  ).toFixed(2)}
                                  {isPlan ? "/mo" : ""}
                                </span>
                              )}
                              <span
                                className={`text-[16px] md:text-[15px] xl:text-[16px] font-bold text-[#4438ca]`}
                              >
                                {item.product.price === 0
                                  ? "FREE"
                                  : `$${(item.product.price * item.quantity).toFixed(2)}${isPlan ? "/mo" : ""}`}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Shipping Row */}
            <div className="flex items-center justify-between pb-6 md:pb-0 xl:pb-6 mb-6 md:mb-0 xl:mb-6 border-b md:border-none xl:border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <img src={icon} width={55} height={25} alt="" />
                <span className="font-medium text-gray-900 text-[17px] md:text-[15px] xl:text-[17px]">
                  Fast Shipping
                </span>
              </div>
              <div className="flex flex-col md:flex-row xl:flex-col items-end md:items-center xl:items-end md:space-x-2 xl:space-x-0">
                <span className="text-[17px] md:text-[13px] xl:text-[17px] text-gray-500 md:text-gray-400 xl:text-gray-500 line-through mb-0.5 md:mb-0 xl:mb-0.5">
                  $5.99
                </span>
                <span className="text-[16px] md:text-[15px] xl:text-[16px] font-bold text-[#4438ca]">
                  FREE
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- RIGHT COLUMN---------------- */}
        <div className="w-full md:w-[380px] lg:w-[440px] xl:w-full flex-shrink-0 md:sticky xl:static md:top-8 h-fit mt-6 md:mt-0 xl:mt-6">
          <div className="flex justify-between items-end md:flex-col md:items-stretch xl:flex-row xl:justify-between xl:items-end mb-5 md:mb-8 xl:mb-5">
            {/* Guarantee Badge & Return Text */}
            <div className="flex items-center md:items-start xl:items-center md:gap-4 xl:gap-0">
              <div className="w-24 h-24 lg:w-28 lg:h-28 -ml-2 flex-shrink-0 flex items-center justify-center md:-mt-2 xl:mt-0">
                <img
                  src={badge}
                  alt="100% Satisfaction Guarantee"
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </div>
              <div className="hidden md:flex xl:hidden flex-col pt-1">
                <h4 className="text-[15px] font-bold text-gray-900 mb-1.5">
                  30-day hassle-free returns
                </h4>
                <p className="text-[13.5px] text-gray-600 leading-snug pr-4">
                  If you're not totally in love with the product, we will refund
                  you 100%.
                </p>
              </div>
            </div>

            {/* Total Price */}
            <div className="flex flex-col items-end md:flex-row md:items-center md:justify-between xl:flex-col xl:items-end mt-0 md:mt-6 xl:mt-0">
              <div className="bg-[#4438ca] text-white text-[12px] lg:text-[14px] font-medium px-2 py-0.5 rounded mb-1 md:mb-0 xl:mb-1">
                as low as $19.19/mo
              </div>
              <div className="flex items-baseline space-x-2">
                {totalSavings > 0 && (
                  <span className="text-gray-500 line-through text-[18px] font-normal tracking-tight">
                    ${totalOriginal.toFixed(2)}
                  </span>
                )}
                <span className="text-2xl lg:text-3xl font-extrabold text-[#4438ca] tracking-tight">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {totalSavings > 0 && (
            <p className="text-center text-xs md:text-[12.5px] font-bold text-[#22c55e] mb-4">
              Congrats! You're saving ${totalSavings.toFixed(2)} on your
              security bundle!
            </p>
          )}

          <button className="w-full bg-[#4438ca] hover:bg-[#3730a3] text-white font-bold py-3 md:py-3.5 xl:py-3 px-6 rounded-lg md:rounded-md xl:rounded-lg transition-colors text-[15px] md:text-[16px] xl:text-[15px] mb-4 md:mb-3 xl:mb-4 shadow-sm">
            Checkout
          </button>

          <div className="text-center md:text-center xl:text-right">
            <button
              onClick={onSaveLater}
              className="text-[13px] md:text-[12.5px] xl:text-[13px] text-gray-500 italic underline decoration-gray-400 underline-offset-2 md:underline-offset-4 xl:underline-offset-2 hover:text-gray-800 transition-colors"
            >
              Save my system for later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
