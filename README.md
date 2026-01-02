# Rental Management Platform (Landlord Master)

A professional rental property management system for landlords to manage properties, rooms, tenants, rent collection, and expenses.

## Features

- **User Management** - Registration, login with JWT authentication, password reset, multi-language support
- **Property Management** - Add, edit, delete properties with Mapbox integration for location tracking
- **Room Management** - Create rooms within properties with various room types
- **Tenant Management** - Track tenant information, deposits, rent amounts, and occupancy dates
- **Rent Collection** - Track rent payments with payment statuses (pending, paid)
- **Expense Tracking** - Monitor property costs (water, electricity, gas, internet, etc.)
- **Dashboard & Analytics** - Overview statistics, filtering, and pending rent notifications
- **Search Functionality** - Global search across properties, rooms, and tenants with keyboard shortcuts
- **Internationalization** - Multi-language support (English, Chinese)
- **Admin Panel** - User management with pagination and admin controls

## Tech Stack

### Frontend
- **Framework:** Next.js 14.2.35 (App Router)
- **UI Library:** React 18
- **Styling:** Tailwind CSS 3.4.14
- **Animations:** Framer Motion 12.16.0
- **Maps:** Mapbox GL 3.6.0 + React Map GL 7.1.7
- **State Management:** Zustand 5.0.1
- **Notifications:** React Toastify 10.0.5
- **API Documentation:** Swagger UI React 5.17.14
- **Analytics:** Vercel Analytics + Speed Insights

### Backend
- **Runtime:** Next.js API Routes (Node.js)
- **Database:** MongoDB with Mongoose 8.21.0
- **Authentication:** JWT + bcryptjs 2.4.3
- **Email Service:** Brevo (via resend API)
- **SMS Service:** httpsms API

### Development Tools
- **Language:** TypeScript 5
- **Linting:** ESLint 8
- **Package Manager:** npm

## Project Structure

```
/workspaces/RentalManagementPlatform/
├── app/                          # Next.js App Router
│   ├── [lang]/                   # Internationalization routes
│   │   ├── (home)/              # Public pages (landing, auth)
│   │   │   ├── login/           # Login page
│   │   │   ├── signup/          # Signup page
│   │   │   ├── forgotpassword/  # Password recovery
│   │   │   ├── resetpassword/   # Password reset
│   │   │   ├── privacy/         # Privacy policy
│   │   │   └── terms/           # Terms of service
│   │   └── (landloard)/        # Protected dashboard routes
│   │       ├── dashboard/      # Main dashboard
│   │       │   ├── admin/      # Admin panel
│   │       │   ├── profile/    # User profile
│   │       │   ├── properties/ # Properties management
│   │       │   ├── rooms/      # Rooms management
│   │       │   └── tenants/    # Tenants management
│   │       └── layout.tsx      # Dashboard layout
│   ├── api/                     # API Routes
│   │   ├── login/              # Authentication
│   │   ├── signup/             # User registration
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
│   │   └── ping/               # Health check
│   ├── api-doc/                 # API documentation
│   ├── globals.css             # Global styles
│   └── layout files
├── components/                   # React components
│   ├── common/                 # Shared UI components
│   ├── dashboard/              # Dashboard components
│   ├── home/                   # Landing page components
│   ├── property/               # Property-related components
│   ├── room/                   # Room components
│   ├── tenant/                 # Tenant components
│   └── rent/                   # Rent components
├── config/                      # Configuration files
│   └── db.js                   # MongoDB connection
├── constants/                   # Constants
│   ├── apis.ts                # API endpoints
│   ├── httpStatus.ts          # HTTP status codes
│   ├── importPaths.ts         # Import path aliases
│   ├── locales.ts             # Localization constants
│   └── text.ts                # Text constants
├── dictionaries/              # i18n dictionaries
│   ├── en-CA.json            # English translations
│   └── zh-CN.json            # Chinese translations
├── hooks/                     # Custom React hooks
│   └── useFetchData.ts       # Data fetching hook
├── lib/                       # Utility libraries
│   ├── email.ts              # Email service (Brevo)
│   ├── redis.js              # Redis client
│   ├── sms.ts                # SMS service
│   └── swagger.ts            # Swagger documentation
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
│   ├── appStore.ts           # App state
│   ├── userStore.ts          # User state
│   └── propertyStore.ts      # Property state
├── types/                     # TypeScript type definitions
├── utils/                     # Utility functions
├── public/                     # Static assets
└── Configuration files (package.json, tsconfig.json, tailwind.config.ts, etc.)
```

