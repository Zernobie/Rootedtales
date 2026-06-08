# 🔒 E-BOOK SECURITY & DRM IMPLEMENTATION GUIDE
## Rooted Tales Mobile Application

**Version:** 1.0.0  
**Last Updated:** December 29, 2025  
**Security Level:** Enterprise-Grade

---

## 📋 OVERVIEW

This document provides comprehensive guidance on implementing secure e-book purchase, download, and protection systems for the Rooted Tales application.

**Key Security Features:**
- ✅ Google Play Billing integration
- ✅ Server-side receipt validation
- ✅ AES-256 encryption for downloaded books
- ✅ DRM (Digital Rights Management)
- ✅ License verification
- ✅ Secure offline reading
- ✅ Anti-piracy measures

---

## 🛡️ SECURITY ARCHITECTURE

### 1. Multi-Layer Security Model

```
┌─────────────────────────────────────────────────────┐
│              CLIENT (Mobile App)                    │
│  ┌───────────────────────────────────────────────┐ │
│  │  User Authentication (Firebase/Auth0)         │ │
│  └───────────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────────┐ │
│  │  Google Play Billing Library                  │ │
│  └───────────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────────┐ │
│  │  Encrypted Storage (IndexedDB + AES-256)      │ │
│  └───────────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────────┐ │
│  │  DRM Reader (Encrypted Content Display)       │ │
│  └───────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────┐
│              SECURE API LAYER                       │
│  ┌───────────────────────────────────────────────┐ │
│  │  JWT Token Validation                         │ │
│  └───────────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────────┐ │
│  │  Receipt Verification (Google Play)           │ │
│  └───────────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────────┐ │
│  │  License Management                           │ │
│  └───────────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────────┐ │
│  │  Usage Tracking & Anomaly Detection           │ │
│  └───────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────┐
│           SECURE STORAGE BACKEND                    │
│  ┌───────────────────────────────────────────────┐ │
│  │  Encrypted Book Storage (S3/Cloud Storage)    │ │
│  └───────────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────────┐ │
│  │  License Database (PostgreSQL/Firestore)      │ │
│  └───────────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────────┐ │
│  │  Encryption Key Management (KMS)              │ │
│  └───────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

---

## 💳 PAYMENT SECURITY (GOOGLE PLAY BILLING)

### Implementation Steps

#### Step 1: Add Google Play Billing Dependency

**File:** `android/app/build.gradle`

```gradle
dependencies {
    // Google Play Billing Library
    implementation 'com.android.billingclient:billing:6.1.0'
    implementation 'com.android.billingclient:billing-ktx:6.1.0'
}
```

#### Step 2: Configure Billing Client

**Create:** `/android/app/src/main/java/com/xenwinx/rootedtales/BillingManager.java`

```java
package com.xenwinx.rootedtales;

import android.app.Activity;
import com.android.billingclient.api.*;
import java.util.ArrayList;
import java.util.List;

public class BillingManager implements PurchasesUpdatedListener {
    private BillingClient billingClient;
    private Activity activity;
    
