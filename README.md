# TripReview — MERN Travel Discovery App

A full-stack travel discovery and review platform built with MongoDB, Express, React and Node.js.

## Features
- Responsive destination discovery with search and category filters
- Destination detail pages with travel information and reviews
- Register/login using JWT stored in an HTTP-only cookie
- Add, edit and delete your own reviews (rating, cost, experience)
- Save destinations to a personal wishlist
- Create and view trip plans
- AI travel assistant endpoint (uses OpenAI when configured; otherwise returns a useful local planning response)
- MongoDB seed data for 12 destinations
- Demo-friendly fallback images from Unsplash Source URLs

## Requirements
- Node.js 18+
- MongoDB Community Server or MongoDB Atlas connection string

## Setup
1. Install Node.js and start MongoDB.
2. Copy `server/.env.example` to `server/.env` and set `MONGO_URI`.
3. From the project root:
   ```bash
   npm run install:all
   npm run seed
   npm run dev
   ```
4. Open http://localhost:5173

Server runs at http://localhost:5000. Client proxies `/api` requests to the server.

## Optional AI
Set `OPENAI_API_KEY` and `OPENAI_MODEL` in `server/.env` to enable the OpenAI-powered travel assistant. Without a key, the app uses its built-in local response.

## Demo
Create an account from the Register page. Reviews, wishlist and trip plans require login.

## API overview
- `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`
- `GET /api/destinations`, `GET /api/destinations/:id`
- `POST /api/reviews`, `PUT /api/reviews/:id`, `DELETE /api/reviews/:id`
- `GET /api/users/me/saved`, `POST /api/users/me/saved/:destinationId`
- `GET /api/trips`, `POST /api/trips`
- `POST /api/ai/chat`

This is a starter production-style project, not a hosted service. Configure HTTPS, secure cookie settings, rate limiting, image uploads and production secrets before deployment.


## Interactive map (added)
- Open the **Map** link in the navigation or visit `/map`.
- Uses React Leaflet and OpenStreetMap tiles; no Google Maps API key is required.
- Includes search, category filtering, destination markers, marker popups, and a destination list.
- The 100 bundled Indian destination records now include approximate latitude/longitude coordinates. These are discovery-map area coordinates, not guaranteed entrance or property coordinates.
- OpenStreetMap attribution is displayed. Follow the tile usage policy: https://operations.osmfoundation.org/policies/tiles/

After extracting, run `npm run install:all` from the project root. Configure `server/.env`, start MongoDB, then run `npm run dev`. If your MongoDB already contains the older 100-destination records, run `npm run seed:100` from the root to update them with coordinates (the import uses upserts and does not delete existing destinations).

## Back button navigation

A shared Back button is displayed below the site header on every route. It returns to the previous in-app/browser history entry when one exists. If a visitor opens a page directly (with no previous in-app entry), it safely navigates to the homepage.
