
export const CATEGORIES = [
  {
    name: 'Fashion',
    icon: '👗',
    color: 'bg-pink-100'
  },
  {
    name: 'Accessories',
    icon: '⌚',
    color: 'bg-emerald-100'
  },
  {
    name: 'Electronics',
    icon: '💻',
    color: 'bg-sky-100'
  },
  {
    name: 'Shoes',
    icon: '👟',
    color: 'bg-purple-100'
  },
  {
    name: 'Beauty',
    icon: '💄',
    color: 'bg-red-100'
  }
];

// Add "All" as an option when displaying product filters.
export const ALL_CATEGORIES = [
  {
    name: 'All',
    icon: '🛍️',
    color: 'bg-green-100'
  },
  ...CATEGORIES
];