    public BillingManager(Activity activity) {
        this.activity = activity;
        
        billingClient = BillingClient.newBuilder(activity)
            .setListener(this)
            .enablePendingPurchases()
            .build();
            
        billingClient.startConnection(new BillingClientStateListener() {
            @Override
            public void onBillingSetupFinished(BillingResult billingResult) {
                if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK) {
                    // Connection successful - query purchases
                    queryPurchases();
                }
            }
            
            @Override
            public void onBillingServiceDisconnected() {
                // Retry connection
            }
        });
    }
    
    @Override
    public void onPurchasesUpdated(BillingResult billingResult, List<Purchase> purchases) {
        if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK 
            && purchases != null) {
            for (Purchase purchase : purchases) {
                handlePurchase(purchase);
            }
        }
    }
    
    private void handlePurchase(Purchase purchase) {
        // CRITICAL: Verify purchase server-side
        verifyPurchaseOnServer(purchase);
        
        // Acknowledge purchase
        if (purchase.getPurchaseState() == Purchase.PurchaseState.PURCHASED) {
            if (!purchase.isAcknowledged()) {
                AcknowledgePurchaseParams acknowledgePurchaseParams =
                    AcknowledgePurchaseParams.newBuilder()
                        .setPurchaseToken(purchase.getPurchaseToken())
                        .build();
                        
                billingClient.acknowledgePurchase(acknowledgePurchaseParams, 
                    billingResult -> {
                        // Purchase acknowledged
                    });
            }
        }
    }
    
    public void purchaseEbook(String ebookSku) {
        // Query product details
        List<QueryProductDetailsParams.Product> productList = new ArrayList<>();
        productList.add(
            QueryProductDetailsParams.Product.newBuilder()
                .setProductId(ebookSku)
                .setProductType(BillingClient.ProductType.INAPP)
                .build()
        );
        
        QueryProductDetailsParams params = QueryProductDetailsParams.newBuilder()
            .setProductList(productList)
            .build();
            
        billingClient.queryProductDetailsAsync(params, (billingResult, productDetailsList) -> {
            if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK) {
                launchPurchaseFlow(productDetailsList.get(0));
            }
        });
    }
    
    private void launchPurchaseFlow(ProductDetails productDetails) {
        List<BillingFlowParams.ProductDetailsParams> productDetailsParamsList = 
            new ArrayList<>();
        productDetailsParamsList.add(
            BillingFlowParams.ProductDetailsParams.newBuilder()
                .setProductDetails(productDetails)
                .build()
        );
        
        BillingFlowParams billingFlowParams = BillingFlowParams.newBuilder()
            .setProductDetailsParamsList(productDetailsParamsList)
            .build();
            
        billingClient.launchBillingFlow(activity, billingFlowParams);
    }
    
    private void verifyPurchaseOnServer(Purchase purchase) {
        // CRITICAL: Send to your secure server for verification
        // Server verifies with Google Play Developer API
        String purchaseToken = purchase.getPurchaseToken();
        String orderId = purchase.getOrderId();
        
        // POST to your server API
        // Server validates and grants book access
    }
    
    private void queryPurchases() {
        billingClient.queryPurchasesAsync(
            QueryPurchasesParams.newBuilder()
                .setProductType(BillingClient.ProductType.INAPP)
                .build(),
            (billingResult, purchasesList) -> {
                if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK) {
                    for (Purchase purchase : purchasesList) {
                        // Restore purchases
                        if (purchase.getPurchaseState() == Purchase.PurchaseState.PURCHASED) {
                            grantBookAccess(purchase);
                        }
                    }
                }
            }
        );
    }
    
    private void grantBookAccess(Purchase purchase) {
        // Grant access to purchased books
    }
}
```

#### Step 3: Server-Side Receipt Validation (CRITICAL)

**Backend API Endpoint:** `POST /api/verify-purchase`

```javascript
// Node.js/Express example
const { google } = require('googleapis');
const androidpublisher = google.androidpublisher('v3');

async function verifyPurchase(req, res) {
  const { packageName, productId, purchaseToken } = req.body;
  
  try {
    // Authenticate with Google Play Developer API
    const auth = new google.auth.GoogleAuth({
      keyFile: 'path/to/service-account-key.json',
      scopes: ['https://www.googleapis.com/auth/androidpublisher'],
    });
    
    const authClient = await auth.getClient();
    google.options({ auth: authClient });
    
    // Verify purchase with Google
    const result = await androidpublisher.purchases.products.get({
      packageName: packageName,
      productId: productId,
      token: purchaseToken,
    });
    
    // Check purchase state
    if (result.data.purchaseState === 0) { // Purchased
      // Grant access to book in database
      await grantBookAccess(req.user.id, productId);
      
      res.json({
        verified: true,
        purchaseId: result.data.orderId,
      });
    } else {
      res.status(400).json({ verified: false });
    }
  } catch (error) {
    console.error('Purchase verification failed:', error);
    res.status(500).json({ error: 'Verification failed' });
  }
}
```

---

## 🔐 E-BOOK ENCRYPTION & DRM

### AES-256 Encryption Implementation

#### Client-Side Encryption (Download)

**File:** `/services/encryption.ts`

```typescript
/**
 * E-Book Encryption Service
 * Uses Web Crypto API for AES-256-GCM encryption
 */

