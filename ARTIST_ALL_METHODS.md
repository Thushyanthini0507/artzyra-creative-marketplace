# Artist - All API Methods

Complete documentation of all artist-related API endpoints, including authenticated artist routes, public routes, and admin routes.

---

## 🔐 Authenticated Artist Routes

**Base Path:** `/api/artist/*`  
**Authentication:** Required (JWT Token)  
**Role:** Artist  
**Approval:** Required (Artist must be approved)

---

### 1. Get Artist Profile

**Endpoint:** `GET /api/artist/profile`

**Description:** Get the authenticated artist's profile information.

**Request:**

```
GET /api/artist/profile
Headers: Authorization: Bearer {token}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "artist": {
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
      "skills": [
        "Wedding Photography",
        "Portrait Photography",
        "Photo Editing"
      ],
      "hourlyRate": 150,
      "availability": {},
      "rating": 4.8,
      "totalReviews": 25,
      "isApproved": true,
      "isActive": true,
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-12-01T10:00:00.000Z"
    }
  }
}
```

---

### 2. Update Artist Profile

**Endpoint:** `PUT /api/artist/profile`

**Description:** Update the authenticated artist's profile information.

**Request Body:**

```json
{
  "name": "John Photographer",
  "phone": "+1234567890",
  "bio": "Updated bio text",
  "category": "65a1b2c3d4e5f6g7h8i9j0k4",
  "skills": ["Wedding Photography", "Portrait Photography"],
  "hourlyRate": 175,
  "availability": {
    "monday": {
      "start": "09:00",
      "end": "17:00",
      "available": true
    }
  },
  "profileImage": "https://example.com/new-profile.jpg"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "artist": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k7",
      "userId": "65a1b2c3d4e5f6g7h8i9j0k3",
      "bio": "Updated bio text",
      "hourlyRate": 175,
      ...
    }
  }
}
```

**Note:** All fields are optional. Only provided fields will be updated.

---

### 3. Get Artist Bookings

**Endpoint:** `GET /api/artist/bookings`

**Description:** Get all bookings for the authenticated artist with search and filtering.

**Query Parameters:**

- `search` - Search in location and specialRequests fields
- `status` - Filter by status: `pending`, `accepted`, `rejected`, `completed`, `cancelled`
- `paymentStatus` - Filter by payment status: `pending`, `paid`, `refunded`
- `category` - Filter by category ID
- `startDate` - Start date (YYYY-MM-DD)
- `endDate` - End date (YYYY-MM-DD)
- `minAmount` - Minimum booking amount
- `maxAmount` - Maximum booking amount
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sortBy` - Sort field (default: bookingDate)
- `sortOrder` - Sort direction: `asc` or `desc` (default: desc)

**Example URLs:**

```
GET /api/artist/bookings
GET /api/artist/bookings?search=wedding&status=pending
GET /api/artist/bookings?status=accepted&paymentStatus=paid&page=1&limit=20
GET /api/artist/bookings?startDate=2024-01-01&endDate=2024-12-31&minAmount=100&maxAmount=1000
```

**Response:**

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
    "totalItems": 15,
    "totalPages": 2,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

---

### 4. Accept Booking

**Endpoint:** `PUT /api/artist/bookings/:bookingId/accept`

**Description:** Accept a pending booking. Only the artist who received the booking can accept it.

**Request:**

```
PUT /api/artist/bookings/65a1b2c3d4e5f6g7h8i9j0k1/accept
Headers: Authorization: Bearer {token}
```

**Response:**

```json
{
  "success": true,
  "message": "Booking accepted successfully",
  "data": {
    "booking": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "status": "accepted",
      ...
    }
  }
}
```

**Note:**

- Only pending bookings can be accepted
- Creates a notification for the customer
- Artist must be the owner of the booking

---

### 5. Reject Booking

**Endpoint:** `PUT /api/artist/bookings/:bookingId/reject`

**Description:** Reject a pending booking. Only the artist who received the booking can reject it.

**Request Body:**

```json
{
  "reason": "Not available on that date"
}
```

**Request:**

```
PUT /api/artist/bookings/65a1b2c3d4e5f6g7h8i9j0k1/reject
Headers: Authorization: Bearer {token}
Body: { "reason": "Not available on that date" }
```

**Response:**

```json
{
  "success": true,
  "message": "Booking rejected successfully",
  "data": {
    "booking": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "status": "rejected",
      ...
    }
  }
}
```

**Note:**

- Only pending bookings can be rejected
- Reason is optional
- Creates a notification for the customer
- Artist must be the owner of the booking

---

### 6. Get Artist Reviews

**Endpoint:** `GET /api/artist/reviews`

**Description:** Get all reviews for the authenticated artist with search and filtering.

**Query Parameters:**

- `search` - Search in comment field
- `minRating` - Minimum rating (1-5)
- `maxRating` - Maximum rating (1-5)
- `startDate` - Start date for review creation (YYYY-MM-DD)
- `endDate` - End date for review creation (YYYY-MM-DD)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sortBy` - Sort field (default: createdAt)
- `sortOrder` - Sort direction: `asc` or `desc` (default: desc)

