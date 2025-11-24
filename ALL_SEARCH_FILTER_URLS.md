# All Search and Filtration Method URLs

Complete list of all API endpoints with search and filtering query parameters.

---

## 1. Customer Bookings

**Base URL:** `GET /api/customer/bookings`

**All Query Parameters:**

- `search` - Search in location and specialRequests
- `status` - Filter by status (pending, accepted, rejected, completed, cancelled)
- `paymentStatus` - Filter by payment status (pending, paid, refunded)
- `artist` - Filter by artist ID
- `category` - Filter by category ID
- `startDate` - Start date (YYYY-MM-DD)
- `endDate` - End date (YYYY-MM-DD)
- `minAmount` - Minimum booking amount
- `maxAmount` - Maximum booking amount
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sortBy` - Sort field (default: bookingDate)
- `sortOrder` - Sort direction: asc or desc (default: desc)

**Example URLs:**

```
GET /api/customer/bookings?search=wedding
GET /api/customer/bookings?status=completed&paymentStatus=paid
GET /api/customer/bookings?artist=65a1b2c3d4e5f6g7h8i9j0k3&category=65a1b2c3d4e5f6g7h8i9j0k4
GET /api/customer/bookings?startDate=2024-01-01&endDate=2024-12-31
GET /api/customer/bookings?minAmount=100&maxAmount=1000
GET /api/customer/bookings?search=outdoor&status=pending&page=1&limit=20&sortBy=bookingDate&sortOrder=asc
```

---

## 2. Customer Reviews

**Base URL:** `GET /api/customer/reviews`

**All Query Parameters:**

- `search` - Search in comment field
- `artist` - Filter by artist ID
- `minRating` - Minimum rating (1-5)
- `maxRating` - Maximum rating (1-5)
- `startDate` - Start date for review creation (YYYY-MM-DD)
- `endDate` - End date for review creation (YYYY-MM-DD)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sortBy` - Sort field (default: createdAt)
- `sortOrder` - Sort direction: asc or desc (default: desc)

**Example URLs:**

```
GET /api/customer/reviews?search=excellent
GET /api/customer/reviews?artist=65a1b2c3d4e5f6g7h8i9j0k3
GET /api/customer/reviews?minRating=4&maxRating=5
GET /api/customer/reviews?startDate=2024-01-01&endDate=2024-12-31
GET /api/customer/reviews?search=professional&minRating=4&page=1&limit=10&sortBy=rating&sortOrder=desc
```

---

## 3. Artist Bookings

**Base URL:** `GET /api/artist/bookings`

**All Query Parameters:**

- `search` - Search in location and specialRequests
- `status` - Filter by status (pending, accepted, rejected, completed, cancelled)
- `paymentStatus` - Filter by payment status (pending, paid, refunded)
- `category` - Filter by category ID
- `startDate` - Start date (YYYY-MM-DD)
- `endDate` - End date (YYYY-MM-DD)
- `minAmount` - Minimum booking amount
- `maxAmount` - Maximum booking amount
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sortBy` - Sort field (default: bookingDate)
- `sortOrder` - Sort direction: asc or desc (default: desc)

**Example URLs:**

```
GET /api/artist/bookings?search=wedding
GET /api/artist/bookings?status=pending&paymentStatus=pending
GET /api/artist/bookings?category=65a1b2c3d4e5f6g7h8i9j0k4
GET /api/artist/bookings?startDate=2024-01-01&endDate=2024-12-31
GET /api/artist/bookings?minAmount=200&maxAmount=800
GET /api/artist/bookings?search=outdoor&status=accepted&page=2&limit=15&sortBy=totalAmount&sortOrder=desc
```

---

## 4. Artist Reviews

**Base URL:** `GET /api/artist/reviews`

**All Query Parameters:**

- `search` - Search in comment field
- `minRating` - Minimum rating (1-5)
- `maxRating` - Maximum rating (1-5)
- `startDate` - Start date for review creation (YYYY-MM-DD)
- `endDate` - End date for review creation (YYYY-MM-DD)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sortBy` - Sort field (default: createdAt)
- `sortOrder` - Sort direction: asc or desc (default: desc)

**Example URLs:**

```
GET /api/artist/reviews?search=professional
GET /api/artist/reviews?minRating=4&maxRating=5
GET /api/artist/reviews?startDate=2024-01-01&endDate=2024-12-31
GET /api/artist/reviews?search=excellent&minRating=5&page=1&limit=20&sortBy=rating&sortOrder=desc
```

---

## 5. Admin Users

**Base URL:** `GET /api/admin/users`

**All Query Parameters:**