export class EbookEncryptionService {
  private static ALGORITHM = 'AES-GCM';
  private static KEY_LENGTH = 256;
  private static IV_LENGTH = 12; // 96 bits for GCM
  
  /**
   * Generate encryption key from user credentials + device ID
   * IMPORTANT: Key should be derived server-side and sent securely
   */
  static async generateKey(userId: string, deviceId: string): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const keyMaterial = encoder.encode(`${userId}-${deviceId}-${SECRET_SALT}`);
    
    // Import key material
    const importedKey = await crypto.subtle.importKey(
      'raw',
      keyMaterial,
      'PBKDF2',
      false,
      ['deriveBits', 'deriveKey']
    );
    
    // Derive AES key
    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: encoder.encode('rooted-tales-salt'),
        iterations: 100000,
        hash: 'SHA-256',
      },
      importedKey,
      { name: this.ALGORITHM, length: this.KEY_LENGTH },
      true,
      ['encrypt', 'decrypt']
    );
  }
  
  /**
   * Encrypt e-book content
   */
  static async encryptBook(
    bookContent: ArrayBuffer,
    userId: string,
    deviceId: string
  ): Promise<{ encrypted: ArrayBuffer; iv: Uint8Array }> {
    const key = await this.generateKey(userId, deviceId);
    const iv = crypto.getRandomValues(new Uint8Array(this.IV_LENGTH));
    
    const encrypted = await crypto.subtle.encrypt(
      {
        name: this.ALGORITHM,
        iv: iv,
      },
      key,
      bookContent
    );
    
    return { encrypted, iv };
  }
  
  /**
   * Decrypt e-book content for reading
   */
  static async decryptBook(
    encryptedContent: ArrayBuffer,
    iv: Uint8Array,
    userId: string,
    deviceId: string
  ): Promise<ArrayBuffer> {
    const key = await this.generateKey(userId, deviceId);
    
    return crypto.subtle.decrypt(
      {
        name: this.ALGORITHM,
        iv: iv,
      },
      key,
      encryptedContent
    );
  }
  
  /**
   * Verify book integrity
   */
  static async verifyBookIntegrity(
    bookId: string,
    encryptedContent: ArrayBuffer
  ): Promise<boolean> {
    // Calculate hash of encrypted content
    const hashBuffer = await crypto.subtle.digest('SHA-256', encryptedContent);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    // Verify with server-stored hash
    const serverHash = await this.getServerHash(bookId);
    return hashHex === serverHash;
  }
  
  private static async getServerHash(bookId: string): Promise<string> {
    // Fetch from secure API
    const response = await fetch(`/api/books/${bookId}/hash`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });
    const data = await response.json();
    return data.hash;
  }
}
```

#### Storage in IndexedDB

**File:** `/services/offlineStorage.ts`

```typescript
/**
 * Secure Offline Storage Service
 * Stores encrypted books in IndexedDB
 */

export class OfflineStorageService {
  private dbName = 'rooted-tales-books';
  private version = 1;
  private db: IDBDatabase | null = null;
  
  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Create object store for books
        if (!db.objectStoreNames.contains('books')) {
          const objectStore = db.createObjectStore('books', { keyPath: 'id' });
          objectStore.createIndex('userId', 'userId', { unique: false });
          objectStore.createIndex('downloadDate', 'downloadDate', { unique: false });
        }
        
