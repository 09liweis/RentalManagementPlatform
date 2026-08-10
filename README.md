# Rental Management Platform (Landlord Master)

A professional, full-stack rental property management system designed for landlords to efficiently manage properties, rooms, tenants, rent collection, and expenses with a modern, responsive UI and robust backend.

## Features

### Core Features
- **User Management** - Registration, login with JWT authentication, password reset, multi-language support (English, Chinese)
- **Social Login** - Google OAuth and Facebook OAuth integration for easy authentication
- **Login with Code** - Email verification code login alternative
- **Property Management** - Add, edit, delete properties with Mapbox integration for location tracking
  - Property types: House, Townhouse, Condo, Apartment
- **Room Management** - Create rooms within properties with various room types
  - Room types: Room, Suite, Floor, Whole, Parking, Storage
- **Tenant Management** - Track tenant information, deposits, rent amounts, occupancy dates
  - Automatic rent days calculation
  - Current tenant status tracking
- **Rent Collection** - Track rent payments with payment statuses (pending, paid, cancelled)
  - Monthly rent tracking
  - Rent history per tenant
  - Automatic rent amount calculation
- **Expense Tracking** - Monitor property costs (water, electricity, gas, internet, repairment, other)
- **Dashboard & Analytics** - Overview statistics, date filtering, and pending rent notifications
- **Search Functionality** - Global search across properties, rooms, and tenants with keyboard shortcuts (Cmd/Ctrl + K)
- **Internationalization** - Multi-language support (English - en-CA, Chinese - zh-CN)
- **Admin Panel** - User management with pagination, search, and admin controls
- **Blog System** - Featured articles, blog listing, and individual blog posts
- **Cron Jobs** - Automated email reports, tenant rent days calculation, and statistics aggregation

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.1.1 | React framework with App Router |
| **React** | 19.2.3 | UI library |
| **TypeScript** | 5 | Type safety |
| **Tailwind CSS** | 3.4.14 | Utility-first styling |
| **Framer Motion** | 12.16.0 | Animations and transitions |
| **Zustand** | 5.0.1 | State management |
| **React Toastify** | 10.0.5 | Toast notifications |
| **Mapbox GL** | 3.6.0 | Interactive maps |
| **React Map GL** | 7.1.7 | Mapbox React wrapper |
| **@formatjs/intl-localematcher** | 0.5.4 | Locale matching |
| **Negotiator** | 0.6.3 | Content negotiation |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | Runtime environment |
| **Next.js API Routes** | Serverless functions |
| **MongoDB** | NoSQL database |
| **Mongoose** | 8.21.0 | ODM for MongoDB |
| **JWT** | 9.0.2 | Authentication tokens |
| **bcryptjs** | 2.4.3 | Password hashing |
| **Brevo** | 4.0.0 | Email service (Brevo) |
| **httpsms** | 0.0.4 | SMS service |

### Development Tools
| Technology | Version | Purpose |
|------------|---------|---------|
| **ESLint** | 9.0.0 | Code linting |
| **PostCSS** | 8.4.47 | CSS processing |
| **@vercel/analytics** | 1.5.0 | Analytics |
| **@vercel/speed-insights** | 1.2.0 | Performance monitoring |

### Third-Party Integrations
- **Brevo (Sendinblue)**: Email service for transactional emails
- **httpsms**: SMS service for notifications
- **Mapbox**: Location and mapping services
- **Google OAuth**: Social login integration
- **Facebook OAuth**: Social login integration

## Project Structure

