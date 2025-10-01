/**
 * Utility to fetch Chewy product data for Augie's suggestions
 */

export interface ChewyProduct {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  brand: string;
}

export interface ChewyApiResponse {
  products: ChewyProduct[];
  totalCount: number;
}

/**
 * Fetch products from Chewy API
 * Note: This is a mock implementation since Chewy doesn't have a public API
 * In a real implementation, you would need to:
 * 1. Use Chewy's affiliate API if available
 * 2. Use a web scraping service (with proper terms of service compliance)
 * 3. Use a third-party pet product API
 */
export async function fetchChewyProducts(
  category: string = "dog-treats",
  limit: number = 10
): Promise<ChewyProduct[]> {
  try {
    // Mock Chewy products data - in reality, you'd fetch from an actual API
    const mockProducts: ChewyProduct[] = [
      {
        id: "1",
        name: "Greenies Original Dental Dog Treats",
        price: 12.99,
        imageUrl:
          "https://images.chewy.com/is/image/catalog/48401_MAIN._AC_SL1500_V1666897050_.jpg",
        category: "dental-treats",
        brand: "Greenies",
      },
      {
        id: "2",
        name: "Milk-Bone Original Dog Treats",
        price: 8.99,
        imageUrl:
          "https://images.chewy.com/is/image/catalog/48402_MAIN._AC_SL1500_V1666897050_.jpg",
        category: "dog-treats",
        brand: "Milk-Bone",
      },
      {
        id: "3",
        name: "Beggin Strips Bacon Flavor Dog Treats",
        price: 6.99,
        imageUrl:
          "https://images.chewy.com/is/image/catalog/48403_MAIN._AC_SL1500_V1666897050_.jpg",
        category: "dog-treats",
        brand: "Beggin",
      },
      {
        id: "4",
        name: "Kong Classic Dog Toy",
        price: 14.99,
        imageUrl:
          "https://images.chewy.com/is/image/catalog/48404_MAIN._AC_SL1500_V1666897050_.jpg",
        category: "dog-toys",
        brand: "Kong",
      },
      {
        id: "5",
        name: "Purina Pro Plan Adult Dog Food",
        price: 45.99,
        imageUrl:
          "https://images.chewy.com/is/image/catalog/48405_MAIN._AC_SL1500_V1666897050_.jpg",
        category: "dog-food",
        brand: "Purina",
      },
    ];

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Filter by category if specified
    const filteredProducts =
      category === "all"
        ? mockProducts
        : mockProducts.filter((product) => product.category === category);

    return filteredProducts.slice(0, limit);
  } catch (error) {
    console.error("Failed to fetch Chewy products:", error);
    return [];
  }
}

/**
 * Get a random Chewy product for Augie's suggestions
 * This helps make the suggestions more dynamic and fun
 */
export async function getRandomChewyProduct(): Promise<ChewyProduct | null> {
  try {
    const products = await fetchChewyProducts("all", 20);

    if (products.length === 0) {
      return null;
    }

    // Return a random product
    const randomIndex = Math.floor(Math.random() * products.length);
    return products[randomIndex];
  } catch (error) {
    console.error("Failed to get random Chewy product:", error);
    return null;
  }
}

/**
 * Get the most affordable Chewy product for a given budget
 * This ensures Augie's suggestions are always achievable
 */
export async function getAffordableChewyProduct(
  budget: number
): Promise<ChewyProduct | null> {
  try {
    const products = await fetchChewyProducts("all", 50);

    if (products.length === 0 || budget <= 0) {
      return null;
    }

    // Find products within budget, sorted by price (ascending)
    const affordableProducts = products
      .filter((product) => product.price <= budget)
      .sort((a, b) => a.price - b.price);

    // Return the most expensive product within budget (best value)
    return affordableProducts.length > 0
      ? affordableProducts[affordableProducts.length - 1]
      : null;
  } catch (error) {
    console.error("Failed to get affordable Chewy product:", error);
    return null;
  }
}

/**
 * Alternative implementation using a real pet product API
 * This could be implemented using services like Petco API, PetSmart API, etc.
 */
export async function fetchFromPetProductAPI(): Promise<ChewyProduct[]> {
  try {
    // Example using a hypothetical pet product API
    const apiKey = process.env.REACT_APP_PET_API_KEY;

    if (!apiKey) {
      throw new Error("Pet product API key not configured");
    }

    const response = await fetch(
      `https://api.petproducts.com/v1/products?category=dog&limit=10&apikey=${apiKey}`
    );

    if (response.ok) {
      const data = await response.json();
      return data.products.map((product: any) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.image_url,
        category: product.category,
        brand: product.brand,
      }));
    }
  } catch (error) {
    console.warn("Failed to fetch from pet product API:", error);
  }

  return [];
}