        // Create object store for licenses
        if (!db.objectStoreNames.contains('licenses')) {
          const licenseStore = db.createObjectStore('licenses', { keyPath: 'bookId' });
          licenseStore.createIndex('expiryDate', 'expiryDate', { unique: false });
        }
      };
    });
  }
  
  /**
   * Save encrypted book
   */
  async saveEncryptedBook(book: {
    id: string;
    userId: string;
    title: string;
    encryptedContent: ArrayBuffer;
    iv: Uint8Array;
    metadata: any;
  }): Promise<void> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['books'], 'readwrite');
      const store = transaction.objectStore('books');
      
      const bookData = {
        ...book,
        downloadDate: new Date().toISOString(),
        lastAccessed: new Date().toISOString(),
      };
      
      const request = store.put(bookData);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
  
  /**
   * Get encrypted book
   */
  async getEncryptedBook(bookId: string): Promise<any> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['books'], 'readonly');
      const store = transaction.objectStore('books');
      const request = store.get(bookId);
      
      request.onsuccess = () => {
        if (request.result) {
          // Update last accessed
          this.updateLastAccessed(bookId);
          resolve(request.result);
        } else {
          reject(new Error('Book not found'));
        }
      };
      request.onerror = () => reject(request.error);
    });
  }
  
  /**
   * Delete book (secure deletion)
   */
  async deleteBook(bookId: string): Promise<void> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['books', 'licenses'], 'readwrite');
      
      // Delete book
      const bookStore = transaction.objectStore('books');
      const bookRequest = bookStore.delete(bookId);
      
      // Delete license
      const licenseStore = transaction.objectStore('licenses');
      const licenseRequest = licenseStore.delete(bookId);
      
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }
  
  /**
   * Save license information
   */
  async saveLicense(license: {
    bookId: string;
    userId: string;
    purchaseToken: string;
    expiryDate?: string;
    deviceLimit: number;
  }): Promise<void> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['licenses'], 'readwrite');
      const store = transaction.objectStore('licenses');
      const request = store.put(license);
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
  
  /**
   * Verify license is valid
   */
  async verifyLicense(bookId: string): Promise<boolean> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['licenses'], 'readonly');
      const store = transaction.objectStore('licenses');
      const request = store.get(bookId);
      
      request.onsuccess = () => {
        if (!request.result) {
          resolve(false);
          return;
        }
        
        const license = request.result;
        
        // Check expiry
        if (license.expiryDate) {
          const expiryDate = new Date(license.expiryDate);
          if (expiryDate < new Date()) {
            resolve(false);
            return;
          }
        }
        
        resolve(true);
      };
      request.onerror = () => reject(request.error);
    });
  }
  
  private async updateLastAccessed(bookId: string): Promise<void> {
    const transaction = this.db!.transaction(['books'], 'readwrite');
    const store = transaction.objectStore('books');
    const request = store.get(bookId);
    
    request.onsuccess = () => {
      const book = request.result;
      if (book) {
        book.lastAccessed = new Date().toISOString();
        store.put(book);
      }
    };
  }
}
```

---

## 🛡️ DRM & LICENSE MANAGEMENT

### License Verification Flow

```
User Opens Book
      ↓
Check Local License (IndexedDB)
      ↓
Is Valid? ─NO→ Verify with Server ─NO→ Show "License Invalid"
      ↓                    ↓
     YES                  YES
      ↓                    ↓
Check Device Limit         Update Local License
      ↓                    ↓
Within Limit? ─NO→ Show "Device Limit Exceeded"
      ↓
     YES
      ↓
Decrypt Book
      ↓
