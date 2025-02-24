import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./main.css";

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