```
RentalManagementPlatform/
├── app/                              # Next.js App Router (v16)
│   ├── [lang]/                       # i18n routes (en-CA, zh-CN)
│   │   ├── (home)/                   # Public pages
│   │   │   ├── page.tsx              # Landing page
│   │   │   ├── login/                # Email, code, Google & Facebook OAuth
│   │   │   ├── signup/               # Registration
│   │   │   ├── forgotpassword/       # Password recovery
│   │   │   ├── resetpassword/        # Password reset
│   │   │   ├── privacy/              # Privacy policy
│   │   │   ├── terms/                # Terms of service
│   │   │   └── blogs/                # Blog listing & SEO-friendly post URLs
│   │   └── (landloard)/              # Protected dashboard routes
│   │       ├── dashboard/            # Overview, costs, rent cards
│   │       ├── admin/                # Admin user management
│   │       ├── profile/              # User profile & settings
│   │       ├── properties/           # Property detail & management
│   │       ├── rooms/                # Room management per property
│   │       └── tenants/              # Tenant management per room
│   ├── api/                          # REST API routes (31 endpoints)
│   │   ├── login/                    # Email/password authentication
│   │   ├── signup/                   # User registration
│   │   ├── auth/                     # OAuth (Google, Facebook) & code login
│   │   ├── user/                     # User profile CRUD
│   │   ├── users/                    # Admin user management (paginated)
│   │   ├── properties/               # Property CRUD & nested resources
│   │   ├── rooms/                    # Room CRUD
│   │   ├── tenants/                  # Tenant CRUD & rent history
│   │   ├── rents/                    # Rent payment management
│   │   ├── search/                   # Global search (properties, rooms, tenants)
│   │   ├── overview/                 # Dashboard statistics
│   │   ├── sendemail/                # Transactional emails (Brevo)
│   │   ├── resetpassword/            # Password reset flow
│   │   ├── cron/                     # Automated jobs (reports, calculations)
│   │   └── ping/                     # Health check
│   ├── globals.css                   # Tailwind imports & global styles
│   ├── not-found.tsx                 # Custom 404 page
│   └── site.webmanifest              # PWA manifest
├── components/                       # React components (66 files)
│   ├── common/                       # Shared UI components
│   │   ├── form/                     # Form field components
│   │   ├── Button.tsx                # Reusable button (variants: primary, outline)
│   │   ├── Input.tsx                 # Form input component
│   │   ├── Header.tsx                # Page header with navigation
│   │   ├── Footer.tsx                # Site footer
│   │   ├── LangSwtich.tsx            # Language switcher (en/zh)
│   │   ├── LinkText.tsx              # Styled link component
│   │   ├── Loading.tsx / LoadingSection.tsx / LoadingSpinner.tsx
│   │   ├── Logo.tsx                  # Application logo
│   │   ├── Map.tsx                   # Mapbox interactive map
│   │   ├── SearchModal.tsx           # Global search (Cmd/Ctrl+K)
│   │   ├── SelectGroup.tsx           # Select dropdown group
│   │   ├── Toast.ts / ToastProvider.tsx  # Toast notification system
│   │   └── YearlyRentIncome.tsx      # Yearly rent income display
│   ├── dashboard/                    # Dashboard page components
│   │   ├── Screen.tsx                # Main dashboard layout
│   │   ├── sidebar.tsx               # Collapsible sidebar navigation
│   │   ├── DashboardHeader.tsx       # Dashboard header with search
│   │   ├── Properties.tsx            # Properties orchestrator (table + mobile)
│   │   ├── PropertiesTable.tsx       # Desktop table view
│   │   ├── PropertiesMobileList.tsx  # Mobile card list
│   │   ├── PropertiesEmptyState.tsx  # Empty state placeholder
│   │   ├── CostList.tsx              # Expense list
│   │   └── RentCards.tsx             # Rent overview cards
│   ├── home/                         # Landing page sections
│   │   ├── HeroSection.tsx           # Hero banner
│   │   ├── StatsBar.tsx              # Animated statistics
│   │   ├── FeatureGrid.tsx           # Feature cards grid
│   │   ├── ProductShowcase.tsx       # Tab-based product demo
│   │   ├── WorkflowSteps.tsx         # Step-by-step workflow
│   │   ├── TestimonialCards.tsx      # User testimonials
│   │   ├── BottomCTA.tsx             # Call-to-action section
│   │   └── BlogPreview.tsx           # Latest blog posts preview
│   ├── login/                        # Authentication components
│   │   ├── PasswordLoginForm.tsx     # Email/password login
│   │   ├── CodeLoginForm.tsx         # Verification code login
│   │   ├── LoginMethodToggle.tsx     # Login method switcher
│   │   ├── GoogleLoginButton.tsx     # Google OAuth button
│   │   ├── FacebookLoginButton.tsx   # Facebook OAuth button
│   │   └── Divider.tsx               # Visual divider
│   ├── property/                     # Property management
│   │   ├── propertyForm.tsx          # Add/edit property form
│   │   ├── PropertyList.tsx          # Property list (table + mobile)
│   │   ├── PropertyCard.tsx          # Property card (grid view)
│   │   ├── PropertyDetail.tsx        # Property detail view
│   │   └── CostForm.tsx              # Expense entry form
│   ├── room/                         # Room management
│   │   ├── RoomForm.tsx              # Add/edit room form
│   │   ├── RoomList.tsx              # Room list (table + mobile)
│   │   ├── RoomTable.tsx             # Desktop table
│   │   ├── RoomCard.tsx              # Room card
│   │   └── EmptyRooms.tsx            # Empty state
│   ├── tenant/                       # Tenant management
│   │   ├── TenantsScreen.tsx         # Tenant management orchestrator
│   │   ├── TenantForm.tsx            # Add/edit tenant form
│   │   ├── TenantList.tsx            # Tenant list
│   │   ├── TenantTable.tsx           # Desktop table
│   │   ├── TenantCard.tsx            # Tenant card
│   │   ├── TenantsHeader.tsx         # Tenant page header
│   │   ├── TenantsBreadcrumbs.tsx    # Breadcrumb navigation
│   │   ├── TenantsContext.tsx        # Context provider
│   │   ├── PropertyInfoCard.tsx      # Property info summary
│   │   ├── RoomInfoCard.tsx          # Room info summary
│   │   └── EmptyTenants.tsx          # Empty state
│   ├── rent/                         # Rent tracking
│   │   ├── RentsScreen.tsx           # Rent management orchestrator
│   │   ├── RentForm.tsx              # Add/edit rent form
│   │   └── RentTable.tsx             # Desktop rent table
│   └── blog/                         # Blog components
│       ├── BlogFeatured.tsx          # Featured article
│       ├── BlogList.tsx              # Blog listing grid
│       └── BlogPost.tsx              # Single blog post (professional layout)
├── config/
│   └── db.js                         # MongoDB connection (cached singleton)
├── constants/                        # Application constants
│   ├── apis.ts                       # API endpoint URLs
│   ├── httpStatus.ts                 # HTTP status codes
│   ├── importPaths.ts                # Path aliases
│   ├── locales.ts                    # Supported locales
│   └── text.ts                       # Static text (WEBSITE_NAME, etc.)
├── data/
│   └── blogPosts.ts                  # Sample blog posts (SEO-friendly slugs)
├── dictionaries/                     # i18n translation dictionaries
│   ├── en-CA.json                    # English (Canada)
│   └── zh-CN.json                    # Chinese (Simplified)
├── hooks/
│   └── useFetchData.ts               # Generic data fetching hook
├── lib/                              # Service libraries
│   ├── email.ts                      # Brevo email service
│   └── sms.ts                        # SMS notification service
├── models/                           # Mongoose schemas (6 models)
│   ├── user.ts                       # User (auth, plan, tokens)
│   ├── property.ts                   # Property (name, type, location)
│   ├── room.ts                       # Room (type, property reference)
│   ├── tenant.ts                     # Tenant (deposit, rent, dates)
│   ├── rent.ts                       # Rent payment (amount, status)
│   └── cost.ts                       # Expense (type, amount, date)
├── services/
│   └── stats.ts                      # Dashboard statistics aggregation
├── stores/                           # Zustand state management (3 stores)
│   ├── appStore.ts                   # App state, locale, translation t()
│   ├── userStore.ts                  # Auth state, login/logout, profile
│   └── propertyStore.ts              # Properties, rooms, tenants, selections
├── types/                            # TypeScript type definitions (7 files)
│   ├── blog.ts                       # Blog post types
│   ├── property.ts                   # Property types & EMPTY_PROPERTY
│   ├── rent.ts                       # Rent types
│   ├── room.ts                       # Room types
│   ├── tenant.ts                     # Tenant types
│   ├── user.ts                       # User types
│   └── index.ts                      # Shared/common types
├── utils/                            # Utility functions (5 files)
│   ├── http.ts                       # HTTP request helpers
│   ├── tenant.ts                     # Tenant date calculations
│   ├── property.ts                   # Property utilities
│   ├── rent.ts                       # Rent utilities
│   └── user.ts                       # User utilities
├── public/                           # Static assets (icons, images)
├── i18n-config.ts                    # i18n configuration
├── proxy.ts                          # API proxy configuration
├── next.config.mjs                   # Next.js configuration
├── tailwind.config.ts                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
├── postcss.config.mjs                # PostCSS configuration
├── vercel.json                       # Vercel deployment config
└── package.json                      # Dependencies & scripts
```