Allow Reading
```

### Server-Side License Management

**API Endpoint:** `GET /api/licenses/verify`

```javascript
async function verifyLicense(req, res) {
  const { bookId, userId, deviceId } = req.query;
  
  // Get license from database
  const license = await db.licenses.findOne({
    where: {
      bookId: bookId,
      userId: userId,
    },
  });
  
  if (!license) {
    return res.status(404).json({ valid: false, reason: 'License not found' });
  }
  
  // Check expiry
  if (license.expiryDate && new Date(license.expiryDate) < new Date()) {
    return res.status(403).json({ valid: false, reason: 'License expired' });
  }
  
  // Check device limit
  const deviceCount = await db.devices.count({
    where: {
      licenseId: license.id,
    },
  });
  
  if (deviceCount >= license.deviceLimit) {
    const isDeviceRegistered = await db.devices.findOne({
      where: {
        licenseId: license.id,
        deviceId: deviceId,
      },
    });
    
    if (!isDeviceRegistered) {
      return res.status(403).json({
        valid: false,
        reason: 'Device limit exceeded',
      });
    }
  } else {
    // Register device
    await db.devices.create({
      licenseId: license.id,
      deviceId: deviceId,
      registeredAt: new Date(),
    });
  }
  
  // Log access
  await db.accessLogs.create({
    licenseId: license.id,
    deviceId: deviceId,
    accessedAt: new Date(),
  });
  
  res.json({
    valid: true,
    license: {
      bookId: license.bookId,
      expiryDate: license.expiryDate,
      devicesUsed: deviceCount,
      deviceLimit: license.deviceLimit,
    },
  });
}
```

---

## 🚫 ANTI-PIRACY MEASURES

### 1. Device Fingerprinting

```typescript
export async function getDeviceFingerprint(): Promise<string> {
  const components = [
    navigator.userAgent,
    navigator.language,
    new Date().getTimezoneOffset(),
    screen.width,
    screen.height,
    screen.colorDepth,
  ];
  
  // In Android app, also include:
  // - Android ID
  // - Device manufacturer
  // - Device model
  
  const fingerprint = components.join('|');
  const encoder = new TextEncoder();
  const data = encoder.encode(fingerprint);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
```

### 2. Watermarking

```typescript
/**
 * Add invisible watermark to e-book pages
 * Embeds user email and purchase ID
 */
export function addWatermark(pageContent: string, userEmail: string, purchaseId: string): string {
  // Add invisible HTML comments
  const watermark = `<!-- ROOTED_TALES:${userEmail}:${purchaseId}:${Date.now()} -->`;
  return pageContent + watermark;
}
```

### 3. Access Logging & Anomaly Detection

```javascript
// Backend: Track suspicious activity
async function logBookAccess(bookId, userId, deviceId) {
  await db.accessLogs.create({
    bookId,
    userId,
    deviceId,
    timestamp: new Date(),
    ipAddress: req.ip,
    userAgent: req.headers['user-agent'],
  });
  
  // Check for anomalies
  const recentAccess = await db.accessLogs.findAll({
    where: {
      bookId: bookId,
      userId: userId,
      timestamp: {
        [Op.gte]: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
      },
    },
  });
  
  // Flag if accessed from multiple devices simultaneously
  const uniqueDevices = [...new Set(recentAccess.map(log => log.deviceId))];
  if (uniqueDevices.length > 3) {
    await flagSuspiciousActivity(userId, bookId, 'Multiple devices');
  }
  
  // Flag if unusual access pattern
  if (recentAccess.length > 100) {
    await flagSuspiciousActivity(userId, bookId, 'Excessive access');
  }
}
```

---

## 📱 OFFLINE READING SECURITY

### Secure Reader Implementation

```typescript
/**
 * Secure E-Book Reader
 * Decrypts and displays content in memory only
 */
export class SecureEbookReader {
  private decryptedContent: ArrayBuffer | null = null;
  
  async loadBook(bookId: string, userId: string, deviceId: string): Promise<void> {
    // Verify license
    const licenseValid = await this.verifyLicense(bookId);
    if (!licenseValid) {
      throw new Error('Invalid license');
    }
    
    // Get encrypted book from IndexedDB
    const encryptedBook = await offlineStorage.getEncryptedBook(bookId);
    
    // Decrypt in memory
    this.decryptedContent = await EbookEncryptionService.decryptBook(
      encryptedBook.encryptedContent,
      encryptedBook.iv,
      userId,
      deviceId
    );
    
    // Verify integrity
    const isValid = await EbookEncryptionService.verifyBookIntegrity(
      bookId,
      encryptedBook.encryptedContent
    );
    
    if (!isValid) {
      throw new Error('Book integrity check failed');
    }
  }
  
  getPage(pageNumber: number): string {
    if (!this.decryptedContent) {
      throw new Error('Book not loaded');
    }
    
    // Parse EPUB/PDF and return page content
    // Content is only in memory, never written to disk unencrypted
    const page = this.parseEpubPage(this.decryptedContent, pageNumber);
    
    // Add watermark
    return addWatermark(page, userEmail, purchaseId);
  }
  
  private async verifyLicense(bookId: string): Promise<boolean> {
    // Check local license
    const localLicenseValid = await offlineStorage.verifyLicense(bookId);
    
    // If online, also verify with server
    if (navigator.onLine) {
      try {
        const response = await fetch(`/api/licenses/verify?bookId=${bookId}`, {
          headers: {
            'Authorization': `Bearer ${getAuthToken()}`,
          },
        });
        const data = await response.json();
        return data.valid;
      } catch (error) {
        // If offline, trust local license
        return localLicenseValid;
      }
    }
    
    return localLicenseValid;
  }
  
  destroy(): void {
    // Clear decrypted content from memory
    this.decryptedContent = null;
  }
}
```

---

## 🔄 UPDATE & CONTENT MANAGEMENT

### Push Notifications for New Books

**Capacitor Push Notifications:**

```typescript
import { PushNotifications } from '@capacitor/push-notifications';

export async function initPushNotifications() {
  // Request permission
  let permStatus = await PushNotifications.checkPermissions();
  
  if (permStatus.receive === 'prompt') {
    permStatus = await PushNotifications.requestPermissions();
  }
  
  if (permStatus.receive !== 'granted') {
    throw new Error('User denied permissions!');
  }
  
  await PushNotifications.register();
  
  // Listen for registration
  PushNotifications.addListener('registration', token => {
    // Send token to server
    sendTokenToServer(token.value);
  });
  
  // Listen for notifications
  PushNotifications.addListener('pushNotificationReceived', notification => {
    if (notification.data.type === 'new_book') {
      showNewBookNotification(notification.data);
    }
  });
}

async function sendTokenToServer(token: string) {
  await fetch('/api/devices/register-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify({ token }),
  });
}
```

### Backend: Send Push Notifications

```javascript
const admin = require('firebase-admin');

