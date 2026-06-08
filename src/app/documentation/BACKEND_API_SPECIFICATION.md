# 🔌 BACKEND API SPECIFICATION
## Rooted Tales E-Book System

**Version:** 1.0.0  
**Last Updated:** December 29, 2025  
**Base URL:** `https://api.rootedtales.com/v1`

---

## 📋 OVERVIEW

This document specifies the backend API endpoints required for the Rooted Tales e-book purchase, download, and management system.

**Technology Stack Recommendations:**
- **Runtime:** Node.js (Express) or Python (FastAPI)
- **Database:** PostgreSQL or MongoDB
- **Authentication:** Firebase Auth or Auth0
- **Storage:** AWS S3 or Google Cloud Storage
- **Payment:** Google Play Billing API
- **Push Notifications:** Firebase Cloud Messaging

---

## 🔐 AUTHENTICATION

All API endpoints require authentication unless specified otherwise.

### Authentication Header

```
Authorization: Bearer <JWT_TOKEN>
```

### Get Auth Token

**Endpoint:** `POST /auth/login`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "********"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "refresh_token_here",
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "expiresIn": 3600
}
```

---

## 📚 BOOK CATALOG ENDPOINTS

### 1. List All Books

**Endpoint:** `GET /books`

**Query Parameters:**
- `category` (optional): Filter by category
- `theme` (optional): Filter by theme (forest, ocean, sunset, night)
- `ageRange` (optional): Filter by age range
- `limit` (optional): Number of results (default: 20)
- `offset` (optional): Pagination offset

**Response:**
```json
{
  "books": [
    {
      "id": "book_123",
      "title": "Akai's Forest Adventure",
      "author": "XenWinx Authors",
      "description": "Join Akai on an exciting journey...",
      "price": 4.99,
      "currency": "USD",
      "format": "EPUB",
      "pages": 48,
      "fileSize": "12 MB",
      "coverUrl": "https://cdn.rootedtales.com/covers/akai-forest.jpg",
      "isDRMProtected": true,
      "category": "Adventure",
      "ageRange": "4-8 years",
      "theme": "forest",
      "rating": 4.8,
      "reviewCount": 124,
      "isPublished": true,
      "createdAt": "2025-01-01T00:00:00Z",
      "updatedAt": "2025-12-29T00:00:00Z"
    }
  ],
  "total": 12,
  "limit": 20,
  "offset": 0
}
```

### 2. Get Book Details

**Endpoint:** `GET /books/:bookId`

**Response:**
```json
{
  "id": "book_123",
  "title": "Akai's Forest Adventure",
  "author": "XenWinx Authors",
  "description": "Join Akai on an exciting journey through the mystical forest...",
  "price": 4.99,
  "currency": "USD",
  "format": "EPUB",
  "pages": 48,
  "fileSize": "12 MB",
  "coverUrl": "https://cdn.rootedtales.com/covers/akai-forest.jpg",
  "previewUrl": "https://cdn.rootedtales.com/previews/akai-forest-preview.pdf",
  "isDRMProtected": true,
  "category": "Adventure",
  "ageRange": "4-8 years",
  "theme": "forest",
  "rating": 4.8,
  "reviewCount": 124,
  "tableOfContents": [...],
  "samplePages": [1, 2, 3],
  "relatedBooks": ["book_456", "book_789"],
  "isPublished": true,
  "createdAt": "2025-01-01T00:00:00Z",
  "updatedAt": "2025-12-29T00:00:00Z"
}
```

### 3. Search Books

**Endpoint:** `GET /books/search`

**Query Parameters:**
- `q`: Search query
- `limit`: Number of results
- `offset`: Pagination offset

**Response:**
```json
{
  "results": [
    {
      "id": "book_123",
      "title": "Akai's Forest Adventure",
      "author": "XenWinx Authors",
      "coverUrl": "...",
      "price": 4.99,
      "rating": 4.8,
      "matchScore": 0.95
    }
  ],
  "total": 5
}
```

---

## 💳 PURCHASE ENDPOINTS

### 1. Initiate Purchase

**Endpoint:** `POST /purchases/initiate`

**Request:**
```json
{
  "bookId": "book_123",
  "deviceId": "device_abc",
  "platform": "android"
}
```

**Response:**
```json
{
  "orderId": "order_xyz789",
  "bookId": "book_123",
  "price": 4.99,
  "currency": "USD",
  "googlePlaySku": "com.xenwinx.rootedtales.book_123",
  "status": "pending",
  "createdAt": "2025-12-29T12:00:00Z",
  "expiresAt": "2025-12-29T12:15:00Z"
}
```

### 2. Verify Purchase (CRITICAL)

**Endpoint:** `POST /purchases/verify`

**Request:**
```json
{
  "orderId": "order_xyz789",
  "purchaseToken": "google_play_purchase_token",
  "receiptData": "base64_encoded_receipt",
  "platform": "android"
}
```

**Response:**
```json
{
  "verified": true,
  "purchaseId": "purchase_123",
  "bookId": "book_123",
  "userId": "user_123",
  "purchaseDate": "2025-12-29T12:00:00Z",
  "license": {
    "licenseId": "license_456",
    "expiryDate": null,
    "deviceLimit": 5,
    "devicesUsed": 1
  }
}
```

**Error Response:**
```json
{
  "verified": false,
  "error": "INVALID_RECEIPT",
  "message": "Purchase verification failed with Google Play"
}
```

### 3. Get Purchase History

**Endpoint:** `GET /purchases/history`

**Query Parameters:**
- `limit`: Number of results
- `offset`: Pagination offset

**Response:**
```json
{
  "purchases": [
    {
      "purchaseId": "purchase_123",
      "bookId": "book_123",
      "bookTitle": "Akai's Forest Adventure",
      "price": 4.99,
      "currency": "USD",
      "purchaseDate": "2025-12-29T12:00:00Z",
      "status": "completed",
      "receiptUrl": "https://..."
    }
  ],
  "total": 3
}
```

---

## 📥 DOWNLOAD ENDPOINTS

### 1. Get Download URL

**Endpoint:** `POST /downloads/generate-url`

**Request:**
```json
{
  "bookId": "book_123",
  "deviceId": "device_abc"
}
```

**Response:**
```json
{
  "downloadUrl": "https://secure-cdn.rootedtales.com/books/encrypted_book_123.epub?token=...",
  "expiresAt": "2025-12-29T13:00:00Z",
  "fileSize": "12582912",
  "checksum": "sha256:abc123...",
  "encryption": {
    "algorithm": "AES-256-GCM",
    "keyId": "key_789"
  }
}
```

### 2. Get Encryption Key

**Endpoint:** `POST /downloads/encryption-key`

**Request:**
```json
{
  "bookId": "book_123",
  "deviceId": "device_abc",
  "keyId": "key_789"
}
```

**Response:**
```json
{
  "encryptionKey": "base64_encoded_key",
  "iv": "base64_encoded_iv",
  "algorithm": "AES-256-GCM",
  "expiresAt": "2025-12-29T13:00:00Z"
}
```

### 3. Report Download Complete

**Endpoint:** `POST /downloads/complete`

**Request:**
```json
{
  "bookId": "book_123",
  "deviceId": "device_abc",
  "checksum": "sha256:abc123..."
}
```

**Response:**
```json
{
  "success": true,
  "bookId": "book_123",
  "downloadedAt": "2025-12-29T12:30:00Z"
}
```

---

## 🔐 LICENSE MANAGEMENT ENDPOINTS

### 1. Verify License

**Endpoint:** `GET /licenses/verify`

**Query Parameters:**
- `bookId`: Book ID
- `deviceId`: Device ID

**Response:**
```json
{
  "valid": true,
  "license": {
    "licenseId": "license_456",
    "bookId": "book_123",
    "userId": "user_123",
    "purchaseDate": "2025-12-29T12:00:00Z",
    "expiryDate": null,
    "deviceLimit": 5,
    "devicesUsed": 2,
    "devices": [
      {
        "deviceId": "device_abc",
        "registeredAt": "2025-12-29T12:30:00Z",
        "lastAccessedAt": "2025-12-29T14:00:00Z"
      }
    ]
  }
}
```

**Error Response (License Invalid):**
```json
{
  "valid": false,
  "reason": "LICENSE_EXPIRED",
  "message": "Your license has expired. Please renew to continue reading."
}
```

### 2. Register Device

**Endpoint:** `POST /licenses/register-device`

**Request:**
```json
{
  "bookId": "book_123",
  "deviceId": "device_abc",
  "deviceInfo": {
    "model": "Pixel 6",
    "os": "Android 14",
    "appVersion": "1.0.0"
  }
}
```

**Response:**
```json
{
  "success": true,
  "deviceRegistered": true,
  "devicesUsed": 2,
  "deviceLimit": 5
}
```

**Error Response (Device Limit Exceeded):**
```json
{
  "success": false,
  "error": "DEVICE_LIMIT_EXCEEDED",
  "message": "You have reached the maximum number of devices (5) for this book.",
  "devicesUsed": 5,
  "deviceLimit": 5,
  "devices": [...]
}
```

### 3. Deregister Device

**Endpoint:** `POST /licenses/deregister-device`

**Request:**
```json
{
  "bookId": "book_123",
  "deviceId": "device_abc"
}
```

**Response:**
```json
{
  "success": true,
  "deviceDeregistered": true,
  "devicesUsed": 1,
  "deviceLimit": 5
}
```

### 4. Get User's Licenses

**Endpoint:** `GET /licenses/user`

**Response:**
```json
{
  "licenses": [
    {
      "licenseId": "license_456",
      "bookId": "book_123",
      "bookTitle": "Akai's Forest Adventure",
      "purchaseDate": "2025-12-29T12:00:00Z",
      "expiryDate": null,
      "deviceLimit": 5,
      "devicesUsed": 2,
      "isActive": true
    }
  ],
  "total": 3
}
```

---

## 🗂️ LIBRARY ENDPOINTS

### 1. Get User's Library

**Endpoint:** `GET /library`

**Response:**
```json
{
  "books": [
    {
      "bookId": "book_123",
      "title": "Akai's Forest Adventure",
      "author": "XenWinx Authors",
      "coverUrl": "...",
      "purchaseDate": "2025-12-29T12:00:00Z",
      "isDownloaded": true,
      "downloadedDevices": ["device_abc"],
      "lastReadDate": "2025-12-29T14:00:00Z",
      "readingProgress": 45,
      "bookmark": {
        "page": 22,
        "position": 0.45
      }
    }
  ],
  "total": 3
}
```

### 2. Update Reading Progress

**Endpoint:** `POST /library/progress`

**Request:**
```json
{
  "bookId": "book_123",
  "progress": 45,
  "currentPage": 22,
  "position": 0.45,
  "lastReadAt": "2025-12-29T14:00:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "progress": 45
}
```

### 3. Add Bookmark

**Endpoint:** `POST /library/bookmarks`

**Request:**
```json
{
  "bookId": "book_123",
  "page": 22,
  "position": 0.45,
  "note": "Important chapter"
}
```

**Response:**
```json
{
  "bookmarkId": "bookmark_789",
  "bookId": "book_123",
  "page": 22,
  "createdAt": "2025-12-29T14:00:00Z"
}
```

---

## 🔄 SYNC ENDPOINTS

### 1. Sync User Data

**Endpoint:** `POST /sync`

**Request:**
```json
{
  "deviceId": "device_abc",
  "lastSyncAt": "2025-12-29T12:00:00Z",
  "data": {
    "readingProgress": [...],
    "bookmarks": [...],
    "settings": {...}
  }
}
```

**Response:**
```json
{
  "success": true,
  "updatedAt": "2025-12-29T14:00:00Z",
  "conflicts": []
}
```

---

## 👨‍💼 ADMIN ENDPOINTS

### 1. Create Book

**Endpoint:** `POST /admin/books`

**Authorization:** Admin role required

**Request:**
```json
{
  "title": "New Book Title",
  "author": "XenWinx Authors",
  "description": "Book description...",
  "price": 4.99,
  "currency": "USD",
  "format": "EPUB",
  "pages": 48,
  "category": "Adventure",
  "ageRange": "4-8 years",
  "theme": "forest",
  "isDRMProtected": true,
  "isPublished": false
}
```

**Response:**
```json
{
  "bookId": "book_new123",
  "uploadUrl": "https://...",
  "uploadToken": "token_xyz",
  "expiresAt": "2025-12-29T15:00:00Z"
}
```

### 2. Upload Book File

**Endpoint:** `PUT /admin/books/:bookId/upload`

**Authorization:** Admin role required

**Request:** Multipart form-data with book file

**Response:**
```json
{
  "success": true,
  "bookId": "book_new123",
  "fileUrl": "https://cdn.rootedtales.com/books/...",
  "fileSize": "12582912",
  "checksum": "sha256:abc123..."
}
```

### 3. Update Book

**Endpoint:** `PUT /admin/books/:bookId`

**Authorization:** Admin role required

**Request:**
```json
{
  "title": "Updated Title",
  "price": 5.99,
  "isPublished": true
}
```

**Response:**
```json
{
  "success": true,
  "bookId": "book_123",
  "updatedAt": "2025-12-29T14:30:00Z"
}
```

### 4. Delete Book

**Endpoint:** `DELETE /admin/books/:bookId`

**Authorization:** Admin role required

**Response:**
```json
{
  "success": true,
  "bookId": "book_123",
  "deletedAt": "2025-12-29T14:30:00Z"
}
```

### 5. Get Analytics

**Endpoint:** `GET /admin/analytics`

**Authorization:** Admin role required

**Query Parameters:**
- `startDate`: Start date (ISO 8601)
- `endDate`: End date (ISO 8601)

**Response:**
```json
{
  "period": {
    "start": "2025-12-01T00:00:00Z",
    "end": "2025-12-29T23:59:59Z"
  },
  "sales": {
    "totalRevenue": 15234.50,
    "totalPurchases": 3045,
    "averageOrderValue": 5.00
  },
  "books": {
    "totalBooks": 12,
    "publishedBooks": 10,
    "topSelling": [
      {
        "bookId": "book_123",
        "title": "Akai's Forest Adventure",
        "sales": 1245,
        "revenue": 6210.55
      }
    ]
  },
  "users": {
    "totalUsers": 5234,
    "activeUsers": 3456,
    "newUsers": 234
  },
  "downloads": {
    "totalDownloads": 4567,
    "uniqueDownloads": 3045
  }
}
```

---

## 📱 PUSH NOTIFICATION ENDPOINTS

### 1. Register Device Token

**Endpoint:** `POST /devices/register-token`

**Request:**
```json
{
  "deviceId": "device_abc",
  "fcmToken": "firebase_token_here",
  "platform": "android"
}
```

**Response:**
```json
{
  "success": true,
  "registered": true
}
```

### 2. Send Notification (Admin)

**Endpoint:** `POST /admin/notifications/send`

**Authorization:** Admin role required

**Request:**
```json
{
  "title": "New Book Available!",
  "body": "Check out our latest book: Akai's Forest Adventure",
  "data": {
    "type": "new_book",
    "bookId": "book_123"
  },
  "targetAudience": "all"
}
```

**Response:**
```json
{
  "success": true,
  "notificationId": "notif_789",
  "recipientCount": 5234,
  "sentAt": "2025-12-29T14:00:00Z"
}
```

---

## 🛡️ SECURITY ENDPOINTS

### 1. Report Security Issue

**Endpoint:** `POST /security/report`

**Request:**
```json
{
  "type": "suspected_piracy",
  "bookId": "book_123",
  "description": "Suspected unauthorized sharing",
  "evidence": {
    "url": "https://...",
    "screenshots": [...]
  }
}
```

**Response:**
```json
{
  "reportId": "report_456",
  "status": "received",
  "createdAt": "2025-12-29T14:00:00Z"
}
```

### 2. Get Book Hash (for integrity verification)

**Endpoint:** `GET /books/:bookId/hash`

**Response:**
```json
{
  "bookId": "book_123",
  "checksum": "sha256:abc123...",
  "algorithm": "SHA-256"
}
```

---

## 🔄 UPDATE ENDPOINTS

### 1. Check for Updates

**Endpoint:** `GET /updates/check`

**Query Parameters:**
- `currentVersion`: Current app version

**Response:**
```json
{
  "updateAvailable": true,
  "latestVersion": "1.1.0",
  "releaseDate": "2026-01-15T00:00:00Z",
  "releaseNotes": "- Bug fixes\n- Performance improvements\n- New books added",
  "downloadUrl": "https://play.google.com/store/apps/details?id=com.xenwinx.rootedtales",
  "isRequired": false,
  "minimumVersion": "1.0.0"
}
```

### 2. Get New Books

**Endpoint:** `GET /books/new`

**Query Parameters:**
- `since`: ISO 8601 date (get books added after this date)

**Response:**
```json
{
  "newBooks": [
    {
      "bookId": "book_new456",
      "title": "Luna's Night Story",
      "addedAt": "2026-01-10T00:00:00Z",
      "isHighlighted": true
    }
  ],
  "count": 1
}
```

---

## ⚠️ ERROR RESPONSES

### Standard Error Format

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      "field": "Additional error context"
    }
  }
}
```

