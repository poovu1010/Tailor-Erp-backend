# Stitch Flow Backend

A modern **Node.js + Express + MongoDB** backend API for the **Stitch Flow Tailor Shop Management System**.  
This backend handles owner authentication, shop data, customers, orders, payments, delivery status tracking, and dashboard analytics for tailoring businesses.

---

## Overview

**Stitch Flow Backend** is built for tailor shop owners who need a simple and reliable system to manage daily tailoring operations. It provides secure APIs for customer management, order creation, delivery tracking, payment status, and business dashboard statistics.

This backend is designed to work with the Stitch Flow frontend built using React and Tailwind CSS.

---

## Tech Stack

| Technology | Usage |
|---|---|
| Node.js | Runtime environment |
| Express.js | Backend framework |
| MongoDB | NoSQL database |
| Mongoose | MongoDB object modeling |
| JWT | Authentication |
| HTTP-only Cookies | Secure token storage |
| bcrypt | Password hashing |
| cookie-parser | Reading cookies from requests |
| CORS | Frontend-backend communication |
| dotenv | Environment variables |
| Docker | Containerized deployment |

---

## Core Features

- Owner signup and login
- JWT authentication using HTTP-only cookies
- Protected owner routes
- Shop creation and shop data management
- Add, view, and manage customers
- Create and track tailoring orders
- Order status flow management
- Payment tracking with advance, received amount, and balance
- Dashboard stats for orders, revenue, due payments, and deliveries
- MongoDB aggregation for joined customer and order data
- Production-ready CORS and cookie configuration
- Docker support for deployment

---

## Order Status Flow

```txt
Queue → Processing → Stitching → Ready → Delivered
```

Each order can move through the tailoring workflow step by step. This makes it easy for the owner to know which orders are pending, in progress, ready, or delivered.

---

## Project Structure

```txt
stitch-flow-backend/
├── config/
│   └── db.js
├── controllers/
│   ├── ownerController.js
│   ├── shopController.js
│   ├── customerController.js
│   └── orderController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── ownerModel.js
│   ├── shopModel.js
│   ├── customerModel.js
│   └── orderModel.js
├── routes/
│   └── ownerRoutes.js
├── utils/
│   └── generateToken.js
├── .env
├── .gitignore
├── Dockerfile
├── package.json
└── server.js
```

> Folder names may be slightly different in your project. Update this section based on your actual structure.

---

## Environment Variables

Create a `.env` file in the root folder and add the following values:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

For production, update `CLIENT_URL` with your deployed frontend URL.

Example:

```env
CLIENT_URL=https://your-frontend-domain.vercel.app
NODE_ENV=production
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/stitch-flow-backend.git
```

Move into the backend folder:

```bash
cd stitch-flow-backend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Start the production server:

```bash
npm start
```

---

## API Base URL

Local backend URL:

```txt
http://localhost:5000
```

Production backend URL:

```txt
https://your-backend-domain.com
```

---

## Main API Routes

### Authentication

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| POST | `/Owner/signup` | Register a new owner | No |
| POST | `/Owner/login` | Login owner | No |
| GET | `/Owner/Verify` | Verify logged-in owner | Yes |
| POST | `/Owner/logout` | Logout owner | Yes |

### Customers

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| POST | `/Owner/newCustomer` | Add new customer | Yes |
| GET | `/Owner/get-all-customer` | Get all customers | Yes |
| GET | `/Owner/get-single-customer-allInfo/:id` | Get customer with orders | Yes |

### Orders

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| POST | `/Owner/newOrder` | Create new order | Yes |
| GET | `/Owner/get-all-order` | Get all orders with customer details | Yes |
| GET | `/Owner/getSingle-order/:id` | Get single order detail | Yes |
| PATCH | `/Owner/update-status/:id` | Update order status/payment | Yes |

### Dashboard

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| GET | `/Owner/dashboard` | Get dashboard analytics | Yes |

> Update endpoint names based on your exact route file.

---

## Authentication Flow

1. Owner logs in with email and password.
2. Backend validates credentials.
3. Backend creates a JWT token.
4. Token is stored in an HTTP-only cookie.
5. Protected routes read the token from cookies.
6. Middleware verifies the token before allowing access.

Example cookie setup:

```js
res.cookie("jwt", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 1000 * 60 * 60 * 24,
});
```

---

## Example Order Data

```json
{
  "customerId": "customer_mongodb_id",
  "clothType": "Shirt",
  "price": 300,
  "advancePaid": 100,
  "expectedDeliveryDate": "2026-06-20",
  "notes": "White cotton shirt",
  "status": "Queue"
}
```

---

## Example Customer Data

```json
{
  "customer_name": "Ravi Kumar",
  "Phone": 9876543210,
  "Address": "Namakkal, Tamil Nadu"
}
```

---

## Payment Logic

The backend can track:

- Total order price
- Advance paid amount
- Received amount
- Balance amount
- Payment status

Example payment status values:

```txt
paid | due | partial
```

When an order is delivered, the backend can update received amount, balance amount, and payment status.

---

## MongoDB Aggregation Usage

The backend uses MongoDB aggregation for joining customers and orders.

Example use cases:

- Get all orders with customer details
- Get single customer with all orders
- Count total orders per customer
- Calculate dashboard stats
- Filter orders by status or delivery date

---

## CORS Setup

Example production-ready CORS configuration:

```js
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-frontend-domain.vercel.app"
    ],
    credentials: true,
  })
);
```

Frontend Axios should use:

```js
axios.create({
  baseURL: import.meta.env.VITE_BACKEND_LINK,
  withCredentials: true,
});
```

---

## Docker Setup

Build Docker image:

```bash
docker build -t stitch-flow-backend .
```

Run Docker container:

```bash
docker run -p 5000:5000 --env-file .env stitch-flow-backend
```

Check running containers:

```bash
docker ps
```

Stop container:

```bash
docker stop container_id
```

---

## Deployment Notes

This backend can be deployed on:

- Render
- Railway
- AWS EC2
- DigitalOcean
- VPS server
- Docker-based hosting platforms

For production deployment, make sure:

- `NODE_ENV=production`
- `secure: true` is enabled for cookies
- `sameSite: "none"` is used for cross-site frontend/backend domains
- Frontend URL is added in CORS origin
- MongoDB Atlas IP access is configured correctly
- JWT secret is strong and private

---

## Security Practices

- Passwords are hashed using bcrypt
- JWT is stored in HTTP-only cookies
- Protected routes use authentication middleware
- Environment variables are not pushed to GitHub
- CORS allows only trusted frontend URLs
- Owner-specific data is filtered using authenticated owner/shop ID

---

## Useful Scripts

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

---

## Future Improvements

- WhatsApp delivery reminders
- Email notifications
- Order invoice generation
- Customer login portal
- Image upload for customer measurements
- AWS S3 profile and order image storage
- Role-based access for shop workers
- Monthly revenue graph API
- Cron job for delivery reminders
- Rate limiting and request validation
- Better API documentation using Swagger

---

## Related Project

Frontend repository:

```txt
https://github.com/your-username/stitch-flow-frontend
```

Backend repository:

```txt
https://github.com/your-username/stitch-flow-backend
```

---

## Author

**Poovarasan**  
Full Stack Developer  
B.Tech Information Technology

---

## License

This project is created for learning, portfolio, and real-time tailor shop business management use cases.
