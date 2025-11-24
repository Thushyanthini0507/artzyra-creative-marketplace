# API Endpoints - Complete Data Structure Documentation

This document provides complete data structure examples for all search-enabled endpoints in the Artzyra API.

---

## 1. Customer Bookings

**Endpoint:** `GET /api/customer/bookings?search={term}`

**Query Parameters:**
- `search`: Searches in `location` and `specialRequests` fields
- `status`: Filter by booking status (pending, accepted, rejected, completed, cancelled)
- `paymentStatus`: Filter by payment status (pending, paid, refunded)
- `artist`: Filter by artist ID
- `category`: Filter by category ID
- `startDate`: Start date (YYYY-MM-DD)
- `endDate`: End date (YYYY-MM-DD)
- `minAmount`: Minimum booking amount
- `maxAmount`: Maximum booking amount
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `sortBy`: Sort field (default: bookingDate)
- `sortOrder`: Sort direction - "asc" or "desc" (default: desc)

**Example Request:**
```
GET /api/customer/bookings?search=wedding&status=completed&page=1&limit=10
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "customer": "65a1b2c3d4e5f6g7h8i9j0k2",
      "artist": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k3",
        "name": "John Photographer",
        "email": "john@example.com",
        "phone": "+1234567890",
        "profileImage": "https://example.com/profile.jpg",
        "rating": 4.5,
        "category": {
          "_id": "65a1b2c3d4e5f6g7h8i9j0k4",
          "name": "Photographer",
          "description": "Professional photography services"
        }
      },
      "category": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k4",
        "name": "Photographer",
        "description": "Professional photography services"
      },
      "bookingDate": "2024-12-15T00:00:00.000Z",
      "startTime": "14:00",
      "endTime": "18:00",
      "duration": 4,
      "totalAmount": 600,
      "status": "completed",
      "specialRequests": "Wedding photography with outdoor shots",
      "location": "Grand Hotel, Downtown",
      "paymentStatus": "paid",
      "payment": "65a1b2c3d4e5f6g7h8i9j0k5",
      "createdAt": "2024-11-01T10:00:00.000Z",
      "updatedAt": "2024-12-15T18:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "limit": 10,
    "totalItems": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPrevPage": false
  }
}
```

---

## 2. Customer Reviews

**Endpoint:** `GET /api/customer/reviews?search={term}`

**Query Parameters:**
- `search`: Searches in `comment` field
- `artist`: Filter by artist ID
- `minRating`: Minimum rating (1-5)
- `maxRating`: Maximum rating (1-5)
- `startDate`: Start date for review creation (YYYY-MM-DD)
- `endDate`: End date for review creation (YYYY-MM-DD)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `sortBy`: Sort field (default: createdAt)
- `sortOrder`: Sort direction - "asc" or "desc" (default: desc)

**Example Request:**
```
GET /api/customer/reviews?search=excellent&minRating=4&page=1&limit=10
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k6",
      "booking": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
        "bookingDate": "2024-12-15T00:00:00.000Z",
        "startTime": "14:00",
        "endTime": "18:00"
      },
      "customer": "65a1b2c3d4e5f6g7h8i9j0k2",
      "artist": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k3",
        "name": "John Photographer",
        "profileImage": "https://example.com/profile.jpg",
        "category": {
          "_id": "65a1b2c3d4e5f6g7h8i9j0k4",
          "name": "Photographer"
        }
      },
      "rating": 5,
      "comment": "Excellent service! The photographer was professional and captured beautiful moments.",
      "isVisible": true,
      "createdAt": "2024-12-16T10:00:00.000Z",
      "updatedAt": "2024-12-16T10:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "limit": 10,
    "totalItems": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPrevPage": false
  }
}
```

---

## 3. Artist Bookings

**Endpoint:** `GET /api/artist/bookings?search={term}`

**Query Parameters:**
- `search`: Searches in `location` and `specialRequests` fields
- `status`: Filter by booking status
- `paymentStatus`: Filter by payment status
- `category`: Filter by category ID
- `startDate`: Start date (YYYY-MM-DD)
- `endDate`: End date (YYYY-MM-DD)
- `minAmount`: Minimum booking amount
- `maxAmount`: Maximum booking amount
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `sortBy`: Sort field (default: bookingDate)
- `sortOrder`: Sort direction (default: desc)