### Common Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `INVALID_TOKEN` | 401 | Authentication token is invalid or expired |
| `UNAUTHORIZED` | 403 | User doesn't have permission |
| `NOT_FOUND` | 404 | Resource not found |
| `ALREADY_PURCHASED` | 409 | Book already purchased |
| `DEVICE_LIMIT_EXCEEDED` | 403 | Too many devices registered |
| `LICENSE_EXPIRED` | 403 | License has expired |
| `VERIFICATION_FAILED` | 400 | Purchase verification failed |
| `INVALID_RECEIPT` | 400 | Receipt is invalid |
| `SERVER_ERROR` | 500 | Internal server error |

---

## 🔒 RATE LIMITING

All API endpoints are rate-limited to prevent abuse:

- **General endpoints:** 100 requests per minute per user
- **Purchase endpoints:** 10 requests per minute per user
- **Download endpoints:** 20 requests per minute per user
- **Admin endpoints:** 1000 requests per minute per admin

**Rate Limit Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1735483200
```

---

## 📊 API VERSIONING

Current version: `v1`

Base URL includes version: `https://api.rootedtales.com/v1`

When breaking changes are introduced, a new version will be released (v2, v3, etc.)

---

## 🧪 TESTING

### Test Environment

**Base URL:** `https://api-staging.rootedtales.com/v1`

### Test Credentials

```
Email: test@rootedtales.com
Password: Test123!@#
```

### Test Purchase Token

```
test_purchase_token_123456
```

---

## 📞 SUPPORT

**For API issues:**
- Email: api-support@xenwinx.com
- Documentation: https://docs.rootedtales.com/api

**For security issues:**
- Email: security@xenwinx.com

---

**Last Updated:** December 29, 2025  
**API Version:** 1.0.0  
**Status:** Production-Ready

**Copyright © 2025 XenWinx. All rights reserved.**
