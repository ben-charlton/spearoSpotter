# SpearoSpotter

🚀 **Live Demo:** [SpearoSpotter](https://spearospotter.online/)

SpearoSpotter is a full‐stack web application that provides divers with **real‐time recommendations** for the best dive spots based on weather and water conditions. The app analyzes factors such as **wave height/directions, wind speed/directions, and tide levels** to determine the most suitable diving locations.

---

## How It Works

SpearoSpotter calculates a **diveability score** for dive spots around Sydney by evaluating:

1. **Swell Impact**  
   - Computes wave power using **primary and secondary swell data**.  
   - Adjusts for **angle differences** between the swell direction and the dive site’s orientation using exponential decay functions, reflecting the diminishing impact as the angle deviates from head-on.  
   - Considers the interaction between primary and secondary swells, applying a small penalty for large angular differences.

2. **Wind Impact**  
   - Analyzes the wind’s direction relative to the dive spot’s protected angle.  
   - Applies an exponential penalty when wind shifts from a protected to an unprotected angle, increasing the exposure penalty as the deviation grows.

3. **Tide Impact**  
   - Selects the tide event closest to the expected dive time (e.g., dives typically occurring at 7 AM).  
   - Sites are prioritized based on how significantly the tide influences local conditions.

4. **Refraction Impact**  
   - Evaluates the difference between the swell direction and the spot’s facing direction.  
   - A more direct swell (closer to the spot’s facing direction) yields a greater impact.

---

## Tech Stack

### Backend (Node.js, TypeScript, Express)
- **REST API:** Serves dive recommendations and real-time condition data.
- **PostgreSQL:** Stores dive spot and weather condition data.
- **Knex.js:** Manages database operations.
- **Redis:** Caches API responses for faster response times.

### Frontend (React, TypeScript, Vite)
- **Material UI (MUI):** Used for styling.
- **Nginx:** Serves the pre-built static files.

---

## Deployment

The application is deployed on **Google Kubernetes Engine (GKE)**. Both the frontend and backend are containerized and built using Cloud Build/Docker and exposed via an Ingress. A domain I own is then resolved to this Ingress.

---

## Running Locally

For local development, the application is built and run using Docker Compose. To build and run the app locally, execute:

```sh
make local_build
```
Then navigate to http://localhost:3000 in your browser.