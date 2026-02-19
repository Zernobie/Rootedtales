# APP PERMISSIONS EXPLAINED
## Rooted Tales Mobile Application

**Version:** 1.0.0  
**Last Updated:** December 29, 2025

---

## WHY WE NEED PERMISSIONS

Rooted Tales requests certain permissions to provide you with the best reading experience. This document explains each permission, why we need it, and how we use it.

**We only request permissions that are necessary for app functionality. We never access your data without your knowledge or consent.**

---

## PERMISSIONS OVERVIEW

| Permission | Required/Optional | Purpose |
|------------|-------------------|---------|
| Internet | Required | Download books, sync progress |
| Network State | Required | Check connectivity |
| WiFi State | Required | Optimize downloads |
| Storage | Required | Save books, cache content |
| Media (Images/Audio) | Required | Display book covers, play audio |
| Vibrate | Optional | Haptic feedback |
| Wake Lock | Required | Prevent screen sleep while reading |
| Notifications | Optional | Reading reminders, streak alerts |
| Billing | Required | Process subscriptions |
| Camera | Optional | Profile picture (future feature) |

---

## DETAILED PERMISSION EXPLANATIONS

### 1️⃣ INTERNET ACCESS ✅ REQUIRED

**Permission:** `android.permission.INTERNET`

**Why We Need It:**
- Download and stream book content
- Sync your reading progress across devices
- Load book covers and illustrations
- Process subscription payments
- Access online features
- Check for app updates

**What We Do NOT Do:**
- We do not access other apps or websites without your knowledge
- We do not download anything to your device without permission
- All data transfers are encrypted (HTTPS)

---

### 2️⃣ NETWORK STATE ACCESS ✅ REQUIRED

**Permission:** `android.permission.ACCESS_NETWORK_STATE`

**Why We Need It:**
- Check if you're connected to the internet
- Determine if you're on WiFi or mobile data
- Show offline mode when no connection
- Optimize downloads based on connection type
- Prevent errors when offline

**What We Do NOT Do:**
- We do not monitor your browsing activity
- We do not track which websites you visit
- We only check if a connection exists

---

### 3️⃣ WIFI STATE ACCESS ✅ REQUIRED

**Permission:** `android.permission.ACCESS_WIFI_STATE`

**Why We Need It:**
- Determine connection quality
- Optimize book downloads on WiFi
- Prevent large downloads on mobile data
- Provide better streaming quality on WiFi
- Show connection status in app

**What We Do NOT Do:**
- We do not access your WiFi password
- We do not track WiFi networks you connect to
- We do not share WiFi information

---

### 4️⃣ STORAGE ACCESS ✅ REQUIRED

**Permissions:**
- `android.permission.READ_EXTERNAL_STORAGE` (Android 12 and below)
- `android.permission.WRITE_EXTERNAL_STORAGE` (Android 9 and below)

**Why We Need It:**
- Save downloaded books for offline reading
- Cache book covers and illustrations
- Store reading progress locally
- Save user preferences and settings
- Create backup of your data

**What We Do NOT Do:**
- We do not access your photos or personal files
- We only access our app's designated storage area
- We do not read or modify files from other apps

**Note:** On Android 13+, we use scoped storage which is more secure and doesn't require this permission for app-specific storage.

---

### 5️⃣ MEDIA PERMISSIONS (Android 13+) ✅ REQUIRED

**Permissions:**
- `android.permission.READ_MEDIA_IMAGES`
- `android.permission.READ_MEDIA_AUDIO`

**Why We Need It:**
- Display book cover images
- Play narration audio (if available)
- Show character illustrations
- Play sound effects in interactive features
- Access badge and achievement graphics

**What We Do NOT Do:**
- We do not access your personal photos
- We do not access your personal music
- We only access media files included with the app

---

### 6️⃣ VIBRATE ⚙️ OPTIONAL

**Permission:** `android.permission.VIBRATE`

**Why We Need It:**
- Provide haptic feedback when earning achievements
- Vibrate on badge unlocks
- Enhance interactive game features
- Provide tactile confirmation of actions

**What We Do NOT Do:**
- We do not vibrate without user interaction
- You can disable this in app settings

---

### 7️⃣ WAKE LOCK ✅ REQUIRED

