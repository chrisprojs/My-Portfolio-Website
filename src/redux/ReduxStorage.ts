// store.ts
import { configureStore } from '@reduxjs/toolkit';
import likedProjectsReducer from './../pages/portfolio/likedProjectsReducer';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use localStorage for persistence
import { decrypt, encrypt } from './../crypto-js/CryptoJS';

// Create a transform to handle encryption and decryption
// const encryptTransform = createTransform(
//   (inboundState, key) => {
//     // Encrypt the state before saving to storage
//     return encrypt(JSON.stringify(inboundState));
//   },
//   (outboundState, key) => {
//     // Decrypt the state when loading from storage
//     return JSON.parse(decrypt(outboundState));
//   },
//   { whitelist: ['likedProjects'] } // Specify which reducers to transform
// );

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  // transforms: [encryptTransform],
};

// Configure store with middleware
const store = configureStore({
  reducer: {
    likedProjects: persistReducer(persistConfig, likedProjectsReducer),
  },
  middleware: (defaultMiddleware) => 
    defaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
        ignoredPaths: ['likedProjects'], // You can specify paths if needed
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;