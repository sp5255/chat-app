"use client";
import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";

import { EnhancedStore } from "@reduxjs/toolkit";
import { makeStore } from "@/lib/store";

export default function StoreProvider({ children } : {children : ReactNode}) {
  const storeRef = useRef<EnhancedStore>(undefined);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
