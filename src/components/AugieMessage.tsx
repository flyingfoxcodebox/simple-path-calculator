import React, { useState, useEffect } from "react";
import { ChewyProduct, getAffordableChewyProduct } from "../utils/chewyApi";
import { calculateItemQuantity } from "../utils/finance";

interface AugieMessageProps {
  amount: number;
  optimisticAmount?: number;
  isLoading?: boolean;
}

export const AugieMessage: React.FC<AugieMessageProps> = ({
  amount,
  optimisticAmount,
  isLoading = false,
}) => {
  const [product, setProduct] = useState<ChewyProduct | null>(null);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (amount > 0) {
      setIsLoadingProduct(true);
      loadChewyProduct();
    }
  }, [amount, optimisticAmount]);

  const budgetForShopping = optimisticAmount || amount;

  const loadChewyProduct = async () => {
    try {
      // Use optimistic amount for Augie's suggestions (what you could buy with the grown money)
      const chewyProduct = await getAffordableChewyProduct(budgetForShopping);
      setProduct(chewyProduct);

      // Show message after a short delay for dramatic effect
      setTimeout(() => {
        setShowMessage(true);
        setIsLoadingProduct(false);
      }, 1000);
    } catch (error) {
      console.error("Failed to load Chewy product:", error);
      setIsLoadingProduct(false);
    }
  };

  const getAugieMessage = () => {
    if (!product) {
      return {
        message:
          "Mom, that amount is so small I couldn't even buy a single treat. You might as well invest it instead! 🐕",
        emoji: "😢",
      };
    }

    const quantity = calculateItemQuantity(budgetForShopping, product.price);

    if (quantity === 0) {
      return {
        message:
          "Mom, that amount is so small I couldn't even buy a single treat. You might as well invest it instead! 🐕",
        emoji: "😢",
      };
    }

    const itemName =
      quantity === 1 ? product.name : `${quantity} ${product.name}s`;

    return {
      message: `Mom, don't buy that! Buy me ${itemName} instead! 🐕`,
      emoji: "😍",
      itemName,
      product,
    };
  };

  const augieMessage = getAugieMessage();

  if (isLoading || isLoadingProduct) {
    return (
      <div className="augie-message loading">
        <div className="augie-image-placeholder">
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        </div>
        <div className="message-container">
          <p>Augie is thinking about what treats he could get instead... 🐕</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`augie-message ${showMessage ? "show" : ""}`}>
      <div className="augie-image-container">
        <div className="augie-image">
          <img
            src="/augie-avatar.png"
            alt="Augie"
            className="augie-photo"
            onError={(e) => {
              // Fallback to emoji if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              target.parentElement!.innerHTML = `
                <div class="dog-emoji">🐕</div>
                <p class="image-note">Photo of Augie will go here</p>
              `;
            }}
          />
        </div>
      </div>

      <div className="message-container">
        <div className="speech-bubble">
          <div className="speech-bubble-content">
            <span className="augie-emoji">{augieMessage.emoji}</span>
            <p className="augie-text">
              Mom, don't buy that!{" "}
              {augieMessage.itemName ? (
                <a
                  href={`https://www.chewy.com/s?query=${encodeURIComponent(
                    augieMessage.product!.name
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clickable-item"
                >
                  Buy me {augieMessage.itemName}
                </a>
              ) : (
                "Buy me " +
                  augieMessage.message
                    .split("Buy me ")[1]
                    ?.split(" instead")[0] || "something"
              )}{" "}
              instead! 🐕
            </p>
          </div>
        </div>

        {product &&
          calculateItemQuantity(budgetForShopping, product.price) > 0 && (
            <div className="product-suggestion">
              <h4>🐾 Augie's Suggestion:</h4>
              <div className="suggested-product">
                <div className="product-info">
                  <a
                    href={`https://www.chewy.com/s?query=${encodeURIComponent(
                      product.name
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="product-link"
                  >
                    <h5>{product.name}</h5>
                  </a>
                  <p className="product-brand">by {product.brand}</p>
                  <p className="product-price">
                    {product.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}{" "}
                    each
                  </p>
                  <p className="product-quantity">
                    You could buy{" "}
                    <strong>
                      {calculateItemQuantity(budgetForShopping, product.price)}
                    </strong>{" "}
                    of these!
                  </p>
                </div>
                <a
                  href={`https://www.chewy.com/s?query=${encodeURIComponent(
                    product.name
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="product-image-link"
                >
                  <div className="product-image">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                </a>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};
