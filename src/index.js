import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import Store from "./Store/Store";
import { QueryClientProvider, QueryClient } from "react-query";
import { Analytics } from "@vercel/analytics/react";
import "./style.css";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={Store}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    <Analytics />
  </Provider>
);
