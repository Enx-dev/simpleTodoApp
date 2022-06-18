import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { Provider } from "react-redux";
import { makeStore, persistor } from "./App/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { HTML5Backend } from "react-dnd-html5-backend";

const opts = {
  enableMouseEvents: true,
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={makeStore}>
      <PersistGate loading={null} persistor={persistor}>
        <DndProvider backend={HTML5Backend} options={opts}>
          <App />
        </DndProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
