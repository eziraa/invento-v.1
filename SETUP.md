# Quick Setup Guide

## Initial Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Run on device/simulator:**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your phone

## Important Notes

### Assets Folder
The `assets/` folder is required by Expo. You'll need to add:
- `icon.png` - App icon (1024x1024)
- `splash.png` - Splash screen (1242x2436)
- `adaptive-icon.png` - Android adaptive icon (1024x1024)
- `favicon.png` - Web favicon (48x48)

For now, you can use placeholder images or generate them using:
- [Expo Asset Generator](https://www.npmjs.com/package/@expo/asset-generator)
- Or create simple colored squares as placeholders

### NativeWind Setup
The project is configured for NativeWind v4. If you encounter styling issues:

1. Make sure `global.css` is imported in `app/_layout.tsx` (already done)
2. Clear cache: `npx expo start -c`
3. Restart Metro bundler

### TypeScript Errors
If you see TypeScript errors before installing dependencies, that's normal. Run `npm install` first, then the errors should resolve.

## Troubleshooting

### "Cannot find module" errors
- Run `npm install` to install dependencies
- Clear cache: `npx expo start -c`

### NativeWind styles not working
- Ensure `global.css` is imported in `app/_layout.tsx`
- Check `tailwind.config.js` includes correct content paths
- Clear cache and restart

### Navigation not working
- Ensure Expo Router is properly configured
- Check that all screen files are in the `app/` directory
- Verify `app/_layout.tsx` is set up correctly

## Project Structure Verification

Make sure you have:
```
✓ app/
  ✓ _layout.tsx
  ✓ index.tsx
  ✓ register-user.tsx
  ✓ add-product.tsx
  ✓ products.tsx
  ✓ product-detail/[id].tsx
  ✓ history.tsx
✓ components/
  ✓ Button.tsx
  ✓ InputField.tsx
  ✓ ProductCard.tsx
  ✓ Pagination.tsx
  ✓ Header.tsx
✓ hooks/
  ✓ useUsers.ts
  ✓ useProducts.ts
  ✓ useTransactions.ts
✓ utils/
  ✓ validation.ts
  ✓ formatting.ts
  ✓ time.ts
  ✓ storage.ts
✓ types/
  ✓ index.ts
✓ Configuration files (package.json, tsconfig.json, etc.)
```

## Next Steps

1. Install dependencies: `npm install`
2. Add placeholder assets to `assets/` folder
3. Start the app: `npm start`
4. Test all features:
   - Register a user
   - Add products
   - Adjust stock
   - View transaction history

Happy coding! 🚀