- `role` - **REQUIRED** - Filter by role (artist or customer)
- `search` - Search in name, email, bio (artists), skills (artists)
- `isApproved` - Filter by approval status (true/false)
- `isActive` - Filter by active status (true/false)
- `category` - Filter artists by category ID
- `minRating` - Minimum rating for artists (0-5)
- `maxHourlyRate` - Maximum hourly rate for artists
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sortBy` - Sort field (default: createdAt)
- `sortOrder` - Sort direction: asc or desc (default: desc)

**Example URLs:**

```
GET /api/admin/users?role=artist&search=photography
GET /api/admin/users?role=customer&isApproved=true&isActive=true
GET /api/admin/users?role=artist&category=65a1b2c3d4e5f6g7h8i9j0k4
GET /api/admin/users?role=artist&minRating=4&maxHourlyRate=200
GET /api/admin/users?role=artist&search=wedding&isApproved=true&category=65a1b2c3d4e5f6g7h8i9j0k4&page=1&limit=20&sortBy=rating&sortOrder=desc
```

---

## 6. Admin Bookings

**Base URL:** `GET /api/admin/bookings`

**All Query Parameters:**

- `search` - Search in location and specialRequests
- `status` - Filter by status (pending, accepted, rejected, completed, cancelled)
- `paymentStatus` - Filter by payment status (pending, paid, refunded)
- `customer` - Filter by customer ID
- `artist` - Filter by artist ID
- `category` - Filter by category ID
- `startDate` - Start date (YYYY-MM-DD)
- `endDate` - End date (YYYY-MM-DD)
- `minAmount` - Minimum booking amount
- `maxAmount` - Maximum booking amount
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sortBy` - Sort field (default: createdAt)
- `sortOrder` - Sort direction: asc or desc (default: desc)

**Example URLs:**

```
GET /api/admin/bookings?search=wedding
GET /api/admin/bookings?status=completed&paymentStatus=paid
GET /api/admin/bookings?customer=65a1b2c3d4e5f6g7h8i9j0k2&artist=65a1b2c3d4e5f6g7h8i9j0k3
GET /api/admin/bookings?category=65a1b2c3d4e5f6g7h8i9j0k4
GET /api/admin/bookings?startDate=2024-01-01&endDate=2024-12-31
GET /api/admin/bookings?minAmount=100&maxAmount=1000
GET /api/admin/bookings?search=outdoor&status=pending&category=65a1b2c3d4e5f6g7h8i9j0k4&startDate=2024-01-01&endDate=2024-12-31&page=1&limit=25&sortBy=totalAmount&sortOrder=desc
```

---

## 7. Payments

**Base URL:** `GET /api/payments`

**All Query Parameters:**

- `search` - Search in transactionId field
- `status` - Filter by payment status (pending, completed, refunded)
- `paymentMethod` - Filter by payment method
- `customer` - Filter by customer ID (admin only)
- `artist` - Filter by artist ID (admin only)
- `booking` - Filter by booking ID
- `startDate` - Start date for payment date (YYYY-MM-DD)
- `endDate` - End date for payment date (YYYY-MM-DD)
- `minAmount` - Minimum payment amount
- `maxAmount` - Maximum payment amount
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sortBy` - Sort field (default: createdAt)
- `sortOrder` - Sort direction: asc or desc (default: desc)

**Note:** Role-based - Customers see only their payments, Artists see only their payments, Admins see all.

**Example URLs:**

```
GET /api/payments?search=TXN-123
GET /api/payments?status=completed&paymentMethod=Card
GET /api/payments?customer=65a1b2c3d4e5f6g7h8i9j0k2&artist=65a1b2c3d4e5f6g7h8i9j0k3
GET /api/payments?booking=65a1b2c3d4e5f6g7h8i9j0k1
GET /api/payments?startDate=2024-01-01&endDate=2024-12-31
GET /api/payments?minAmount=100&maxAmount=1000
GET /api/payments?search=TXN&status=completed&startDate=2024-01-01&endDate=2024-12-31&page=1&limit=20&sortBy=amount&sortOrder=desc
```

---

## 8. Reviews by Artist

**Base URL:** `GET /api/reviews/artist/{artistId}`

**All Query Parameters:**

- `search` - Search in comment field
- `minRating` - Minimum rating (1-5)
- `maxRating` - Maximum rating (1-5)
- `startDate` - Start date for review creation (YYYY-MM-DD)
- `endDate` - End date for review creation (YYYY-MM-DD)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sortBy` - Sort field (default: createdAt)
- `sortOrder` - Sort direction: asc or desc (default: desc)

**Note:** Public endpoint - no authentication required. Only returns visible reviews.

**Example URLs:**

```
GET /api/reviews/artist/65a1b2c3d4e5f6g7h8i9j0k3?search=excellent
GET /api/reviews/artist/65a1b2c3d4e5f6g7h8i9j0k3?minRating=4&maxRating=5
GET /api/reviews/artist/65a1b2c3d4e5f6g7h8i9j0k3?startDate=2024-01-01&endDate=2024-12-31
GET /api/reviews/artist/65a1b2c3d4e5f6g7h8i9j0k3?search=professional&minRating=4&page=1&limit=15&sortBy=rating&sortOrder=desc
```

