# Test - Full Stack Developer - Antariks

## Product Inventory Management System

A modern, full-stack CRUD application for managing product inventory.

## 🚀 Live Demo

- **Live Application**: [https://antariks-test-product-inventory.vercel.app](https://antariks-test-product-inventory.vercel.app/)

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Security & Validation](#-security--validation)
- [Installation & Setup](#-installation--setup)
- [Project Structure](#-project-structure)
- [Design Decisions](#-design-decisions)

## 🛠 Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible UI components
- **TanStack Query** - Data fetching and state management

### Backend

- **tRPC** - End-to-end typesafe APIs
- **Prisma** - Type-safe ORM
- **PostgreSQL** - Relational database
- **Zod** - Schema validation

### Additional Libraries

- **nuqs** - Type-safe URL search params state management
- **usehooks-ts** - Collection of useful React hooks

## ✨ Features

- **CRUD** - Add, update, read and delete products with validation
- **Full-text Search** - PostgreSQL-powered search across product names and descriptions
- **Sorting Filter** - Sort by name, price, stock, or date (ascending/descending)
- **Pagination** - Paginate data in table list
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices

## 🔒 Security & Validation

### Input Validation (Zod Schema - Client & Server)

All inputs are validated using Zod schemas on both client and server sides, ensuring type safety and preventing invalid data from entering the system.

| Field            | Validation Rules                   | Reasoning                                                                         |
| ---------------- | ---------------------------------- | --------------------------------------------------------------------------------- |
| **Product Name** | 3-100 characters                   | Prevents empty entries, ensures searchability, limits storage                     |
| **Description**  | 10-500 characters                  | Ensures meaningful content, prevents XSS through length limits                    |
| **Amount**       | Integer, positive, max 999,999,999 | Business logic enforcement, prevents overflow, integer-only for currency handling |
| **Quantity**     | Integer, non-negative, max 999,999 | Allows zero stock, prevents fractions, realistic inventory limits                 |

### Database Security

| Feature               | Implementation            | Purpose                                                                    |
| --------------------- | ------------------------- | -------------------------------------------------------------------------- |
| **Unique Constraint** | `name @unique @db.Citext` | Prevents duplicates, case-insensitive matching, database-level enforcement |
| **Soft Deletes**      | `isActive Boolean`        | Data recovery, audit trail, maintains referential integrity                |
| **UUID Primary Keys** | `@default(uuid())`        | Prevents enumeration attacks, no information leakage                       |
| **Timestamps**        | `createdAt`, `updatedAt`  | Audit trail, data lifecycle tracking                                       |

### API & Application Security

**Type-Safe API (tRPC)**

- End-to-end type safety prevents injection vulnerabilities
- Automatic request/response serialization
- No manual endpoint definitions reduce human error

**Input Sanitization**

- All inputs validated with Zod before processing
- Prisma ORM uses parameterized queries (prevents SQL injection)
- Full-text search queries sanitized before execution

**Error Handling**

- Structured error responses (`TRPCError`)
- User-friendly validation feedback

**XSS Prevention**

- React automatically escapes all rendered content
- No use of `dangerouslySetInnerHTML`
- All user input validated and sanitized

**CSRF Protection**

- Next.js built-in CSRF protection
- Same-origin policy enforced

## 💻 Installation & Setup

### Prerequisites

- Node.js 20+ installed
- PostgreSQL database (or Docker)
- npm or pnpm package manager

### 1. Clone Repository

```bash
git clone git@github.com:ucok-man/product-inventory.git
cd product-inventory
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Setup Database

#### Option A: Using Docker

```bash
# Make script executable
chmod +x start-database.sh

# Start PostgreSQL container
./start-database.sh
```

#### Option B: Using Existing PostgreSQL

Create a `.env` file with your database URL:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/product-inventory"
```

### 4. Initialize Database

```bash
# Generate Prisma Client
npm run db:generate

# Run migrations
npm run db:push

# Seed database with sample data (optional)
npm run db:seed
```

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

### 6. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
product-inventory/
├── prisma/
│   ├── migrations/          # Database migrations
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Sample data seeder
├── src/
│   ├── app/
│   │   ├── (ui)/            # Main application pages
│   │   ├── api/trpc/        # tRPC API routes
│   │   └── layout.tsx       # Root layout
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   └── ...              # Other shared components
│   ├── lib/
│   │   ├── constants.ts     # App constants
│   │   ├── schemas.ts       # Zod validation schemas
│   │   └── utils.ts         # Utility functions
│   ├── server/
│   │   ├── api/
│   │   │   ├── routers/
│   │   │   │   └── product.ts  # Product CRUD operations
│   │   │   ├── root.ts      # tRPC router configuration
│   │   │   └── trpc.ts      # tRPC setup
│   │   └── db.ts            # Prisma client instance
│   ├── styles/
│   │   └── globals.css      # Global styles
│   └── trpc/                # tRPC client configuration
```

## 🎨 Design Decisions

### UI/UX Choices

#### **1. Responsive Modal/Drawer Pattern**

- **Desktop**: Modal dialog for create/edit forms
- **Mobile**: Bottom drawer for better thumb reach
- **Reasoning**: Optimizes for different screen sizes and user interaction patterns

#### **2. Debounced Search**

- **Implementation**: 500ms delay before search execution
- **Reasoning**: Reduces unnecessary database queries, improves performance

#### **3. Inline Error Display**

- **Pattern**: Show validation errors directly below inputs
- **Reasoning**: Users don't lose context, clear cause-and-effect

#### **4. Confirmation Dialogs**

- **Used for**: Delete operations only
- **Reasoning**: Prevents accidental destructive actions

#### **5. Toast Notifications**

- **Purpose**: Non-intrusive success/error feedback
- **Reasoning**: Doesn't block user workflow, automatically dismisses

### Architecture Choices

#### **1. tRPC Over REST**

- **Benefit**: End-to-end type safety
- **Tradeoff**: Locked into TypeScript ecosystem
- **Reasoning**: Eliminates entire class of bugs, better DX

#### **2. Prisma ORM**

- **Benefit**: Type-safe database queries, migrations
- **Tradeoff**: Additional abstraction layer
- **Reasoning**: Prevents SQL injection, simplifies schema changes

#### **3. Server Components + Client Components**

- **Pattern**: Fetch data on server, interactivity on client
- **Reasoning**: Optimal performance, SEO, smaller bundle size

#### **4. URL State Management (nuqs)**

- **Use case**: Search, sort, pagination parameters
- **Reasoning**: Shareable URLs, browser history support

#### **5. Soft Deletes**

- **Implementation**: `isActive` boolean flag
- **Reasoning**: Data recovery, audit trail, referential integrity
