export interface FoodItem {
  id: string;
  name: string;
  category: string;
  image: string;
  nutritionalValuesPer100g: {
    calories: number;
    proteins: number;
    fats: number;
    carbohydrates: number;
    fibers: number;
    vitaminsAndMinerals: {
      calcium?: number;
      iron?: number;
      potassium?: number;
      vitaminC?: number;
      vitaminA?: number;
    };
  };
}

export const foodCategories = [
  "Todas",
  "Frutas",
  "Legumes e Verduras",
  "Grãos",
  "Proteínas",
  "Laticínios",
  "Industrializados",
];

export const mockFoods: FoodItem[] = [
  {
    id: "1",
    name: "Maçã",
    category: "Frutas",
    image: "/assets/alimento_maca.jpg",
    nutritionalValuesPer100g: {
      calories: 52,
      proteins: 0.3,
      fats: 0.2,
      carbohydrates: 14,
      fibers: 2.4,
      vitaminsAndMinerals: {
        vitaminC: 4.6,
        potassium: 107,
      },
    },
  },
  {
    id: "2",
    name: "Banana",
    category: "Frutas",
    image: "/assets/alimento_maca.jpg",
    nutritionalValuesPer100g: {
      calories: 89,
      proteins: 1.1,
      fats: 0.3,
      carbohydrates: 23,
      fibers: 2.6,
      vitaminsAndMinerals: {
        vitaminC: 8.7,
        potassium: 358,
      },
    },
  },
  {
    id: "3",
    name: "Brócolis",
    category: "Legumes e Verduras",
    image: "/assets/alimento_maca.jpg",
    nutritionalValuesPer100g: {
      calories: 34,
      proteins: 2.8,
      fats: 0.4,
      carbohydrates: 6.6,
      fibers: 2.6,
      vitaminsAndMinerals: {
        vitaminC: 89.2,
        calcium: 47,
        iron: 0.7,
      },
    },
  },
  {
    id: "4",
    name: "Arroz Integral",
    category: "Grãos",
    image: "/assets/alimento_maca.jpg",
    nutritionalValuesPer100g: {
      calories: 111,
      proteins: 2.6,
      fats: 0.9,
      carbohydrates: 23,
      fibers: 1.8,
      vitaminsAndMinerals: {
        iron: 0.4,
        potassium: 55,
      },
    },
  },
  {
    id: "5",
    name: "Peito de Frango Cozido",
    category: "Proteínas",
    image: "/assets/alimento_maca.jpg",
    nutritionalValuesPer100g: {
      calories: 165,
      proteins: 31,
      fats: 3.6,
      carbohydrates: 0,
      fibers: 0,
      vitaminsAndMinerals: {
        potassium: 256,
      },
    },
  },
  {
    id: "6",
    name: "Leite Integral",
    category: "Laticínios",
    image: "/assets/alimento_maca.jpg",
    nutritionalValuesPer100g: {
      calories: 61,
      proteins: 3.2,
      fats: 3.3,
      carbohydrates: 4.8,
      fibers: 0,
      vitaminsAndMinerals: {
        calcium: 113,
      },
    },
  },
  {
    id: "7",
    name: "Biscoito Recheado",
    category: "Industrializados",
    image: "/assets/alimento_maca.jpg",
    nutritionalValuesPer100g: {
      calories: 480,
      proteins: 5,
      fats: 20,
      carbohydrates: 70,
      fibers: 2,
      vitaminsAndMinerals: {},
    },
  },
  {
    id: "8",
    name: "Salmão Grelhado",
    category: "Proteínas",
    image: "/assets/alimento_maca.jpg",
    nutritionalValuesPer100g: {
      calories: 208,
      proteins: 20,
      fats: 13,
      carbohydrates: 0,
      fibers: 0,
      vitaminsAndMinerals: {
        vitaminD: 10,
        potassium: 363,
      },
    },
  },
  {
    id: "9",
    name: "Batata Doce",
    category: "Legumes e Verduras",
    image: "/assets/alimento_maca.jpg",
    nutritionalValuesPer100g: {
      calories: 86,
      proteins: 1.6,
      fats: 0.1,
      carbohydrates: 20,
      fibers: 3,
      vitaminsAndMinerals: {
        vitaminA: 14187,
        vitaminC: 2.4,
        potassium: 337,
      },
    },
  },
  {
    id: "10",
    name: "Aveia em Flocos",
    category: "Grãos",
    image: "/assets/alimento_maca.jpg",
    nutritionalValuesPer100g: {
      calories: 389,
      proteins: 16.9,
      fats: 6.9,
      carbohydrates: 66.3,
      fibers: 10.6,
      vitaminsAndMinerals: {
        iron: 4.7,
        magnesium: 177,
      },
    },
  },
];