**Example Request:**
```
GET /api/artist/bookings?search=outdoor&status=pending&page=1&limit=10
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "customer": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
        "name": "Jane Doe",
        "email": "jane@example.com",
        "phone": "+1234567891",
        "profileImage": "https://example.com/customer.jpg"
      },
      "artist": "65a1b2c3d4e5f6g7h8i9j0k3",
      "category": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k4",
        "name": "Photographer",
        "description": "Professional photography services"
      },
      "bookingDate": "2024-12-20T00:00:00.000Z",
      "startTime": "10:00",
      "endTime": "14:00",
      "duration": 4,
      "totalAmount": 500,
      "status": "pending",
      "specialRequests": "Outdoor photoshoot in the park",
      "location": "Central Park, New York",
      "paymentStatus": "pending",
      "createdAt": "2024-12-01T10:00:00.000Z",
      "updatedAt": "2024-12-01T10:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "limit": 10,
    "totalItems": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPrevPage": false
  }
}
```

---

## 4. Artist Reviews

**Endpoint:** `GET /api/artist/reviews?search={term}`

**Query Parameters:**
- `search`: Searches in `comment` field
- `minRating`: Minimum rating (1-5)
- `maxRating`: Maximum rating (1-5)
- `startDate`: Start date for review creation (YYYY-MM-DD)
- `endDate`: End date for review creation (YYYY-MM-DD)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `sortBy`: Sort field (default: createdAt)
- `sortOrder`: Sort direction (default: desc)

**Example Request:**
```
GET /api/artist/reviews?search=professional&minRating=4&page=1&limit=10
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k6",
      "booking": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
        "bookingDate": "2024-12-15T00:00:00.000Z",
        "startTime": "14:00",
        "endTime": "18:00"
      },
      "customer": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
        "name": "Jane Doe",
        "profileImage": "https://example.com/customer.jpg"
      },
      "artist": "65a1b2c3d4e5f6g7h8i9j0k3",
      "rating": 5,
      "comment": "Very professional photographer with excellent skills!",
      "isVisible": true,
      "createdAt": "2024-12-16T10:00:00.000Z",
      "updatedAt": "2024-12-16T10:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "limit": 10,
    "totalItems": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPrevPage": false
  }
}
```

---

## 5. Admin Users

**Endpoint:** `GET /api/admin/users?role={role}&search={term}`

**Query Parameters:**
- `role`: **REQUIRED** - "artist" or "customer"
- `search`: Searches in `name`, `email`, `bio` (artists), `skills` (artists)
- `isApproved`: Filter by approval status (true/false)
- `isActive`: Filter by active status (true/false)
- `category`: Filter artists by category ID
- `minRating`: Minimum rating for artists (0-5)
- `maxHourlyRate`: Maximum hourly rate for artists
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `sortBy`: Sort field (default: createdAt)
- `sortOrder`: Sort direction (default: desc)

**Example Request:**
```
GET /api/admin/users?role=artist&search=photography&isApproved=true&page=1&limit=10
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k3",
      "name": "John Photographer",
      "email": "john@example.com",
      "phone": "+1234567890",
      "role": "artist",
      "category": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k4",
        "name": "Photographer",
        "description": "Professional photography services"
      },
      "profileRef": "65a1b2c3d4e5f6g7h8i9j0k7",
      "profileType": "Artist",
      "isApproved": true,
      "isActive": true,
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-12-01T10:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "limit": 10,
    "totalItems": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPrevPage": false
  }
}
```

---

## 6. Admin Bookings

**Endpoint:** `GET /api/admin/bookings?search={term}`

**Query Parameters:**
- `search`: Searches in `location` and `specialRequests` fields
- `status`: Filter by booking status
- `paymentStatus`: Filter by payment status
- `customer`: Filter by customer ID
- `artist`: Filter by artist ID
- `category`: Filter by category ID
- `startDate`: Start date (YYYY-MM-DD)
- `endDate`: End date (YYYY-MM-DD)
- `minAmount`: Minimum booking amount
- `maxAmount`: Maximum booking amount
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `sortBy`: Sort field (default: createdAt)
- `sortOrder`: Sort direction (default: desc)