## Database Models

### User Model
```typescript
{
  name: String,
  email: String (unique, required),
  password: String (hashed),
  phone: String,
  address: String,
  locale: String,
  isVerified: Boolean (default: false),
  isAdmin: Boolean (default: false),
  forgotPasswardToken: String,
  forgotPasswardTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
  loginCode: String,
  loginCodeExpiry: Date,
  isDelete: Number (default: 0),
  plan: String (enum: 'free', 'premium', 'enterprise'),
  ts: Date (timestamp),
  mt: Date (modified timestamp),
  lts: Date (last login timestamp)
}
```

### Property Model
```typescript
{
  user: ObjectId (ref: User, required),
  name: String,
  ptype: String (property type: House/Townhouse/Condo/Apartment),
  address: String,
  loc: Array (coordinates),
  mapbox_id: String
}
```

### Room Model
```typescript
{
  property: ObjectId (ref: Property, required),
  name: String,
  tp: String (type: Room/Suite/Floor/Whole/Parking/Storage)
}
```

### Tenant Model
```typescript
{
  room: ObjectId (ref: Room, required),
  property: ObjectId (ref: Property),
  landlord: ObjectId (ref: User, required),
  name: String,
  deposit: Number,
  rent: Number,
  totalRent: Number,
  startDate: String,
  endDate: String,
  rentDays: Number,
  isCurrent: Boolean
}
```

