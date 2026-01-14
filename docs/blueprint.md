# **App Name**: HealthyScan

## Core Features:

- User Authentication: Secure user registration, login, and session management using email, password, and JWT.
- Barcode Scanning: Scan product barcodes using the device camera to fetch product information.
- Product Details: Fetch product details from OpenFoodFacts API using the barcode as a key.
- Ingredient Analysis: Analyze product ingredients and nutritional data based on predefined lists of harmful and beneficial ingredients.
- Health Score: Generate a health score (0-100) and provide health impact explanations in simple language, along with warnings (allergy, diabetes, high sodium). An LLM may be used as a tool to generate simple health explanations.
- Scan History: Maintain a scan history for each user, allowing them to review previously scanned products.
- Responsive UI: Develop a clean, responsive UI for displaying product details, health scores, and scan history.

## Style Guidelines:

- Primary color: Forest green (#388E3C), representing health and nature.
- Background color: Very light green (#F1F8E9), creating a calm, clean feel.
- Accent color: Soft yellow (#FDD835), for highlighting important information and calls to action.
- Body and headline font: 'PT Sans', a humanist sans-serif font offering a balance of modernity and warmth, making it ideal for both headlines and body text.
- Use simple, intuitive icons to represent ingredients, health scores, and warnings.
- Employ a clean, card-based layout to present product information and analysis results.
- Use subtle animations for loading states and transitions to enhance user experience.