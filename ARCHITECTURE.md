# Architecture & Design Decisions

## Overview

This Inventory Management app is built with a focus on clean code, modularity, and scalability. The architecture follows React Native best practices while keeping the codebase simple and maintainable.

## Technology Stack

### Core Technologies
- **React Native + Expo**: Cross-platform mobile development
- **TypeScript**: Type safety and better developer experience
- **Expo Router**: File-based routing system
- **NativeWind**: Tailwind CSS for React Native styling

### Why These Choices?

1. **Expo**: Simplifies development with managed workflow, no native code compilation needed
2. **Expo Router**: File-based routing is intuitive and reduces boilerplate
3. **NativeWind**: Enables rapid UI development with utility classes
4. **TypeScript**: Catches errors at compile time, improves code quality

## Architecture Patterns

### 1. Component Architecture

```
Screen Components (app/)
  ↓
Reusable Components (components/)
  ↓
Custom Hooks (hooks/)
  ↓
Utilities (utils/)
```

**Benefits:**
- Clear separation of concerns
- Easy to test individual pieces
- Reusable components reduce code duplication

### 2. State Management

**Approach**: Pure React hooks (useState, useEffect)

**Why not Redux/MobX?**
- For this app's scope, local state is sufficient
- Reduces complexity and bundle size
- Easier for developers to understand
- Custom hooks encapsulate state logic effectively

**State Flow:**
```
User Action → Screen Component → Custom Hook → Storage Utility → State Update → Re-render
```

### 3. Data Layer

**Mock Storage Pattern**: Simulates API behavior with async/await

**Benefits:**
- Easy to replace with real API later
- Maintains async patterns from the start
- No backend required for development
- Realistic development experience

**Storage Structure:**
```typescript
// In-memory arrays (simulates database)
users: User[]
products: Product[]
transactions: Transaction[]
```

## Folder Structure Rationale

### `/app`
- Contains all screen components
- Follows Expo Router convention
- File-based routing: `products.tsx` → `/products`

### `/components`
- Reusable UI components
- Self-contained with props interface
- No business logic (presentational components)

### `/hooks`
- Custom hooks encapsulate business logic
- Reusable across multiple screens
- Handle loading states, errors, data fetching

### `/utils`
- Pure functions (no side effects)
- Validation, formatting, time helpers
- Mock storage utilities

### `/types`
- Centralized TypeScript definitions
- Shared across the entire app
- Single source of truth for data structures

## Design Patterns Used

### 1. Custom Hooks Pattern
```typescript
// Encapsulates product-related logic
const { products, loading, createProduct } = useProducts();
```

**Benefits:**
- Reusable logic
- Clean component code
- Easy to test

### 2. Composition Pattern
```typescript
// Small, focused components composed together
<View>
  <Header />
  <ProductCard />
  <Button />
</View>
```

### 3. Container/Presentational Pattern
- Screens are containers (handle logic)
- Components are presentational (display UI)

## Code Quality Principles

### 1. Single Responsibility
Each component/hook/function has one clear purpose

### 2. DRY (Don't Repeat Yourself)
- Reusable components
- Shared utilities
- Custom hooks for common patterns

### 3. Type Safety
- Strong TypeScript types
- No `any` types
- Interfaces for all data structures

### 4. Error Handling
- Try-catch blocks in async operations
- User-friendly error messages
- Validation at form level

## Trade-offs & Decisions

### ✅ What We Did

1. **Local State Only**
   - **Pro**: Simple, no external dependencies
   - **Con**: Data lost on app restart
   - **Trade-off**: Acceptable for demo/assignment

2. **In-Memory Storage**
   - **Pro**: No backend needed, fast development
   - **Con**: Not persistent
   - **Trade-off**: Easy to replace with AsyncStorage/API later

3. **No State Management Library**
   - **Pro**: Less complexity, smaller bundle
   - **Con**: Could get complex with more features
   - **Trade-off**: Appropriate for current scope

4. **File-based Routing**
   - **Pro**: Intuitive, less boilerplate
   - **Con**: Less flexible than React Navigation
   - **Trade-off**: Expo Router is modern and sufficient

### ❌ What We Didn't Do (And Why)

1. **Redux/Context API**
   - Not needed for current scope
   - Would add unnecessary complexity

2. **AsyncStorage**
   - Assignment specifies "no backend, simulate API"
   - Can be added later easily

3. **Form Libraries (Formik/React Hook Form)**
   - Simple forms don't need heavy libraries
   - Manual validation is clearer for learning

4. **UI Component Libraries**
   - NativeWind provides enough styling power
   - Custom components are more flexible

## Scalability Considerations

### If App Grows:

1. **State Management**
   - Add Context API for global state
   - Or migrate to Redux/Zustand if needed

2. **Data Persistence**
   - Replace mock storage with AsyncStorage
   - Or integrate with backend API

3. **Performance**
   - Add React.memo for expensive components
   - Implement virtualization for long lists
   - Add pagination to product list

4. **Testing**
   - Add Jest + React Native Testing Library
   - Unit tests for utilities
   - Integration tests for hooks

## Security Considerations

### Current Implementation
- Client-side validation only
- No authentication/authorization
- In-memory storage (not secure)

### For Production:
- Backend API with authentication
- Input sanitization
- Rate limiting
- Encrypted storage
- Secure API endpoints

## Performance Optimizations

### Implemented:
- ✅ Lazy loading with Expo Router
- ✅ Efficient re-renders (local state)
- ✅ Pagination for transaction history
- ✅ Optimized list rendering

### Could Add:
- React.memo for components
- useMemo/useCallback for expensive operations
- Virtualized lists (FlatList optimization)
- Image caching

## Testing Strategy (Not Implemented)

### Recommended:
1. **Unit Tests**: Utilities, validation functions
2. **Hook Tests**: Custom hooks with React Testing Library
3. **Component Tests**: UI components
4. **Integration Tests**: Screen flows

## Conclusion

This architecture prioritizes:
- **Simplicity**: Easy to understand and maintain
- **Modularity**: Clear separation of concerns
- **Scalability**: Can grow without major refactoring
- **Developer Experience**: TypeScript, clear structure, good patterns

The codebase is production-ready in structure, but uses mock data for demonstration purposes. Replacing the storage layer with a real backend would be straightforward.