async function notifyNewBookAvailable(bookId) {
  const book = await db.books.findByPk(bookId);
  
  // Get all user tokens
  const tokens = await db.deviceTokens.findAll();
  
  const message = {
    notification: {
      title: '📚 New Book Available!',
      body: `"${book.title}" is now available in the Rooted Tales library`,
    },
    data: {
      type: 'new_book',
      bookId: book.id,
      bookTitle: book.title,
    },
    tokens: tokens.map(t => t.token),
  };
  
  await admin.messaging().sendMulticast(message);
}
```

---

## 📊 SECURITY MONITORING

### Metrics to Track

```javascript
// Backend monitoring
const securityMetrics = {
  // Purchase verification failures
  verificationFailures: 0,
  
  // License violations
  expiredLicenseAttempts: 0,
  deviceLimitExceeded: 0,
  
  // Integrity checks
  integrityFailures: 0,
  
  // Access patterns
  suspiciousAccess: 0,
  simultaneousDevices: 0,
};

// Alert on suspicious activity
function alertSecurityTeam(event) {
  // Send to security monitoring system
  console.error('SECURITY ALERT:', event);
  
  // Send email/Slack notification
  // Log to security dashboard
}
```

---

## ✅ SECURITY CHECKLIST

### Pre-Deployment Security Review

- [ ] Google Play Billing integrated and tested
- [ ] Server-side receipt validation implemented
- [ ] Books encrypted with AES-256
- [ ] Encrypted books stored in IndexedDB
- [ ] License verification on read
- [ ] Device limit enforced
- [ ] Watermarking implemented
- [ ] Access logging enabled
- [ ] Anomaly detection configured
- [ ] Push notifications for updates
- [ ] HTTPS only (no cleartext)
- [ ] ProGuard enabled for Android
- [ ] API endpoints secured with JWT
- [ ] Rate limiting on API endpoints
- [ ] Regular security audits scheduled
- [ ] Incident response plan documented
- [ ] User privacy policy updated
- [ ] COPPA compliance verified

---

## 📞 SECURITY SUPPORT

**For security concerns:**
- Email: security@xenwinx.com
- Report vulnerabilities: security-report@xenwinx.com

**For implementation help:**
- Email: hub@xenwinx.com

---

**Last Updated:** December 29, 2025  
**Version:** 1.0.0  
**Security Level:** Enterprise-Grade

**Copyright © 2025 XenWinx. All rights reserved.**