---

## 9. Categories

**Base URL:** `GET /api/categories`

**All Query Parameters:**

- `search` - Search in name and description fields
- `isActive` - Filter by active status (true/false)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Example URLs:**

```
GET /api/categories?search=photography
GET /api/categories?isActive=true
GET /api/categories?search=music&isActive=true&page=1&limit=20
```

---

## 10. Artists by Category

**Base URL:** `GET /api/categories/{categoryId}/artists`

**All Query Parameters:**

- `search` - Search in name, bio, and skills fields
- `minRating` - Minimum rating filter (0-5)
- `maxRate` - Maximum hourly rate filter
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Note:** Returns only approved and active artists in the specified category.

**Example URLs:**

```
GET /api/categories/65a1b2c3d4e5f6g7h8i9j0k4/artists?search=wedding
GET /api/categories/65a1b2c3d4e5f6g7h8i9j0k4/artists?minRating=4&maxRate=200
GET /api/categories/65a1b2c3d4e5f6g7h8i9j0k4/artists?search=photography&minRating=4&maxRate=150&page=1&limit=20
```

---

## 11. Public Artists

**Base URL:** `GET /api/artists`

**All Query Parameters:**

- `search` - Search in name, bio, and skills fields
- `category` - Filter by category ID
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)

**Note:** Public endpoint - no authentication required. Returns only approved and active artists.

**Example URLs:**

```
GET /api/artists?search=photography
GET /api/artists?category=65a1b2c3d4e5f6g7h8i9j0k4
GET /api/artists?search=wedding&category=65a1b2c3d4e5f6g7h8i9j0k4&page=1&limit=20
```

---

## 12. Admin Pending Artists

**Base URL:** `GET /api/admin/pending/artists`

**All Query Parameters:**

- `search` - Search in name, email, bio, and skills fields
- `status` - Filter by status (pending, approved, rejected) - defaults to pending
- `category` - Filter by category ID
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sortBy` - Sort field (default: createdAt)
- `sortOrder` - Sort direction: asc or desc (default: desc)

**Example URLs:**

```
GET /api/admin/pending/artists?search=photography
GET /api/admin/pending/artists?status=pending&category=65a1b2c3d4e5f6g7h8i9j0k4
GET /api/admin/pending/artists?search=wedding&status=pending&page=1&limit=20&sortBy=createdAt&sortOrder=desc
```

---

## Quick Reference - Search Fields

| Endpoint              | Search Fields                                |
| --------------------- | -------------------------------------------- |
| Customer Bookings     | location, specialRequests                    |
| Customer Reviews      | comment                                      |
| Artist Bookings       | location, specialRequests                    |
| Artist Reviews        | comment                                      |
| Admin Users           | name, email, bio (artists), skills (artists) |
| Admin Bookings        | location, specialRequests                    |
| Payments              | transactionId                                |
| Reviews by Artist     | comment                                      |
| Categories            | name, description                            |
| Artists by Category   | name, bio, skills                            |
| Public Artists        | name, bio, skills                            |
| Admin Pending Artists | name, email, bio, skills                     |

---

## Quick Reference - Common Filters

### Status Filters

- **Booking Status:** `pending`, `accepted`, `rejected`, `completed`, `cancelled`
- **Payment Status:** `pending`, `paid`, `refunded`
- **Review Rating:** `1` to `5` (integers)

### Date Formats

- All dates use format: `YYYY-MM-DD`
- Example: `2024-12-15`

### Pagination Defaults

- `page`: Default `1`
- `limit`: Default `10` (max `100` for public artists)

### Sort Options

- `sortBy`: Field name (e.g., `createdAt`, `bookingDate`, `rating`, `totalAmount`)
- `sortOrder`: `asc` or `desc` (default: `desc`)

---

## Authentication Requirements

- **Customer Endpoints** (`/api/customer/*`): Customer authentication required
- **Artist Endpoints** (`/api/artist/*`): Artist authentication required
- **Admin Endpoints** (`/api/admin/*`): Admin authentication required
- **Public Endpoints** (`/api/artists`, `/api/reviews/artist/*`, `/api/categories`): No authentication required

---

## Notes

1. All search queries are **case-insensitive**
2. Search uses partial matching (e.g., "photo" matches "photography")
3. Multiple query parameters can be combined
4. Date ranges use `startDate` (inclusive) and `endDate` (inclusive)
5. Amount ranges use `minAmount` (>=) and `maxAmount` (<=)
6. Rating ranges use `minRating` (>=) and `maxRating` (<=)
7. Object IDs must be valid MongoDB ObjectIds (24 hex characters)
