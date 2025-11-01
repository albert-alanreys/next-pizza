# Next Pizza

Full-stack application for the **Next Pizza** educational project.

> Modern pizza ordering platform built with **Next.js**, **React**, **Prisma**, and **PostgreSQL**.

---

## 🧰 Tech Stack

> A quick overview of the main tools and libraries used in this project.

**Core:**

- **Next.js 16** — React framework with server-side rendering
- **React 19** — JavaScript library for building user interfaces
- **TypeScript** — type-safe JavaScript
- **Prisma ORM** — type-safe database client
- **PostgreSQL** — relational database

**State Management & Data Fetching:**

- **Zustand** — lightweight state management
- **Axios** — HTTP client for API requests
- **React Hook Form** — performant forms with easy validation
- **Zod** — TypeScript-first schema validation

**UI Components & Styling:**

- **Tailwind CSS** — utility-first CSS framework
- **Radix UI** — accessible component primitives
- **Lucide React** — icon library
- **Class Variance Authority** — variant-based styling
- **Tailwind Merge** — merge Tailwind classes efficiently

**Authentication & Security:**

- **NextAuth.js** — authentication for Next.js
- **bcrypt** — password hashing

**External Services:**

- **Resend** — email delivery service
- **YooKassa** — payment processing (via API)
- **React DaData** — address autocomplete

**Development Tools:**

- **ESLint** — JavaScript linting
- **Prettier** + **@trivago/prettier-plugin-sort-imports** — code formatting
- **ts-node** & **tsx** — TypeScript execution

**Additional Libraries:**

- **React Hot Toast** — toast notifications
- **React Insta Stories** — Instagram-style stories
- **React Use** — collection of essential React hooks
- **nextjs-toploader** — page loading progress bar
- **qs** — query string parsing
- **lodash.debounce** — input debouncing

---

## 📸 Screenshots

This gallery showcases the project interface.

#### Registration form

![Registration form](public/screenshots/register.png)

#### Login form

![Login form](public/screenshots/login.png)

#### Profile page

![Profile page](public/screenshots/profile.png)

#### Home page

![Home page](public/screenshots/home.png)

#### Home page with pizza section

![Home page with pizza section](public/screenshots/home-pizzas.png)

#### Empty cart

![Empty cart](public/screenshots/cart-empty.png)

#### Pizza constructor

![Pizza constructor](public/screenshots/pizza-constructor.png)

#### Cart with products

![Cart with products](public/screenshots/cart-with-products.png)

#### Checkout page

![Checkout page](public/screenshots/checkout.png)

---

## ⚙️ Development

This project uses **Yarn** and requires **Node.js v22+**.

To run the development server:

```bash
yarn install
```

Create a PostgreSQL database named `next-pizza`.

Create a `.env` file based on `.env.example`:

```
DATABASE_URL=postgresql://<USERNAME>:<PASSWORD>@localhost:5432/next-pizza?schema=public

NEXT_PUBLIC_API_URL=/api

NEXTAUTH_SECRET=<YOUR_SECRET_KEY>

GITHUB_ID=<YOUR_GITHUB_OAUTH_CLIENT_ID>
GITHUB_SECRET=<YOUR_GITHUB_OAUTH_CLIENT_SECRET>

GOOGLE_CLIENT_ID=<YOUR_GOOGLE_OAUTH_CLIENT_ID>
GOOGLE_CLIENT_SECRET=<YOUR_GOOGLE_OAUTH_CLIENT_SECRET>

RESEND_API_KEY=<YOUR_RESEND_API_KEY>

YOOKASSA_API_KEY=<YOUR_YOOKASSA_API_KEY>
```

**Setting up external services:**

- **GitHub OAuth** — [Create OAuth App](https://github.com/settings/developers)
- **Google OAuth** — [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
- **NextAuth.js** — [Documentation](https://next-auth.js.org/getting-started/introduction)
- **Resend** — [Get API Key](https://resend.com/api-keys)
- **YooKassa** — [API Documentation](https://yookassa.ru/developers/api)

Generate Prisma client:

```bash
yarn prisma:generate
```

Apply existing migrations:

```bash
yarn prisma:migrate
```

Seed the database with initial data:

```bash
yarn prisma:seed
```

Start the development server:

```bash
yarn dev
```

---

## 📝 Additional Scripts

- `yarn build` — build for production
- `yarn start` — start production server
- `yarn lint` — run ESLint
- `yarn prisma:studio` — open Prisma Studio
- `yarn prisma:reset` — reset database
- `yarn prisma:push` — push schema changes without migrations
- `yarn prisma:preview` — pull schema from database

---

**License:** MIT  
**Author:** [Albert Alan-Reys](https://github.com/albert-alanreys)
