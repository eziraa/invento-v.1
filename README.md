# Inventory Management App

A complete React Native + Expo mobile application for managing inventory, products, and tracking stock transactions.

## 🚀 Features

- **User Registration**: Register users with email and full name
- **Product Management**: Add products with SKU, name, price, and quantity
- **Stock Adjustment**: Adjust product stock levels with validation (prevents negative quantities)
- **Product Status**: View detailed product information including SKU, quantity, and last updated timestamp
- **Transaction History**: View all stock changes with pagination support
- **Clean UI/UX**: Modern, intuitive interface built with NativeWind

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (will be installed automatically)
- iOS Simulator (for Mac) or Android Emulator / Expo Go app on your phone

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Run on your device:**
   - Scan the QR code with Expo Go app (iOS/Android)
   - Or press `i` for iOS simulator
   - Or press `a` for Android emulator

## 📁 Project Structure

```
inventory-management-app/
├── app/                      # Expo Router screens
│   ├── _layout.tsx          # Root layout with navigation
│   ├── index.tsx            # Home screen
│   ├── register-user.tsx    # User registration
│   ├── add-product.tsx      # Add new product
│   ├── products.tsx         # Product list
│   ├── product-detail/      # Product detail screen
│   │   └── [id].tsx
│   └── history.tsx          # Transaction history
├── components/              # Reusable components
│   ├── Button.tsx
│   ├── InputField.tsx
│   ├── ProductCard.tsx
│   ├── Pagination.tsx
│   └── Header.tsx
├── hooks/                   # Custom React hooks
│   ├── useUsers.ts
│   ├── useProducts.ts
│   └── useTransactions.ts
├── types/                   # TypeScript type definitions
│   └── index.ts
├── utils/                   # Utility functions
│   ├── validation.ts
│   ├── formatting.ts
│   ├── time.ts
│   └── storage.ts
├── global.css               # NativeWind global styles
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
├── app.json                 # Expo configuration
└── package.json
```

## 🏗️ Architecture

### Design Decisions

1. **Expo Router**: Used for file-based routing, providing a simple and intuitive navigation structure
2. **NativeWind**: Tailwind CSS for React Native, enabling rapid UI development with utility classes
3. **Local State Management**: Pure React hooks (useState, useEffect) for state management - no external libraries needed
4. **AsyncStorage**: Persistent local storage that simulates backend API behavior with async/await patterns
5. **TypeScript**: Strong typing throughout for better developer experience and fewer runtime errors
6. **Modular Architecture**: Separation of concerns with dedicated folders for screens, components, hooks, and utilities

### Key Components

- **Screens**: Each feature has its own screen component
- **Reusable Components**: Button, InputField, ProductCard, Pagination for consistent UI
- **Custom Hooks**: Encapsulate business logic (useUsers, useProducts, useTransactions)
- **Utilities**: Validation, formatting, time helpers, and mock storage

### State Management

- All state is managed locally using React hooks
- Custom hooks abstract away the complexity of state management
- AsyncStorage utilities simulate backend API calls with proper async/await patterns
- **Data persists permanently** - All data is saved to device storage and survives app restarts

### Validation & Error Handling

- Form validation using utility functions
- Real-time error display in form fields
- Alert dialogs for success/error messages
- Prevents negative stock quantities
- Validates email format, SKU uniqueness, etc.

### Pagination

- Transaction history supports pagination
- Configurable items per page (default: 10)
- Page navigation with Previous/Next buttons
- Page number indicators

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface with consistent color scheme
- **Responsive Layout**: Works on various screen sizes
- **Visual Feedback**: Loading states, error messages, success alerts
- **Stock Status Indicators**: Color-coded status (In Stock, Low Stock, Out of Stock)
- **Transaction Icons**: Visual indicators for different transaction types
- **Pull to Refresh**: Refresh data by pulling down on lists
- **Smooth Navigation**: Intuitive navigation flow between screens

## 📝 Code Quality

- **TypeScript**: Full type safety
- **Modular Code**: Reusable components and hooks
- **Clean Code Principles**: Single responsibility, DRY, clear naming
- **Comments**: Important logic is documented
- **Error Handling**: Comprehensive error handling throughout

## 🔄 Data Flow

1. User interacts with UI
2. Screen component calls custom hook function
3. Hook calls storage utility (simulates API)
4. Storage utility saves/loads data from AsyncStorage (persistent)
5. Hook updates state
6. Component re-renders with new data

### Data Persistence

- **AsyncStorage**: All data (users, products, transactions) is stored locally using AsyncStorage
- **Automatic Persistence**: Data is automatically saved on create/update operations
- **Data Recovery**: All data persists across app restarts and device reboots
- **Storage Keys**: Data is stored with keys prefixed with `@inventory_app:`
- **Error Handling**: Comprehensive error handling for storage operations

## 🧪 Testing the App

1. **Register a User**: Go to "Register User" and create an account
2. **Add Products**: Navigate to "Add Product" and register some products
3. **View Products**: Browse all products in the "View Products" screen
4. **Adjust Stock**: Open a product detail and use +/- buttons or custom adjustment
5. **View History**: Check transaction history to see all stock changes

## 🚨 Important Notes

- **Persistent Storage**: All data is stored locally using AsyncStorage and persists across app restarts
- **User Required**: Some features (like adding products) require a registered user
- **SKU Uniqueness**: SKU must be unique (case-insensitive)
- **Stock Validation**: Quantity cannot go below zero
- **Data Persistence**: Your users, products, and transactions are saved locally and will remain even after closing the app

## 📦 Dependencies

- `expo`: Expo SDK
- `expo-router`: File-based routing
- `react-native`: React Native framework
- `nativewind`: Tailwind CSS for React Native
- `typescript`: TypeScript support
- `@react-native-async-storage/async-storage`: Persistent local storage
- `react-native-reanimated`: Animation library

## 🎯 Future Enhancements (Not Implemented)

- ✅ **Persistent storage using AsyncStorage** - **IMPLEMENTED!**
- Backend API integration
- User authentication
- Product search and filtering
- Export transaction history
- Product categories
- Image upload for products
- Barcode scanning

## 📄 License

This project is created for educational/demonstration purposes.

---

**Built with ❤️ using React Native + Expo + NativeWind**

