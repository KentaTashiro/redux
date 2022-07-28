import { configureStore } from '@reduxjs/toolkit';

import apiAccessReducer from '../features/apiAccess/apiAccessSlice';

export const store = configureStore({
  reducer: {
    apiAccess: apiAccessReducer,
  },
});

// Sliceをstoreに登録する方法について
// ◆storeへの登録方法
//    configureStoreを使用
