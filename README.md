# Pig Farm Website

A responsive business website designed to introduce a pig farm, showcase its activities, and help customers inquire about pigs, piglets, and pork products.

## Project Objectives

- Present the farm and its activities professionally.
- Showcase products and available livestock.
- Build trust with potential customers.
- Make it easy to contact the farm and request product information.

## Key Features

- Homepage with farm introduction and featured offerings.
- About the farm and project overview.
- Listings for pigs, piglets, and meat products.
- Product descriptions, prices, and availability where provided.
- Farm image gallery.
- Contact information and location.
- WhatsApp contact or product inquiry form.
- Simple content management, if required.

## Technology Stack

- **Frontend:** React.js, TypeScript
- **Backend:** Python, FastAPI
- **Database:** Supabase PostgreSQL
- **Storage:** Supabase Storage for farm images, if required
- **Authentication:** Supabase Auth for protected administration, if required
- **Containerization:** Docker and Docker Compose

## Architecture

React provides the website interface. FastAPI supports custom APIs and business logic where needed. Supabase provides database and optional storage or authentication services. Docker standardizes the development environment.

## Getting Started

### Prerequisites

- Node.js and npm
- Python 3
- Docker and Docker Compose
- A Supabase project

### Environment Configuration

Configure the required environment variables using `.env.example`.

Frontend variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Backend variables, where needed:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` — server-side only, if required.

Do not commit real credentials or expose privileged keys in the frontend.

### Development

Install frontend dependencies:

```bash
cd frontend
npm install
npm run dev
```

Configure the backend dependencies and FastAPI application entry point before starting the API.

Run the containerized application after creating the required Docker configuration:

```bash
docker compose up --build
```

## Initial Scope

The first release focuses on farm information, product listings, and customer inquiries. Live livestock inventory, online payments, delivery management, and automated order processing are excluded unless separately approved.

## Quality Assurance

Test responsive layouts, navigation, image loading, product information, contact links, form validation, and error handling.

## Project Status

In development.

## License

To be determined by the project owner.