**Example Request:**
```
GET /api/admin/bookings?search=wedding&status=completed&page=1&limit=10
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "customer": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
        "name": "Jane Doe",
        "email": "jane@example.com",
        "phone": "+1234567891"
      },
      "artist": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k3",
        "name": "John Photographer",
        "email": "john@example.com",
        "phone": "+1234567890",
        "profileImage": "https://example.com/profile.jpg",
        "rating": 4.5
      },
      "category": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k4",
        "name": "Photographer",
        "description": "Professional photography services"
      },
      "bookingDate": "2024-12-15T00:00:00.000Z",
      "startTime": "14:00",
      "endTime": "18:00",
      "duration": 4,
      "totalAmount": 600,
      "status": "completed",
      "specialRequests": "Wedding photography with outdoor shots",
      "location": "Grand Hotel, Downtown",
      "paymentStatus": "paid",
      "payment": "65a1b2c3d4e5f6g7h8i9j0k5",
      "createdAt": "2024-11-01T10:00:00.000Z",
      "updatedAt": "2024-12-15T18:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "limit": 10,
    "totalItems": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPrevPage": false
  }
}
```

---

## 7. Payments

**Endpoint:** `GET /api/payments?search={term}`

**Query Parameters:**
- `search`: Searches in `transactionId` field
- `status`: Filter by payment status (pending, completed, refunded)
- `paymentMethod`: Filter by payment method
- `customer`: Filter by customer ID (admin only)
- `artist`: Filter by artist ID (admin only)
- `booking`: Filter by booking ID
- `startDate`: Start date for payment date (YYYY-MM-DD)
- `endDate`: End date for payment date (YYYY-MM-DD)
- `minAmount`: Minimum payment amount
- `maxAmount`: Maximum payment amount
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `sortBy`: Sort field (default: createdAt)
- `sortOrder`: Sort direction (default: desc)

**Note:** Role-based filtering - Customers see only their payments, Artists see only payments for their services, Admins see all.

**Example Request:**
```
GET /api/payments?search=TXN-123&status=completed&page=1&limit=10
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k5",
      "booking": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
        "bookingDate": "2024-12-15T00:00:00.000Z",
        "startTime": "14:00",
        "endTime": "18:00",
        "totalAmount": 600
      },
      "customer": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
        "name": "Jane Doe",
        "email": "jane@example.com"
      },
      "artist": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k3",
        "name": "John Photographer",
        "email": "john@example.com"
      },
      "amount": 600,
      "paymentMethod": "Card",
      "transactionId": "TXN-123456789",
      "status": "completed",
      "paymentDate": "2024-12-15T14:00:00.000Z",
      "createdAt": "2024-12-15T14:00:00.000Z",
      "updatedAt": "2024-12-15T14:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "limit": 10,
    "totalItems": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPrevPage": false
  }
}
```

---

## 8. Reviews by Artist

**Endpoint:** `GET /api/reviews/artist/{id}?search={term}`

**Query Parameters:**
- `search`: Searches in `comment` field
- `minRating`: Minimum rating (1-5)
- `maxRating`: Maximum rating (1-5)
- `startDate`: Start date for review creation (YYYY-MM-DD)
- `endDate`: End date for review creation (YYYY-MM-DD)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `sortBy`: Sort field (default: createdAt)
- `sortOrder`: Sort direction (default: desc)

**Note:** Public endpoint - no authentication required. Only returns visible reviews.

**Example Request:**
```
GET /api/reviews/artist/65a1b2c3d4e5f6g7h8i9j0k3?search=excellent&minRating=4&page=1&limit=10
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k6",
      "booking": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
        "bookingDate": "2024-12-15T00:00:00.000Z",
        "startTime": "14:00",
        "endTime": "18:00"
      },
      "customer": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
        "name": "Jane Doe",
        "profileImage": "https://example.com/customer.jpg"
      },
      "artist": "65a1b2c3d4e5f6g7h8i9j0k3",
      "rating": 5,
      "comment": "Excellent service! The photographer was professional and captured beautiful moments.",
      "isVisible": true,
      "createdAt": "2024-12-16T10:00:00.000Z",
      "updatedAt": "2024-12-16T10:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "limit": 10,
    "totalItems": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPrevPage": false
  }
}
```

---

## 9. Categories