### Rent Model
```typescript
{
  property: ObjectId (ref: Property),
  room: ObjectId (ref: Room, required),
  tenant: ObjectId (ref: Tenant, required),
  amount: Number,
  status: String (default: 'pending', enum: pending/paid/cancelled),
  startDate: String,
  ts: Date,
  mt: Date
}
```

### Cost Model
```typescript
{
  user: ObjectId (ref: User, required),
  property: ObjectId (ref: Property, required),
  date: String,
  amount: Number,
  note: String,
  tp: Number (type: 1:water, 2:electricity, 3:gas, 4:internet, 5:other)
}
```

## API Routes

### Authentication
- `POST /api/login` - User login (email/password)
- `POST /api/signup` - User registration
- `GET /api/auth/google` - Google OAuth
- `GET /api/auth/google/callback` - Google OAuth callback
- `GET /api/auth/facebook` - Facebook OAuth
- `GET /api/auth/facebook/callback` - Facebook OAuth callback
- `POST /api/auth/code/send` - Send verification code
- `POST /api/auth/code/verify` - Verify code for login
- `POST /api/resetpassword` - Request password reset
- `POST /api/user/password` - Reset password with token
- `GET /api/user` - Get user details
- `POST /api/user` - Update user details

### Properties
- `GET /api/properties` - Get user's properties
- `POST /api/properties` - Create new property
- `PUT /api/properties` - Update property
- `DELETE /api/properties` - Delete property
- `GET /api/properties/[propertyId]` - Get property details
- `GET /api/properties/[propertyId]/costs` - Get property costs
- `GET /api/properties/[propertyId]/rooms` - Get property rooms

### Rooms
- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/[roomId]` - Get room details
- `PUT /api/rooms/[roomId]` - Update room
- `GET /api/rooms/[roomId]/tenants` - Get tenants for a room
- `POST /api/properties/[propertyId]/rooms` - Add room to property

### Tenants
- `GET /api/tenants` - Get all tenants
- `POST /api/rooms/[roomId]/tenants` - Create tenant for a room
- `GET /api/tenants/[tenantId]` - Get tenant details
- `PUT /api/tenants/[tenantId]` - Update tenant
- `DELETE /api/tenants/[tenantId]` - Delete tenant
- `GET /api/tenants/[tenantId]/rents` - Get tenant's rent history
- `POST /api/tenants/[tenantId]/rents` - Add rent payment

### Rents
- `PUT /api/rents/[rentId]` - Update rent
- `DELETE /api/rents/[rentId]` - Delete rent

### Costs
- `GET /api/properties/[propertyId]/costs` - Get property costs

### Admin
- `GET /api/users` - Get all users (admin only, with pagination)
- `PUT /api/users` - Update user (admin only)
- `DELETE /api/users` - Soft delete user (admin only)

### Utility
- `GET /api/overview` - Get dashboard statistics
- `GET /api/search` - Global search across properties, rooms, tenants
- `POST /api/sendemail` - Send email
- `GET /api/ping` - Health check
- `GET /api/cron` - Automated cron jobs

## Environment Variables

Create a `.env` file in the root directory:

```env
# MongoDB
MONGODB_URI=mongodb+srv://connection-string

