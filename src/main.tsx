import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./router.tsx";
import { RouterProvider } from "react-router-dom";
import { persistor, store } from "./store/store.ts";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