**Permission:** `android.permission.WAKE_LOCK`

**Why We Need It:**
- Keep screen on while reading
- Prevent screen from sleeping during narration
- Maintain reading session
- Prevent interruption during activities

**What We Do NOT Do:**
- We do not prevent your screen from turning off indefinitely
- Wake lock is released when you stop reading
- You can manually lock your device anytime

---

### 8️⃣ NOTIFICATIONS ⚙️ OPTIONAL

**Permission:** `android.permission.POST_NOTIFICATIONS` (Android 13+)

**Why We Need It:**
- Remind you to read daily (maintain streaks)
- Notify you of new books or content
- Alert you to achievement unlocks
- Send subscription renewal reminders
- Provide important app updates

**What We Do NOT Do:**
- We do not send spam notifications
- We do not share your notification preferences
- You can disable notifications in device settings
- You can customize notification types in app settings

**You Control:**
- Enable/disable all notifications
- Choose which notifications to receive
- Set quiet hours
- Customize notification sounds

---

### 9️⃣ BILLING ✅ REQUIRED (for subscriptions)

**Permission:** `com.android.vending.BILLING`

**Why We Need It:**
- Process Premium subscription ($4.99/month)
- Process Premium+ subscription ($6.99/month)
- Handle in-app purchases
- Verify subscription status
- Enable subscription features

**What We Do NOT Do:**
- We do not store your payment information
- All payments are processed securely by Google Play
- We never see your credit card details
- We do not charge without your explicit consent

**Security:**
- All transactions are processed by Google Play
- Payment data is encrypted
- We only receive confirmation of purchase
- Refunds are handled through Google Play

---

### 🔟 CAMERA ⚙️ OPTIONAL (Future Feature)

**Permission:** `android.permission.CAMERA`

**Why We Might Need It:**
- Allow you to take a profile picture
- Scan QR codes for special content (future)
- Interactive AR features (future)

**What We Do NOT Do:**
- We do not access your camera without permission
- We do not take photos without your action
- We do not record video
- We do not access camera in background

**Note:** This permission is optional and may be used for future features. Camera access is not currently required to use the app.

---

## OPTIONAL VS REQUIRED PERMISSIONS

### ✅ Required Permissions (App Won't Work Without)
- Internet
- Network State
- WiFi State
- Storage/Media
- Wake Lock
- Billing (for subscriptions)

### ⚙️ Optional Permissions (App Works Without)
- Vibrate
- Notifications
- Camera

**You can deny optional permissions and the app will still work. Some features may be limited.**

---

## PERMISSION REQUESTS

### When We Ask for Permissions

**At Install Time:**
- Basic permissions are granted automatically (Internet, Network State)

**At First Use:**
- Storage/Media (when you first download a book)
- Notifications (when you set up reminders)

**When You Use Feature:**
- Camera (if you choose to take a profile picture)
- Vibrate (when enabled in settings)

### How We Ask
- Clear explanation of why we need it
- Option to deny
- Ability to change later in settings

---

## MANAGING PERMISSIONS

### In the App
1. Open Rooted Tales
2. Go to Settings > Privacy & Permissions
3. Toggle permissions on/off
4. Review what each permission does

### In Android Settings
1. Open Device Settings
2. Go to Apps > Rooted Tales
3. Tap Permissions
4. Manage individual permissions

### Revoking Permissions
You can revoke any permission at any time:
1. Go to Android Settings
2. Apps > Rooted Tales > Permissions
3. Select permission to revoke
4. Tap "Don't allow"

**Note:** Revoking required permissions may limit app functionality.

---

## PRIVACY & SECURITY

### How We Protect Your Data

**Encryption:**
- All data sent over internet is encrypted (HTTPS/SSL)
- Sensitive data stored locally is encrypted
- Passwords are hashed and never stored in plain text

**Minimal Access:**
- We only access data necessary for app functionality
- We don't access data from other apps
- We don't run in background unnecessarily

**Transparency:**
- We clearly explain why we need each permission
- You can review permissions anytime
- We notify you of permission changes

**COPPA Compliance:**
- Special protections for children under 13
- Parental consent required
- Minimal data collection for children
- No targeted advertising for children

---

## CHILDREN'S PRIVACY (COPPA)