# JWT
JWT_SECRET=your-jwt-secret
TOKEN_SECRET=your-token-secret

# Email Service (Brevo)
BREVO_API_KEY=your-brevo-api-key
BREVO_SENDER_EMAIL=sender@example.com
BREVO_SENDER_NAME=Sender Name

# OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=https://your-host-url/google/callback
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret
FACEBOOK_REDIRECT_URI=https://your-host-url/facebook/callback

# Host
HOST=https://your-host-url
```

## Getting Started

### Prerequisites
- Node.js 20+ installed
- MongoDB Atlas account or local MongoDB instance
- Brevo account for email services
- Google OAuth credentials (optional, for social login)
- Facebook OAuth credentials (optional, for social login)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd RentalManagementPlatform
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your actual values
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Plan Restrictions

| Plan | Properties | Rooms |
|------|-----------|-------|
| Free | 1 | 5 |
| Premium | Extended limits | Extended limits |
| Enterprise | Unlimited | Unlimited |

## UI/UX Features

- **Modern Design**: Clean black/white/gray palette with subtle blue accents, professional typography
- **Responsive Layout**: Mobile-first approach — table views on desktop, card layouts on mobile
- **Animations**: Staggered entry animations with Framer Motion for smooth transitions
- **Row Selection**: Visual highlighting (blue border + background) for selected items in tables
- **Collapsible Sidebar**: Space-efficient dashboard navigation
- **Keyboard Shortcuts**: Cmd/Ctrl + K for global search modal
- **Toast Notifications**: Feedback for all user actions via react-toastify
- **Loading States**: Spinners, skeleton sections, and empty states for better UX
- **Map Integration**: Interactive Mapbox maps for property location visualization
- **Multi-language**: Seamless English (en-CA) / Chinese (zh-CN) switching
- **SEO-friendly URLs**: Blog posts use descriptive URL slugs

## Security Features

- **Password Hashing**: bcrypt with salt rounds for secure password storage
- **JWT Authentication**: Secure token-based authentication with expiration
- **Protected API Routes**: Token verification middleware for all protected endpoints
- **Authorization Header**: Bearer token authentication
- **Soft Delete**: User soft delete instead of hard delete for data safety
- **Admin-only Endpoints**: Role-based access control
- **Input Validation**: API endpoint validation
- **Token Expiry**: JWT token expiration for security
- **Password Reset Tokens**: One-time reset tokens with expiry

## State Management

### Zustand Stores
- **useAppStore**: Global app state, locale management, translation function `t(key)`
- **useUserStore**: User authentication state, login/logout functions, user profile data
- **usePropertyStore**: Property data, room management, tenant management, rent tracking, current selections

## Internationalization

The application supports internationalization with locale-based routing:

### Supported Locales
- `en-CA` - English (Canada)
- `zh-CN` - Chinese (Simplified)

### Translation Structure
Translations are organized by feature area:
- `home` - Landing page and navigation
- `dashboard` - Dashboard and management pages
- `room` - Room-related terms

### Locale-based Routing
Routes are prefixed with locale: `/en-CA/dashboard`, `/zh-CN/dashboard`

## Key Components

### Common Components (18 files)
| Component | Description |
|---|---|
| `Button` | Reusable button with variants (primary, outline) and sizes |
| `Input` | Form input component |
| `Loading` / `LoadingSection` / `LoadingSpinner` | Loading states at different scopes |
| `Toast` / `ToastProvider` | Toast notification system (based on react-toastify) |
| `Logo` | Application logo |
| `SearchModal` | Global search modal with Cmd/Ctrl+K shortcut |
| `LangSwtich` | Language switcher (en/zh) |
| `Header` | Page header with navigation |
| `Footer` | Site footer |
| `Map` | Mapbox interactive map for property locations |
| `LinkText` | Styled link component |
| `SelectGroup` | Select dropdown group |
| `YearlyRentIncome` | Yearly rent income calculation display |

### Dashboard Components (9 files)
| Component | Description |
|---|---|
| `Screen` | Main dashboard layout orchestrator |
| `sidebar` | Collapsible sidebar navigation |
| `DashboardHeader` | Dashboard header with search |
| `Properties` | Properties section orchestrator |
| `PropertiesTable` | Desktop table view (Name, Type, Address, Yearly Income, Actions) |
| `PropertiesMobileList` | Mobile card list with responsive design |
| `PropertiesEmptyState` | Empty state placeholder |
| `CostList` | Expense/cost listing |
| `RentCards` | Rent overview cards |

### Home / Landing Components (8 files)
| Component | Description |
|---|---|
| `HeroSection` | Hero banner with clean typography |
| `StatsBar` | Animated statistics counters |
| `FeatureGrid` | Feature cards in a grid layout |
| `ProductShowcase` | Tab-based product demo (Dashboard/Tenants/Rent) |
| `WorkflowSteps` | Numbered workflow steps with connectors |
| `TestimonialCards` | User testimonial quotes |
| `BottomCTA` | Dark background call-to-action section |
| `BlogPreview` | Latest 3 blog posts preview |

### Property Components (5 files)
| Component | Description |
|---|---|
| `propertyForm` | Add/edit property form |
| `PropertyList` | Property list with table (desktop) + cards (mobile) |
| `PropertyCard` | Property card for grid layouts |
| `PropertyDetail` | Property detail view |
| `CostForm` | Expense entry form |

### Room Components (5 files)
| Component | Description |
|---|---|
| `RoomForm` | Add/edit room form |
| `RoomList` | Room list with table + mobile views |
| `RoomTable` | Desktop room table |
| `RoomCard` | Room card component |
| `EmptyRooms` | Empty state for rooms |

### Tenant Components (11 files)
| Component | Description |
|---|---|
| `TenantsScreen` | Tenant management orchestrator |
| `TenantForm` | Add/edit tenant form |
| `TenantList` | Tenant listing |
| `TenantTable` | Desktop tenant table |
| `TenantCard` | Tenant card component |
| `TenantsHeader` | Tenant page header |
| `TenantsBreadcrumbs` | Breadcrumb navigation |
| `TenantsContext` | Context provider for tenant state |
| `PropertyInfoCard` | Property summary card |
| `RoomInfoCard` | Room summary card |
| `EmptyTenants` | Empty state for tenants |

### Rent Components (3 files)
| Component | Description |
|---|---|
| `RentsScreen` | Rent management orchestrator |
| `RentForm` | Add/edit rent payment form |
| `RentTable` | Desktop rent payments table |

### Authentication Components (6 files)
| Component | Description |
|---|---|
| `PasswordLoginForm` | Email/password login form |
| `CodeLoginForm` | Verification code login form |
| `LoginMethodToggle` | Toggle between login methods |
| `GoogleLoginButton` | Google OAuth button |
| `FacebookLoginButton` | Facebook OAuth button |
| `Divider` | Visual divider with text |

### Blog Components (3 files)
| Component | Description |
|---|---|
| `BlogFeatured` | Featured article hero |
| `BlogList` | Blog grid with category filtering |
| `BlogPost` | Individual blog post with professional layout |

## TODO

### Completed
- [x] Update property card when select property
- [x] Update room card when select room
- [x] Update tenant card when select tenant
- [x] Free user limit to 1 property, limit to 5 rooms
- [x] Add admin page to show all users
- [x] Calculate tenant duration
- [x] Add user last login time
- [x] Refactor login page into components
- [x] Add email sending API for new features
- [x] Create blog pages and components
- [x] Add blogs menu to header
- [x] In tenant form, add number of people/notes
- [x] Add customization cost category
- [x] Blog post SEO-friendly URL slugs
- [x] Professional blog post layout
- [x] Home page redesign with modular sections
- [x] Remove unused components (cleanup)
- [x] Property list table view with responsive design
- [x] Dashboard properties table view with responsive design
- [x] Refactor dashboard properties into sub-components

### In Progress / Future
- [ ] Refresh user token
- [ ] Redesign welcome email
- [ ] Use Stripe for payments
- [ ] Click to generate next month rent
- [ ] Chart bar for monthly total rent
- [ ] Calendar to show rooms availability
- [ ] Create property address and type not saved
- [ ] Update form UI, save/cancel switch
- [ ] Bulk add rooms and rents

## License

This project is private.

## Support

For support, please contact the development team.
