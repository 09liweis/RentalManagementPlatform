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
| **Resend** | 4.0.0 | Email service (Brevo) |
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
/workspaces/RentalManagementPlatform/
├── app/                          # Next.js App Router
│   ├── [lang]/                   # Internationalization routes (en-CA, zh-CN)
│   │   ├── (home)/              # Public pages
│   │   │   ├── login/           # Login page with multiple login methods
│   │   │   ├── signup/          # Signup page
│   │   │   ├── forgotpassword/  # Password recovery
│   │   │   ├── resetpassword/   # Password reset
│   │   │   ├── privacy/         # Privacy policy
│   │   │   ├── terms/           # Terms of service
│   │   │   └── blogs/           # Blog pages (listing and posts)
│   │   └── (landloard)/        # Protected dashboard routes
│   │       ├── dashboard/      # Main dashboard
│   │       ├── admin/          # Admin panel
│   │       ├── profile/        # User profile
│   │       ├── properties/     # Properties management
│   │       ├── rooms/          # Rooms management
│   │       └── tenants/        # Tenants management
│   ├── api/                     # API Routes
│   │   ├── login/              # Authentication
│   │   ├── signup/             # User registration
│   │   ├── auth/               # OAuth endpoints (google, facebook, code)
│   │   ├── user/               # User profile operations
│   │   ├── users/              # Admin user management
│   │   ├── properties/         # CRUD operations
│   │   ├── rooms/              # Room management
│   │   ├── tenants/            # Tenant management
│   │   ├── rents/              # Rent tracking
│   │   ├── search/             # Global search
│   │   ├── overview/           # Dashboard stats
│   │   ├── sendemail/          # Email operations
│   │   ├── resetpassword/      # Password reset
│   │   ├── cron/               # Automated jobs
│   │   └── ping/               # Health check
│   ├── globals.css             # Global styles
│   └── layout files            # Root and route layouts
├── components/                   # React components
│   ├── common/                 # Shared UI (Button, Input, Toast, etc.)
│   ├── dashboard/              # Dashboard-specific components
│   ├── home/                   # Landing page components
│   ├── login/                  # Login page components
│   ├── property/               # Property management components
│   ├── room/                   # Room management components
│   ├── tenant/                 # Tenant management components
│   ├── rent/                   # Rent tracking components
│   └── blog/                   # Blog components
├── config/                      # Configuration files
│   └── db.js                   # MongoDB connection with caching
├── constants/                   # Constants
│   ├── apis.ts                # API endpoints
│   ├── httpStatus.ts          # HTTP status codes
│   ├── importPaths.ts         # Import path aliases
│   ├── locales.ts             # Localization constants
│   └── text.ts                # Text constants (WEBSITE_NAME, etc.)
├── dictionaries/              # i18n dictionaries
│   ├── en-CA.json            # English translations
│   └── zh-CN.json            # Chinese translations
├── data/                      # Static data
│   └── blogPosts.ts           # Sample blog posts
├── hooks/                     # Custom React hooks
│   └── useFetchData.ts       # Data fetching hook
├── lib/                       # Utility libraries
│   ├── email.ts              # Email service (Brevo)
│   ├── sms.ts                # SMS service
│   └── jwt.ts                # JWT utilities
├── models/                    # Mongoose database models
│   ├── user.ts               # User model
│   ├── property.ts           # Property model
│   ├── room.ts               # Room model
│   ├── tenant.ts             # Tenant model
│   ├── rent.ts               # Rent model
│   └── cost.ts               # Cost/expense model
├── services/                  # Business logic
│   └── stats.ts              # Statistics calculation
├── stores/                    # Zustand state stores
│   ├── appStore.ts           # App state and i18n
│   ├── userStore.ts          # User authentication state
│   └── propertyStore.ts      # Property data and selections
├── types/                     # TypeScript type definitions
│   ├── blog.ts               # Blog types
│   ├── rent.ts               # Rent types
│   └── ...                   # Other type definitions
├── utils/                     # Utility functions
│   ├── http.ts               # HTTP utilities
│   ├── tenant.ts             # Tenant utilities (calculateDays, getDuration)
│   └── ...                   # Other utilities
├── public/                     # Static assets
└── Configuration files (package.json, tsconfig.json, tailwind.config.ts, etc.)
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

- **Modern Design**: Gradient backgrounds, smooth animations with Framer Motion
- **Responsive**: Mobile-first approach with collapsible sidebar
- **Keyboard Shortcuts**: Cmd/Ctrl + K for global search
- **Toast Notifications**: Feedback for all user actions
- **Loading Indicators**: Spinners and loading sections for better UX
- **Empty States**: Visual feedback when no data is available
- **Map Integration**: Interactive maps for property locations
- **Multi-language**: Seamlessly switch between English and Chinese

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

### Common Components
- `Button` - Reusable button component with variants
- `Input` - Form input component
- `Loading` - Loading spinner
- `LoadingSection` - Section loading indicator
- `Toast` - Toast notification system
- `Logo` - Application logo
- `SearchModal` - Global search modal with keyboard shortcuts
- `LangSwitch` - Language switcher
- `Header` - Page header
- `Footer` - Page footer

### Authentication Components
- `PasswordLoginForm` - Email/password login form
- `CodeLoginForm` - Verification code login form
- `LoginMethodToggle` - Toggle between login methods
- `GoogleLoginButton` - Google OAuth button
- `FacebookLoginButton` - Facebook OAuth button
- `Divider` - Visual divider

### Blog Components
- `BlogFeatured` - Featured article component
- `BlogList` - Blog grid with filtering
- `BlogPost` - Individual blog post view

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

### In Progress / Future
- [ ] Refresh user token
- [ ] Redesign welcome email
- [ ] Use Stripe (Clair) for payments
- [ ] Click to generate next month rent
- [ ] Chart bar for monthly total rent
- [ ] Calendar to show rooms availability

## License

This project is private.

## Support

For support, please contact the development team.