**Example URLs:**

```
GET /api/artist/reviews
GET /api/artist/reviews?search=excellent&minRating=4
GET /api/artist/reviews?minRating=4&maxRating=5&page=1&limit=20
GET /api/artist/reviews?startDate=2024-01-01&endDate=2024-12-31&sortBy=rating&sortOrder=desc
```

**Response:**

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
      "comment": "Excellent service! Very professional photographer.",
      "isVisible": true,
      "createdAt": "2024-12-16T10:00:00.000Z",
      "updatedAt": "2024-12-16T10:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "limit": 10,
    "totalItems": 25,
    "totalPages": 3,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

**Note:** Only returns visible reviews (`isVisible: true`)

---

## 🌐 Public Artist Routes

**Base Path:** `/api/artists/*`  
**Authentication:** Not Required  
**Access:** Public

---

### 7. Get All Artists (Public)

**Endpoint:** `GET /api/artists`

**Description:** Get all approved and active artists with search and filtering. Public endpoint.

**Query Parameters:**

- `search` - Search in name, bio, and skills fields
- `category` - Filter by category ID
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)

**Example URLs:**

```
GET /api/artists
GET /api/artists?search=photography
GET /api/artists?category=65a1b2c3d4e5f6g7h8i9j0k4
GET /api/artists?search=wedding&category=65a1b2c3d4e5f6g7h8i9j0k4&page=1&limit=20
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k7",
      "userId": "65a1b2c3d4e5f6g7h8i9j0k3",
      "bio": "Professional wedding photographer",
      "profileImage": "https://example.com/profile.jpg",
      "category": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k4",
        "name": "Photographer",
        "description": "Professional photography services"
      },
      "skills": ["Wedding Photography", "Portrait Photography"],
      "hourlyRate": 150,
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
    "totalItems": 50,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

**Note:** Only returns approved and active artists. Password field is excluded.

---

### 8. Get Artist by ID (Public)

**Endpoint:** `GET /api/artists/:id`

**Description:** Get a specific approved artist by ID. Public endpoint.

**Request:**

```
GET /api/artists/65a1b2c3d4e5f6g7h8i9j0k7
```

**Response:**

```json
{
  "success": true,
  "message": "Artist retrieved successfully",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k7",
    "userId": "65a1b2c3d4e5f6g7h8i9j0k3",
    "bio": "Professional wedding photographer",
    "profileImage": "https://example.com/profile.jpg",
    "category": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k4",
      "name": "Photographer",
      "description": "Professional photography services"
    },
    "skills": ["Wedding Photography", "Portrait Photography"],
    "hourlyRate": 150,
    "rating": 4.8,
    "totalReviews": 25,
    "isApproved": true,
    "isActive": true,
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-12-01T10:00:00.000Z"
  }
}
```

**Note:** Only returns approved and active artists. Returns 404 if artist not found or not approved.

---

## 👨‍💼 Admin Artist Routes

**Base Path:** `/api/artists/*` (admin endpoints)  
**Authentication:** Required (JWT Token)  
**Role:** Admin  
**Approval:** Required (Admin must be approved)

---

### 9. Get Pending Artists (Admin Only)

**Endpoint:** `GET /api/artists/pending`

**Description:** Get all pending artists awaiting approval. Admin only.

**Query Parameters:**

- `search` - Search in name, email, bio, and skills fields
- `status` - Filter by status: `pending`, `approved`, `rejected` (default: pending)
- `category` - Filter by category ID
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sortBy` - Sort field (default: createdAt)
- `sortOrder` - Sort direction: `asc` or `desc` (default: desc)

**Example URLs:**

```
GET /api/artists/pending
GET /api/artists/pending?search=photography&status=pending
GET /api/artists/pending?category=65a1b2c3d4e5f6g7h8i9j0k4&page=1&limit=20
```

**Request:**

```
GET /api/artists/pending
Headers: Authorization: Bearer {admin_token}
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k8",
      "name": "New Artist",
      "email": "newartist@example.com",
      "phone": "+1234567892",
      "bio": "New photographer looking for opportunities",
      "category": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k4",
        "name": "Photographer",
        "description": "Professional photography services"
      },
      "skills": ["Event Photography"],
      "hourlyRate": 100,
      "status": "pending",
      "createdAt": "2024-12-01T10:00:00.000Z",
      "updatedAt": "2024-12-01T10:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "limit": 10,
    "totalItems": 5,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPrevPage": false
  }
}
```

---

### 10. Approve Artist (Admin Only)

**Endpoint:** `PUT /api/artists/approve/:id`

**Description:** Approve a pending artist. Admin only.

**Request:**

```
PUT /api/artists/approve/65a1b2c3d4e5f6g7h8i9j0k8
Headers: Authorization: Bearer {admin_token}
```

**Response:**

```json
{
  "success": true,
  "message": "Artist approved successfully",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k8",
    "isApproved": true,
    "isActive": true,
    ...
  }
}
```

**Note:**

- Sets `isApproved: true` and `isActive: true`
- If already approved, returns success message without changes

---

### 11. Reject Artist (Admin Only)

**Endpoint:** `DELETE /api/artists/reject/:id`

**Description:** Reject and remove a pending artist. Admin only.

**Request:**

```
DELETE /api/artists/reject/65a1b2c3d4e5f6g7h8i9j0k8
Headers: Authorization: Bearer {admin_token}
```

**Response:**

```json
{
  "success": true,
  "message": "Artist rejected and removed successfully"
}
```

**Note:** Permanently deletes the artist from the database.

---

## 📋 Summary Table

| #   | Method | Endpoint                          | Auth | Role   | Description                             |
| --- | ------ | --------------------------------- | ---- | ------ | --------------------------------------- |
| 1   | GET    | `/api/artist/profile`             | ✅   | Artist | Get artist profile                      |
| 2   | PUT    | `/api/artist/profile`             | ✅   | Artist | Update artist profile                   |
| 3   | GET    | `/api/artist/bookings`            | ✅   | Artist | Get artist bookings (with filters)      |
| 4   | PUT    | `/api/artist/bookings/:id/accept` | ✅   | Artist | Accept a booking                        |
| 5   | PUT    | `/api/artist/bookings/:id/reject` | ✅   | Artist | Reject a booking                        |
| 6   | GET    | `/api/artist/reviews`             | ✅   | Artist | Get artist reviews (with filters)       |
| 7   | GET    | `/api/artists`                    | ❌   | Public | Get all approved artists (with filters) |
| 8   | GET    | `/api/artists/:id`                | ❌   | Public | Get artist by ID                        |
| 9   | GET    | `/api/artists/pending`            | ✅   | Admin  | Get pending artists (with filters)      |
| 10  | PUT    | `/api/artists/approve/:id`        | ✅   | Admin  | Approve a pending artist                |
| 11  | DELETE | `/api/artists/reject/:id`         | ✅   | Admin  | Reject and remove a pending artist      |

---

## 🔍 Search & Filter Capabilities

### Artist Bookings

- **Search:** location, specialRequests
- **Filters:** status, paymentStatus, category, date range, amount range
- **Sort:** bookingDate, totalAmount, createdAt (asc/desc)
- **Pagination:** page, limit

### Artist Reviews

- **Search:** comment
- **Filters:** rating range, date range
- **Sort:** createdAt, rating (asc/desc)
- **Pagination:** page, limit

### Public Artists

- **Search:** name, bio, skills
- **Filters:** category
- **Pagination:** page, limit (max 100)

### Admin Pending Artists

- **Search:** name, email, bio, skills
- **Filters:** status, category
- **Sort:** createdAt (asc/desc)
- **Pagination:** page, limit

---

## 🔐 Authentication & Authorization

### Artist Routes (`/api/artist/*`)

- **Required:** JWT Token in `Authorization: Bearer {token}` header
- **Role Check:** Must be `artist` role
- **Approval Check:** Artist must be approved (`isApproved: true`)

### Public Routes (`/api/artists`)

- **No authentication required**
- Only returns approved and active artists

### Admin Routes (`/api/artists/pending`, `/api/artists/approve/:id`, `/api/artists/reject/:id`)

- **Required:** JWT Token in `Authorization: Bearer {token}` header
- **Role Check:** Must be `admin` role
- **Approval Check:** Admin must be approved

---

## 📝 Notes

1. **All search queries are case-insensitive**
2. **Date formats:** Use `YYYY-MM-DD` format (e.g., `2024-12-15`)
3. **Object IDs:** Must be valid MongoDB ObjectIds (24 hex characters)
4. **Pagination defaults:** `page=1`, `limit=10`
5. **Sort defaults:** `sortBy=createdAt`, `sortOrder=desc`
6. **Rating range:** 1-5 (integers)
7. **Amount filters:** Numeric values (e.g., `100`, `500.50`)
8. **Profile updates:** All fields are optional, only provided fields are updated
9. **Booking actions:** Only pending bookings can be accepted/rejected
10. **Public endpoints:** Only show approved and active artists

---

## 🚨 Error Responses

All endpoints return standard error format:

```json
{
  "success": false,
  "message": "Error message here"
}
```

Common error codes:

- `400` - Bad Request (invalid parameters)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource doesn't exist)
- `409` - Conflict (duplicate entry)