## Database Models

### User Model
- Fields: name, email (unique), password (hashed), phone, address, locale, isVerified, isAdmin, plan, forgotPasswordToken, verifyToken
- Plan types: free, premium, enterprise

### Property Model
- Fields: user (ref), name, ptype (House/Townhouse/Condo/Apartment), address, loc (coordinates), mapbox_id

### Room Model
- Fields: property (ref), name, tp (Room/Suite/Floor/Whole/Parking/Storage)

### Tenant Model
- Fields: room (ref), landlord (ref), name, deposit, rent, startDate, endDate, isCurrent

### Rent Model
- Fields: room (ref), tenant (ref), amount, status (pending/paid/cancelled), startDate

### Cost Model
- Fields: user (ref), property (ref), date, amount, note, tp (water/electricity/gas/internet/other)

## API Routes

### Authentication
- `POST /api/login` - User login
- `POST /api/signup` - User registration
- `POST /api/resetpassword` - Request password reset
- `POST /api/user/password` - Reset password with token
- `POST /api/user` - Get/update user details

### Properties
- `GET /api/properties` - Get user's properties
- `POST /api/properties` - Create new property
- `PUT /api/properties` - Update property
- `DELETE /api/properties` - Delete property
- `GET /api/properties/[propertyId]` - Get property details

### Rooms
- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/[roomId]/tenants` - Get tenants for a room

### Tenants
- `GET /api/tenants` - Get all tenants
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

### Other
- `GET /api/overview` - Get dashboard statistics
- `GET /api/search` - Global search across properties, rooms, tenants
- `POST /api/sendemail` - Send email
- `GET /api/ping` - Health check

## Environment Variables

Create a `.env` file in the root directory:

```env
MONGO_URI=mongodb://your-mongodb-uri
JWT_SECRET=your-jwt-secret
TOKEN_SECRET=your-token-secret
BREVO_API_KEY=your-brevo-api-key
BREVO_SENDER_EMAIL=sender@example.com
BREVO_SENDER_NAME=Sender Name
HTTPSMS_API_KEY=your-httpsms-api-key
```

## Getting Started

### Prerequisites
- Node.js 20+ installed
- MongoDB Atlas account or local MongoDB instance
- Brevo account for email services
- httpsms account for SMS services (optional)

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

- **Free Plan:** Limited to 1 property and 5 rooms
- **Premium Plan:** Extended limits
- **Enterprise Plan:** Unlimited properties and rooms

## UI/UX Features

- Smooth animations with Framer Motion
- Responsive design (mobile-first)
- Toast notifications for feedback
- Search modal with keyboard shortcuts (Cmd/Ctrl + K)
- Clean, modern interface with gradient backgrounds
- Map integration for property locations

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Authorization header validation
- Soft delete for users
- Admin-only endpoints
- Input validation

## TODO

- [x] Update property card when select property
- [x] Update room card when select room
- [x] Update tenant card when select tenant
- [x] Free user limit to 1 property, limit to 5 rooms
- [x] Add admin page to show all users
- [x] Calculate tenant duration
- [ ] Refresh user token
- [x] Add user last login time
- [ ] Redesign welcome email
- [ ] Use Stripe (Clair)
- [ ] Click to generate next month rent
- [ ] Chart bar for monthly total rent
- [ ] Calendar to show rooms availability

## License

This project is private.

## Support

For support, please contact the development team.
