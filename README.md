# GlamBox

## Description

GlamBox is a web application designed to provide skincare solutions that fit both your vibe and budget. The application interacts with external APIs to fetch skincare products based on various user filters such as brand, product type, currency, and more. It allows users to seamlessly browse skincare options while having the ability to apply custom filters for a personalized experience.

Additionally, GlamBox uses the Forex API to convert product prices into multiple currencies, allowing users from different regions to view and compare prices in their preferred currency. This integration enhances the user experience by providing real-time currency conversion.

## API Key

This project uses two external APIs for fetching data:

### Makeup API
API URL: [https://makeup-api.herokuapp.com/](https://makeup-api.herokuapp.com/)

### Forex API
API URL: [https://www.exchangerate-api.com/](https://www.exchangerate-api.com/)

## Setup Instructions

### Prerequisites
- Node.js installed on your machine.
- npm (Node Package Manager) should also be available.

### Steps to Set Up the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/dignapatel0/GlamBox.git
2. Navigate to the project folder:
    ```bash
    cd GlamBox
3. Install the necessary dependencies:
    ```bash
    npm install
4. Install Axios for API requests:
    ```bash
    npm install axios
5. Start the development server:
    ```bash
    npm run dev 
