import React, { useState, useEffect } from "react";
import {
  Camera,
  Shield,
  Cpu,
  Grid,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { ProductCard } from "./components/ProductCard";
import { OrderSummary } from "./components/OrderSummary";
import { PRODUCTS } from "./data";
import { CartItem, Category } from "./types";

const STEPS: { id: number; title: string; category: Category }[] = [
  { id: 1, title: "Choose your cameras", category: "CAMERAS" },
  { id: 2, title: "Choose your plan", category: "PLAN" },
  { id: 3, title: "Choose your sensors", category: "SENSORS" },
  { id: 4, title: "Add extra protection", category: "ACCESSORIES" },
];

const getStepIcon = (id: number) => {
  switch (id) {
    case 1:
      return <Camera size={20} className="text-gray-400" />;
    case 2:
      return <Shield size={20} className="text-gray-400" />;
    case 3:
      return <Cpu size={20} className="text-gray-400" />;
    case 4:
      return <Grid size={20} className="text-gray-400" />;
    default:
      return <Camera size={20} className="text-gray-400" />;
  }
};

export default function App() {
  const [activeStep, setActiveStep] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cart, setCart] = useState<Record<string, number>>({});

  useEffect(() => {
    const saved = localStorage.getItem("smarthome_cart");
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    } else {
      setCart({
        "cam1::white": 1,
        "cam2::black": 1,
        "plan1::default": 1,
        "sen1::white": 2,
        "acc1::black": 1,
      });
    }
    setIsLoaded(true);
  }, []);

  const handleSaveLater = () => {
    localStorage.setItem("smarthome_cart", JSON.stringify(cart));
    alert("Your system has been saved for later!");
  };

  const getQuantity = (productId: string, variantId?: string) => {
    const key = `${productId}::${variantId || "default"}`;
    return cart[key] || 0;
  };

  const handleUpdateQuantity = (
    productId: string,
    variantId: string | undefined,
    delta: number,
  ) => {
    const key = `${productId}::${variantId || "default"}`;
    setCart((prev) => {
      const current = prev[key] || 0;
      const newQuantity = Math.max(0, current + delta);

      const newCart = { ...prev };
      if (newQuantity === 0) {
        delete newCart[key];
      } else {
        newCart[key] = newQuantity;
      }
      return newCart;
    });
  };

  const cartItems: CartItem[] = Object.entries(cart)
    .map(([key, quantity]) => {
      const [productId, variantId] = key.split("::");
      const product = PRODUCTS.find((p) => p.id === productId);
      if (!product) return null;

      const variant =
        variantId !== "default" && product.variants
          ? product.variants.find((v) => v.id === variantId)
          : undefined;

      return { product, variant, quantity };
    })
    .filter(Boolean) as CartItem[];

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white selection:bg-[#edf3ff] selection:text-[#583bb6]">
      <main className="flex-grow max-w-full xl:max-w-[1400px] mx-auto w-full px-3 sm:px-4 md:px-6 xl:px-8 py-8 md:py-12">
        {/*
          Layout logic:
          - Mobile (< md): summary stacked BELOW, full width. Cards shown 2-in-a-row.
          - Tablet/Laptop (md, lg): summary stacked BELOW, full width. Cards 5-in-a-row for cameras.
          - xl+ (large desktop): sidebar mode -> builder col-span-7, summary col-span-5 sticky. Cards 2 per row.
        */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT COLUMN: BUILDER */}
          <div className="xl:col-span-7 ">
            <div className="mb-8">
              {STEPS.map((step, index) => {
                const isActive = step.id === activeStep;
                const distinctProductsCount = new Set(
                  cartItems
                    .filter((item) => item.product.category === step.category)
                    .map((item) => item.product.id),
                ).size;

                return (
                  <div
                    key={step.id}
                    className={`${isActive ? "bg-[#edf3ff] rounded-2xl" : "bg-white"} ${isActive && index !== 0 ? "mt-2" : ""} ${isActive && index !== STEPS.length - 1 ? "mb-2" : ""}`}
                  >
                    {/* Header */}
                    <div
                      onClick={() => setActiveStep(isActive ? 0 : step.id)}
                      className="cursor-pointer flex flex-col w-full border-b border-gray-200 pb-2"
                    >
                      <div className="px-4 pt-4 pb-1 border-b border-black">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                          Step {step.id} of {STEPS.length}
                        </p>
                      </div>

                      <div className="px-4 pb-2 pt-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getStepIcon(step.id)}
                          <h3 className="text-xl font-bold text-gray-900">
                            {step.title}
                          </h3>
                        </div>
                        <div className="flex items-center space-x-3">
                          {distinctProductsCount > 0 && (
                            <span className="text-[11px] font-bold text-[#583bb6]">
                              {distinctProductsCount} selected
                            </span>
                          )}
                          {isActive ? (
                            <ChevronUp
                              size={20}
                              className="text-[#583bb6]"
                              strokeWidth={3}
                            />
                          ) : (
                            <ChevronDown
                              size={20}
                              className="text-[#583bb6]"
                              strokeWidth={3}
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    {isActive && (
                      <div className="px-2 pb-2 animate-in fade-in duration-300">
                        {/* Product cards: 1-col mobile, 5-col tablet/laptop, 2-col large desktop */}
                        <div
                          className={`grid grid-cols-1 gap-3 mb-6 ${step.category === "CAMERAS" ? "sm:grid-cols-2 md:grid-cols-5 md:gap-1.5 lg:gap-2 xl:gap-4 xl:grid-cols-2" : "sm:grid-cols-2 md:gap-4"}`}
                        >
                          {PRODUCTS.filter(
                            (p) => p.category === step.category,
                          ).map((product, index, array) => {
                            const isLastOdd =
                              index === array.length - 1 &&
                              array.length % 2 !== 0;
                            return (
                              <div
                                key={product.id}
                                className={`w-full ${isLastOdd && step.category === "CAMERAS" ? "sm:col-span-2 sm:justify-self-center sm:w-[calc(50%-0.375rem)] md:col-span-1 md:justify-self-auto md:w-full xl:col-span-2 xl:justify-self-center xl:w-[calc(50%-0.5rem)]" : isLastOdd ? "sm:col-span-2 sm:justify-self-center sm:w-[calc(50%-0.375rem)]" : ""}`}
                              >
                                <ProductCard
                                  product={product}
                                  getQuantity={getQuantity}
                                  onUpdateQuantity={handleUpdateQuantity}
                                  isHorizontalOnDesktop={
                                    step.category === "CAMERAS"
                                  }
                                />
                              </div>
                            );
                          })}
                        </div>

                        {step.id < STEPS.length && (
                          <div className="flex justify-center mt-6">
                            <button
                              onClick={() => setActiveStep(step.id + 1)}
                              className="bg-transparent border border-[#583bb6] text-[#583bb6] hover:bg-white hover:text-purple-800 font-bold py-2 px-6 rounded-full text-sm transition-colors"
                            >
                              Next: {STEPS[step.id].title}
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: REVIEW PANEL */}
          <div className="xl:col-span-5 xl:sticky xl:top-8 h-fit">
            <OrderSummary
              cartItems={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onSaveLater={handleSaveLater}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
