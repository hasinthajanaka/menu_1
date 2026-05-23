export interface MenuItem {
  id: string;
  name: string;
  frenchName: string;
  category: 'mains' | 'desserts' | 'drinks';
  prices: {
    single?: string;
    solo?: string;
    sharing?: string;
    custom?: string;
  };
  description: string;
  ingredients: string[];
  badges: string[];
  pairing?: string;
}

export const menuItems: MenuItem[] = [
  // MAINS
  {
    id: 'beef-burgundy',
    name: 'Beef Burgundy Stew',
    frenchName: 'Boeuf Bourguignon',
    category: 'mains',
    prices: { single: '$24' },
    description: 'A masterpiece of classic French comfort. Prime beef chuck is slow-cooked for eight hours in premium Burgundy red wine, infused with aromatic herbs, and finished with glazed pearl onions, sautéed wild mushrooms, and sweet caramelized baby carrots.',
    ingredients: ['Prime Beef Chuck', 'Burgundy Red Wine', 'Pearl Onions', 'Cremini Mushrooms', 'Thyme & Rosemary', 'Garlic', 'Bone Broth'],
    badges: ['Nut-Free', 'Gluten-Free Available'],
    pairing: 'Vin du Jour - Robust Red (Côtes du Rhône)'
  },
  {
    id: 'roast-chicken',
    name: 'Roast Chicken with Tarragon',
    frenchName: 'Poulet à l’Estragon',
    category: 'mains',
    prices: { single: '$21' },
    description: 'Tender, skin-crisp pan-roasted organic free-range chicken breast served swimming in a rich, velvety reduction of dry white wine, double cream, minced shallots, and fragrant fresh tarragon leaves.',
    ingredients: ['Free-Range Chicken Breast', 'Fresh Tarragon', 'Chablis White Wine', 'French Double Cream', 'Shallots', 'Butter'],
    badges: ['Nut-Free', 'Egg-Free'],
    pairing: 'Vin du Jour - Crisp White (Chablis)'
  },
  {
    id: 'seared-scallops',
    name: 'Seared Scallops',
    frenchName: 'Saint-Jacques Poêlées',
    category: 'mains',
    prices: { single: '$26' },
    description: 'U-10 Atlantic sea scallops dry-seared to develop an exquisite golden-brown crust while remaining buttery and tender inside. Presented over a bed of silky, smooth parsnip purée and drizzled with a hazelnut-infused brown butter (beurre noisette).',
    ingredients: ['U-10 Sea Scallops', 'Parsnip Purée', 'Brown Butter', 'Lemon Zest', 'Micro-greens', 'Hazelnuts (Optional)'],
    badges: ['Gluten-Free', 'Soy-Free'],
    pairing: 'Vin du Jour - Brut Champagne or Sancerre'
  },
  {
    id: 'ratatouille',
    name: 'Ratatouille',
    frenchName: 'Ratatouille au Four',
    category: 'mains',
    prices: { single: '$18' },
    description: 'An elegant presentation of Provence. Razor-thin roundels of yellow squash, fresh zucchini, eggplant, and ripe Roma tomatoes are beautifully arranged in concentric spirals over a slow-roasted red bell pepper, garlic, and herb coulis.',
    ingredients: ['Eggplant', 'Zucchini', 'Yellow Squash', 'Roma Tomato', 'Red Bell Pepper', 'Extra Virgin Olive Oil', 'Herbes de Provence'],
    badges: ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free'],
    pairing: 'Vin du Jour - Pale Rosé (Provence)'
  },
  
  // DESSERTS
  {
    id: 'creme-brulee',
    name: 'Crème Brûlée',
    frenchName: 'Crème Brûlée à la Vanille',
    category: 'desserts',
    prices: { solo: '$9', sharing: '$16' },
    description: 'A timeless French classic. An incredibly rich, velvety custard infused with real Madagascar bourbon vanilla beans, blanketed by a fragile, hand-torched caramelized cane sugar crust that shatters perfectly at the scoop of a spoon.',
    ingredients: ['Madagascar Vanilla Bean', 'Egg Yolks', 'Heavy Cream', 'Organic Sugar', 'Pinch of Sea Salt'],
    badges: ['Vegetarian', 'Gluten-Free'],
    pairing: 'Sauternes or Sweet Muscat'
  },
  {
    id: 'tarte-tatin',
    name: 'Tarte Tatin',
    frenchName: 'Tarte Tatin aux Pommes',
    category: 'desserts',
    prices: { solo: '$8', sharing: '$18' },
    description: 'A delightful upside-down tart of Gala and Granny Smith apples caramelizing in butter and brown sugar until deep golden and translucent. Baked beneath a flaky, buttery puff pastry and served warm with a dollop of traditional French crème fraîche.',
    ingredients: ['Gala Apples', 'Salted Butter', 'Brown Sugar', 'Puff Pastry', 'Aged Crème Fraîche'],
    badges: ['Vegetarian'],
    pairing: 'Calvados or Warm Apple Cider'
  },
  {
    id: 'chocolate-mousse',
    name: 'Dark Chocolate Mousse',
    frenchName: 'Mousse au Chocolat Noir',
    category: 'desserts',
    prices: { solo: '$8', sharing: '$20' },
    description: 'Intense and airy. Crafted from 72% single-origin Valrhona dark chocolate, cream, and fluff-whipped egg whites, this cloud-like mousse is garnished with delicate Maldon sea salt flakes and fine orange zest to elevate the cacao experience.',
    ingredients: ['72% Valrhona Dark Chocolate', 'Organic Eggs', 'Espresso Powder', 'Maldon Sea Salt', 'Fresh Orange Zest'],
    badges: ['Vegetarian', 'Gluten-Free', 'Nut-Free'],
    pairing: 'Vintage Ruby Port'
  },
  {
    id: 'profiteroles',
    name: 'Profiteroles',
    frenchName: 'Profiteroles au Chocolat',
    category: 'desserts',
    prices: { solo: '$10 / 3 pieces', sharing: '$20 / 6 pieces' },
    description: 'Choux pastry cream puffs baked until crisp and golden, sliced and stuffed with organic vanilla bean gelato. Served with a dramatic, table-side hot dark chocolate ganache cascade poured right before your eyes.',
    ingredients: ['Pâte à Choux', 'Vanilla Bean Gelato', '54% Dark Chocolate Ganache', 'Sliced Toasted Almonds'],
    badges: ['Vegetarian'],
    pairing: 'Hot French Roast Espresso or Cognac'
  },

  // DRINKS
  {
    id: 'vin-du-jour',
    name: 'Vin Du Jour',
    frenchName: 'Le Vin de la Maison',
    category: 'drinks',
    prices: { custom: '$10 per glass | $48 per bottle' },
    description: 'Our house cellar master’s weekly selection of artisanally crafted French wines, showcasing the finest expressions of French terroirs (Bordeaux, Burgundy, Rhône, or Provence). Available in Red, White, or Rosé.',
    ingredients: ['Artisanal grapes', 'Aged in French Oak barrels', 'Sourced from organic family domains'],
    badges: ['Vegan', 'Gluten-Free', 'Organic'],
    pairing: 'Curated by our Sommelier to perfectly match your culinary selections'
  },
  {
    id: 'french-coffee',
    name: 'French Long Coffee',
    frenchName: 'Café Allongé',
    category: 'drinks',
    prices: { single: '$10' },
    description: 'A Parisian classic robust double shot of sustainably sourced Arabica espresso pulled long over steaming filtered water. Rich, deep, and featuring a beautiful thick hazelnut-colored crema.',
    ingredients: ['100% Arabica Espresso Beans', 'Artesian Water'],
    badges: ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free'],
    pairing: 'Pairs divine with our Tarte Tatin or Warm Profiteroles'
  },
  {
    id: 'sparkling-water',
    name: 'Sparkling Water',
    frenchName: 'Eau Pétillante',
    category: 'drinks',
    prices: { single: '$8' },
    description: 'Naturally sparkling premium spring mineral water sourced from high alpine reservoirs, served ice-cold with fine slices of organic green lime or fresh Meyer lemon.',
    ingredients: ['Naturally Carbonated Spring Water', 'Fresh Lime or Lemon Slices'],
    badges: ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free', 'Sugar-Free'],
    pairing: 'A pristine palate cleanser perfect before or during dinner'
  }
];
