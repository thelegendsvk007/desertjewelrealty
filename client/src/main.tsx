import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Helmet } from "react-helmet";

createRoot(document.getElementById("root")!).render(
  <>
    <Helmet>
      <title>Desert Jewel Realty - Bonding Dreams To Reality</title>
      <meta name="description" content="Discover luxury properties across the UAE with Dubai's premier real estate brokerage. Explore exclusive residential and commercial opportunities." />
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;600&family=Playfair+Display:wght@400;500;600&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
    </Helmet>
    <App />
  </>
);
