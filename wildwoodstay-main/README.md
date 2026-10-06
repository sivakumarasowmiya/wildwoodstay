# The Wildwood Stay - Hotel Cabin Booking Application

A complete MERN stack application for booking luxury cabins in the Italian Dolomites. Built with MongoDB, Express, React, and Node.js.

## Features

### User Features
- **User Authentication**: Register and login with secure JWT authentication
- **Cabin Browsing**: View all available cabins with detailed information
- **Filtering**: Filter cabins by number of guests
- **Booking System**: Easy-to-use booking interface with date selection
- **Booking Management**: View, modify, and cancel bookings
- **Profile Management**: Update personal information and change password
- **Cabin Details**: View cabin amenities, reviews, and image gallery
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### Design Features
- **Modern UI**: Dark theme with gold accents (matching the reference images)
- **Professional Typography**: Elegant and readable font hierarchy
- **Image Gallery**: Multiple image support with navigation
- **Smooth Animations**: Subtle transitions and hover effects
- **Mobile Optimized**: Fully responsive layout

### Additional Features
- **Guest Area**: Information hub with FAQs, house rules, and activities
- **Booking Confirmation**: Detailed confirmation page with downloadable receipt
- **Reviews System**: Guest reviews with ratings
- **Search & Filter**: Find cabins by guest capacity
- **Error Handling**: User-friendly error messages with toast notifications

## Tech Stack

### Frontend
- **React 18**: UI framework
- **React Router v6**: Navigation
- **Axios**: HTTP client
- **React Toastify**: Toast notifications
- **React Icons**: Icon library
- **CSS3**: Modern styling with CSS Grid and Flexbox

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB ODM
- **JWT**: Authentication
- **Bcryptjs**: Password hashing

## Project Structure

```
wildwood-stay/
├── server/                 # Backend
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── server.js         # Server entry point
│   └── package.json
│
├── client/               # Frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── styles/       # CSS files
│   │   ├── context/      # React context
│   │   ├── utils/        # Utility functions
│   │   ├── App.js        # Main App component
│   │   └── index.js      # React entry point
│   ├── public/           # Static files
│   └── package.json
│
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd wildwood-stay
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   ```

3. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   ```

### Configuration

1. **Backend Configuration** (`server/.env`)
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/wildwood-stay
   JWT_SECRET=your_jwt_secret_key_here_change_in_production
   NODE_ENV=development
   ```

2. **Database Setup**
   ```bash
   # From server directory
   node seed.js
   ```

### Running the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
Server runs on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```
Application runs on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Cabins
- `GET /api/cabins` - Get all cabins (with optional filters)
- `GET /api/cabins/:id` - Get cabin details
- `POST /api/cabins` - Create cabin (admin)
- `PUT /api/cabins/:id` - Update cabin (admin)
- `DELETE /api/cabins/:id` - Delete cabin (admin)
- `POST /api/cabins/:id/reviews` - Add review (protected)

### Bookings
- `POST /api/bookings` - Create booking (protected)
- `GET /api/bookings/user/my-bookings` - Get user's bookings (protected)
- `GET /api/bookings/:id` - Get booking details (protected)
- `PUT /api/bookings/:id` - Update booking (protected)
- `PATCH /api/bookings/:id/cancel` - Cancel booking (protected)
- `GET /api/bookings` - Get all bookings (admin)

### Users
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update profile (protected)
- `POST /api/users/change-password` - Change password (protected)

## Color Scheme

The application uses a sophisticated dark theme with gold accents:
- **Primary Dark**: #1a2d3d (Dark blue-gray)
- **Secondary Dark**: #243447 (Slightly lighter blue-gray)
- **Accent Gold**: #c9a961 (Warm gold)
- **Text Light**: #e8e8e8 (Off-white)
- **Text Muted**: #b0b0b0 (Gray)

## Key Pages

1. **Home** - Landing page with featured cabins and company story
2. **Cabins** - Browse all cabins with filtering options
3. **Cabin Detail** - View detailed cabin information with image gallery
4. **Booking** - Create a new booking
5. **Booking Confirmation** - Confirmation after successful booking
6. **My Bookings** - View and manage personal bookings
7. **Profile Settings** - Update personal information and password
8. **Guest Area** - Information hub with FAQs and house rules
9. **About** - Company history and values
10. **Login/Register** - Authentication pages

## Features to Add (Future Enhancements)

- Payment gateway integration (Stripe/PayPal)
- Real-time availability calendar
- Email notifications
- Admin dashboard
- Advanced search with date range
- Wishlist functionality
- Rating and review system enhancements
- Multi-language support
- SMS notifications
- Coupon/discount system

## Security Features

- JWT authentication for protected routes
- Password hashing with bcryptjs
- CORS protection
- Input validation
- Secure error handling

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

This project is licensed under the MIT License.

## Support

For support, email info@wildwoodstay.com or call +39 123 456 7890

---

Built with ❤️ for The Wildwood Stay