**Endpoint:** `GET /api/categories?search={term}`

**Query Parameters:**
- `search`: Searches in `name` and `description` fields
- `isActive`: Filter by active status (true/false)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

**Example Request:**
```
GET /api/categories?search=photography&isActive=true&page=1&limit=10
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k4",
      "name": "Photographer",
      "description": "Professional photography services for weddings, events, and portraits",
      "image": "https://example.com/images/photography.jpg",
      "isActive": true,
      "createdAt": "2024-01-01T10:00:00.000Z",
      "updatedAt": "2024-01-01T10:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "limit": 10,
    "totalItems": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPrevPage": false
  }
}
```

---

## 10. Artists by Category

**Endpoint:** `GET /api/categories/{id}/artists?search={term}`

**Query Parameters:**
- `search`: Searches in `name`, `bio`, and `skills` fields
- `minRating`: Minimum rating filter (0-5)
- `maxRate`: Maximum hourly rate filter
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

**Note:** Returns only approved and active artists in the specified category.

**Example Request:**
```
GET /api/categories/65a1b2c3d4e5f6g7h8i9j0k4/artists?search=wedding&minRating=4&maxRate=200&page=1&limit=10
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k7",
      "userId": "65a1b2c3d4e5f6g7h8i9j0k3",
      "bio": "Professional wedding photographer with 10 years of experience",
      "profileImage": "https://example.com/profile.jpg",
      "category": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k4",
        "name": "Photographer",
        "description": "Professional photography services",
        "image": "https://example.com/images/photography.jpg"
      },
      "skills": ["Wedding Photography", "Portrait Photography", "Photo Editing"],
      "hourlyRate": 150,
      "availability": {},
      "rating": 4.8,
      "totalReviews": 25,
      "isApproved": true,
      "isActive": true,
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-12-01T10:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "limit": 10,
    "totalItems": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPrevPage": false
  }
}
```

---

## 11. Public Artists

**Endpoint:** `GET /api/artists?search={term}`

**Query Parameters:**
- `search`: Searches in `name`, `bio`, and `skills` fields
- `category`: Filter by category ID
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)

**Note:** Public endpoint - no authentication required. Returns only approved and active artists.

**Example Request:**
```
GET /api/artists?search=photography&category=65a1b2c3d4e5f6g7h8i9j0k4&page=1&limit=10
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k7",
      "userId": "65a1b2c3d4e5f6g7h8i9j0k3",
      "bio": "Professional wedding photographer with 10 years of experience",
      "profileImage": "https://example.com/profile.jpg",
      "category": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k4",
        "name": "Photographer",
        "description": "Professional photography services"
      },
      "skills": ["Wedding Photography", "Portrait Photography", "Photo Editing"],
      "hourlyRate": 150,
      "availability": {},
      "rating": 4.8,
      "totalReviews": 25,
      "isApproved": true,
      "isActive": true,
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-12-01T10:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "limit": 10,
    "totalItems": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPrevPage": false
  }
}
```

---

## Common Response Structure

All endpoints follow this standard response format:

```json
{
  "success": true,
  "data": [...],  // Array of items
  "pagination": {
    "currentPage": 1,
    "limit": 10,
    "totalItems": 50,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

## Error Response Structure

```json
{
  "success": false,
  "message": "Error message here"
}
```

## Search Behavior

- All search queries are **case-insensitive**
- Search uses MongoDB `$regex` with `"i"` option
- Search matches **partial strings** (e.g., "photo" matches "photography")
- Multiple fields are searched using `$or` operator when applicable

## Authentication

- **Customer endpoints** (`/api/customer/*`): Require customer authentication
- **Artist endpoints** (`/api/artist/*`): Require artist authentication
- **Admin endpoints** (`/api/admin/*`): Require admin authentication
- **Public endpoints** (`/api/artists`, `/api/reviews/artist/*`): No authentication required

## Notes

1. All timestamps are in ISO 8601 format (UTC)
2. Object IDs are MongoDB ObjectIds (24 hex characters)
3. Pagination defaults: `page=1`, `limit=10`
4. Sorting defaults: `sortBy=createdAt`, `sortOrder=desc`
5. Date filters accept ISO date strings (YYYY-MM-DD)
6. Amount filters accept numeric values
7. Rating filters accept integers 1-5

