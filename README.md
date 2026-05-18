# MedAppointments

A web application for scheduling medical appointments. Patients can register, browse doctors by specialty, and manage their appointments.

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** PostgreSQL (Neon)
- **Authentication:** JWT
- **Frontend:** HTML, CSS, JavaScript

## Project Structure
medcitas/
├── backend/
│   ├── src/
│   │   ├── config/        # Database connection and migrations
│   │   ├── middlewares/   # JWT authentication middleware
│   │   ├── repositories/  # Database queries
│   │   ├── routes/        # API endpoints
│   │   ├── services/      # Business logic
│   │   └── app.js         # Entry point
│   └── tests/             # Jest tests
└── frontend/              # HTML pages

## Prerequisites

- Node.js v18+
- A [Neon](https://neon.tech) PostgreSQL database

**Note:** You will need to create a free PostgreSQL database on [Neon](https://neon.tech) and paste the connection string in your `.env` file.The database schema and seed data are included in this repository.

## Setup

1. Clone the repository:
```bash
git clone https://github.com/Castasebas04/MedAppointments.git
cd MedAppointments/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file inside `backend/`:
DATABASE_URL=your_neon_connection_string
JWT_SECRET=your_secret_key
PORT=3000
4. Run database migrations:
```bash
npm run migrate
```

5. Seed initial data (specialties, doctors, schedules):
```bash
npm run seed
```

## Running the app

```bash
npm run dev
```

The API will be available at `http://localhost:3000`.

Open `frontend/index.html` with Live Server or any static file server.

## API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/auth/register` | No | Register a new patient |
| POST | `/auth/login` | No | Login and get JWT token |
| GET | `/specialties` | No | List all specialties |
| GET | `/doctors` | No | List all doctors |
| GET | `/doctors?specialty_id=1` | No | Filter doctors by specialty |
| GET | `/doctors/:id/schedules` | No | Get doctor schedules |
| POST | `/appointments` | ✅ | Book an appointment |
| GET | `/appointments/me` | ✅ | Get my appointments |
| DELETE | `/appointments/:id` | ✅ | Cancel an appointment |
| GET | `/health` | No | Health check |

## Demo credentials

A demo user is available after running the seed. You can register your own account via the UI or API.

## Running tests

```bash
cd backend
npm test
```

## Business rules

- Appointments cannot be scheduled in the past
- A doctor cannot have two appointments at the same time
- A patient cannot have two appointments at the same time
- Patients can only cancel their own appointments
- Cancelled appointments cannot be cancelled again