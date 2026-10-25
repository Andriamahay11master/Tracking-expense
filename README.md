# Expense Tracker

A personal expense-tracking dashboard built with React, TypeScript, Vite, and Tailwind CSS. It includes a monthly dashboard, spending charts, transaction and category views, and forms for adding expenses and categories.

## Features

- Google sign-in with Firebase Authentication
- Monthly spending summary and charts
- Transaction list with search and category filtering
- Category list and forms for adding expenses and categories
- Firebase Firestore service helpers for expense and category data

> **Current status:** The dashboard currently displays local sample data from `src/data`. Its add, edit, and delete callbacks are placeholders, so changes made through the forms are not persisted yet. Firestore helper functions are present but are not yet wired into the dashboard.

## Requirements

- Node.js 20.19+ or 22.12+ (required by the current Vite version)
- npm
- A Firebase project with Google Authentication enabled for sign-in

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root and provide the Firebase web API key:

   ```dotenv
   VITE_API_KEY_FIREBASE=your_firebase_web_api_key
   ```

   The remaining Firebase project settings are currently defined in `firebase.ts`. For a different Firebase project, update those settings there as well.

3. In the Firebase console, enable the Google sign-in provider and add the local development domain (typically `localhost`) to the authorized domains.

4. Start the development server:

   ```bash
   npm run dev
   ```

   Open the local URL printed by Vite in your browser.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Tech stack

- React and TypeScript
- Vite
- Tailwind CSS 3
- Firebase Authentication and Cloud Firestore
- Recharts
- Lucide React