### Permissions for Children Under 13

**We treat children's privacy with extra care:**
- We collect minimal information
- We don't request unnecessary permissions
- Parents can review all permission requests
- Parents can revoke permissions anytime

**Permissions NOT Used for Children:**
- We do not use camera for children
- We do not collect location data for children
- We do not track children across apps
- We do not share children's data with third parties (except service providers)

**Parental Controls:**
- Parents can manage all permissions
- Parents can disable notifications
- Parents can review all data access
- Contact us at hub@xenwinx.com for questions

---

## THIRD-PARTY ACCESS

### Who Else Has Access?

**Service Providers (with strict contracts):**
- Cloud storage (AWS, Google Cloud, etc.)
- Analytics (crash reporting, usage stats)
- Payment processing (Google Play)

**What They Can Access:**
- Only data necessary for their service
- Bound by confidentiality agreements
- Must comply with our privacy standards
- Cannot use data for their own purposes

**Who Does NOT Have Access:**
- Advertisers (cannot access personal info)
- Other apps on your device
- Any unauthorized third parties
- We do not sell your data to anyone

---

## COMPARISON WITH OTHER APPS

Rooted Tales requests fewer permissions than most similar apps:

| Permission | Rooted Tales | Typical Reading App | Typical Game App |
|------------|--------------|---------------------|------------------|
| Internet | ✅ | ✅ | ✅ |
| Storage | ✅ | ✅ | ✅ |
| Location | ❌ | ✅ Often | ✅ Usually |
| Contacts | ❌ | ✅ Sometimes | ✅ Sometimes |
| Microphone | ❌ | ✅ Sometimes | ✅ Often |
| Calendar | ❌ | ❌ | ✅ Sometimes |
| Camera | ⚙️ Optional | ✅ Often | ✅ Often |

**We request only what we need - nothing more.**

---

## FREQUENTLY ASKED QUESTIONS

### Q: Why does the app need internet access?
**A:** To download books, sync your progress, and access online features. You can still read downloaded books offline.

### Q: Can I use the app without granting notifications?
**A:** Yes! Notifications are optional. You'll miss reading reminders and streak alerts, but all core features work.

### Q: Do you access my photos or files?
**A:** No. We only access our app's designated storage area for book content and saved data.

### Q: Why do you need billing permission?
**A:** To process subscription payments (Premium and Premium+). All payments are handled securely by Google Play.

### Q: Can I deny camera permission?
**A:** Yes, absolutely. Camera is optional for future profile picture features.

### Q: What happens if I revoke a required permission?
**A:** Some features may not work. For example, revoking internet access means you can't download new books.

### Q: Do you track my location?
**A:** No. We do not request or use location permission.

### Q: Can you access my microphone?
**A:** No. We do not request microphone permission.

### Q: Will you add more permissions in the future?
**A:** Only if necessary for new features. We'll always explain why and ask for your permission first.

### Q: How do I report a permission concern?
**A:** Email us at hub@xenwinx.com with your concern.

---

## CHANGES TO PERMISSIONS

If we need to add new permissions in the future:
- We'll notify you via the app or email
- We'll explain why we need the new permission
- You can choose to accept or deny
- Denial may limit access to new features only

---

## CONTACT US

Questions about app permissions?

**XenWinx**  
Email: hub@xenwinx.com  
Website: https://xenwinx.com

**Subject Lines:**
- "Permission Question" - General permission inquiries
- "Child Privacy" - Questions about children's data
- "Security Concern" - Report security issues

---

## SUMMARY

**We Request Permissions To:**
✅ Provide core reading functionality  
✅ Sync your progress across devices  
✅ Download and save books  
✅ Process subscriptions securely  
✅ Send helpful reminders (optional)  
✅ Enhance your experience  

**We NEVER:**
❌ Access unnecessary data  
❌ Track you across other apps  
❌ Collect location data  
❌ Access your personal files  
❌ Use your camera or microphone without permission  
❌ Sell your data  

---

**Your privacy and security are our top priorities.**

**Last Updated:** December 29, 2025  
**Version:** 1.0.0

**Copyright © 2025 XenWinx. All rights reserved.**

---

**END OF APP PERMISSIONS DOCUMENTATION**
