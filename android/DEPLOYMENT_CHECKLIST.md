# 🚀 Rooted Tales - Android Deployment Checklist

## Quick Reference Guide for Google Play Store Submission

---

## 📋 Pre-Build Checklist

### Code & Configuration
- [ ] All features tested and working
- [ ] Latest code committed to repository
- [ ] App version updated in `android/app/build.gradle`
  - [ ] versionCode incremented
  - [ ] versionName updated (e.g., "1.0.0")
- [ ] Package name confirmed: `com.xenwinx.rootedtales`
- [ ] App name confirmed: "Rooted Tales"
- [ ] Support email active: hub@xenwinx.com
- [ ] Privacy policy URL ready
- [ ] Terms of service URL ready (if applicable)

### Environment Setup
- [ ] Node.js installed (v18+)
- [ ] Android Studio installed
- [ ] Android SDK installed (API 34)
- [ ] JDK 17 installed
- [ ] Capacitor CLI installed
- [ ] Gradle working properly

---

## 🔨 Build Process Checklist

### Step 1: Build Web Assets
```bash
npm install
npm run build
```
- [ ] Build completed without errors
- [ ] `dist` folder created
- [ ] All assets bundled correctly

### Step 2: Sync with Android
```bash
npx cap sync android
npx cap copy android
```
- [ ] Sync completed successfully
- [ ] Web assets copied to Android project
- [ ] No error messages

### Step 3: Create Signing Key
```bash
cd android/app
keytool -genkey -v -keystore release-key.keystore -alias rootedtales-key -keyalg RSA -keysize 2048 -validity 10000
```
- [ ] Keystore file created
- [ ] Keystore password documented (SECURE LOCATION!)
- [ ] Key alias password documented (SECURE LOCATION!)
- [ ] Keystore backed up to secure location
- [ ] SHA-1 fingerprint documented
- [ ] SHA-256 fingerprint documented

**CRITICAL:** Never commit keystore to version control!

### Step 4: Build Release Bundle
```bash
cd android
./gradlew bundleRelease
```
- [ ] Build completed successfully
- [ ] AAB file generated at: `android/app/build/outputs/bundle/release/app-release.aab`
- [ ] File size reasonable (< 150 MB)
- [ ] Bundle signed correctly

**Alternative APK build:**
```bash
./gradlew assembleRelease
```

---

## 🎨 Assets Checklist

### Required Graphics
- [ ] **App Icon** (512x512 px, PNG with alpha)
- [ ] **Feature Graphic** (1024x500 px, JPG/PNG)
- [ ] **Phone Screenshots** (minimum 2, recommended 8)
  - [ ] Screenshot 1: Home screen
  - [ ] Screenshot 2: Book library
  - [ ] Screenshot 3: Reading interface
  - [ ] Screenshot 4: Character gallery
  - [ ] Screenshot 5: Badge collection
  - [ ] Screenshot 6: Theme switcher
  - [ ] Screenshot 7: Subscription page
  - [ ] Screenshot 8: User profile

### Optional Graphics
- [ ] Tablet 7" screenshots (1024x600+)
- [ ] Tablet 10" screenshots (1280x800+)
- [ ] Promotional video (YouTube URL)

### Store Listing Text
- [ ] App name (30 chars max)
- [ ] Short description (80 chars max)
- [ ] Full description (4000 chars max)
- [ ] Promo text (80 chars)
- [ ] What's new / Release notes

---

## 🏪 Google Play Console Setup

### Account Setup
- [ ] Google Play Developer account created
- [ ] $25 registration fee paid
- [ ] Developer profile completed
- [ ] Payment merchant account set up (for paid apps/IAP)

### Create App
- [ ] New app created in console
- [ ] App name: "Rooted Tales"
- [ ] Default language: English (United States)
- [ ] App type: App (not game)
- [ ] Free/Paid: Free

### Store Presence

#### Main Store Listing
- [ ] App name entered
- [ ] Short description entered
- [ ] Full description entered
- [ ] App icon uploaded (512x512)
- [ ] Feature graphic uploaded (1024x500)
- [ ] Phone screenshots uploaded (2-8)
- [ ] Tablet screenshots uploaded (optional)
- [ ] Promotional video added (optional)

#### Categorization
- [ ] Category: Education
- [ ] Tags: Books & Reference, Children
- [ ] Contact email: hub@xenwinx.com
- [ ] Website: https://rootedtales.xenwinx.com
- [ ] Privacy policy URL added

### App Content

#### Privacy Policy
- [ ] Privacy policy URL: https://rootedtales.xenwinx.com/privacy-policy
- [ ] Privacy policy page live and accessible
- [ ] Policy covers all required points:
  - [ ] Data collection practices
  - [ ] Third-party services
  - [ ] Children's privacy (COPPA)
  - [ ] User rights
  - [ ] Contact information

#### Data Safety
- [ ] Data safety form completed
- [ ] Declare: No data collected (or minimal)
- [ ] Data encrypted in transit: Yes
- [ ] Data can be deleted: Yes
- [ ] Data sharing: None

#### Content Rating
- [ ] Content rating questionnaire completed
- [ ] Target age: 4-10 years
- [ ] Violence: No
- [ ] Sexual content: No
- [ ] Profanity: No
- [ ] Drugs/alcohol: No
- [ ] Gambling: No
- [ ] Expected rating: ESRB Everyone, PEGI 3

#### Ads
- [ ] Contains ads: Yes (free tier) / No (premium)
- [ ] Ad policy compliance confirmed

#### In-App Purchases
- [ ] Contains in-app purchases: Yes
- [ ] Products listed:
  - [ ] Premium Subscription ($4.99/month)
  - [ ] Premium+ Subscription ($6.99/month)
  - [ ] Physical Journal ($39.99)
- [ ] Purchase flow tested

#### Target Audience & Content
- [ ] Target audience: Children
- [ ] Age group: 4-10
- [ ] Designed for Families: Yes
- [ ] Teacher Approved: Optional

#### News Apps
- [ ] Not applicable (select No)

### Countries & Regions
- [ ] Countries selected (Worldwide or specific)
- [ ] Primary country: United States
- [ ] Pricing confirmed per country

---

## 📦 App Release Checklist

### Production Track
- [ ] Create new release
- [ ] Upload AAB file (app-release.aab)
- [ ] Release name: Version 1.0.0
- [ ] Release notes written:

```
Version 1.0.0 - Initial Release

🌲 Welcome to Rooted Tales!

✨ Features:
• 12 interactive children's books
• 4 magical themes (Forest, Ocean, Sunset, Night)
• Character galleries and achievements
• Badge collection system
• Subscription tiers (Free, Premium, Premium+)
• Physical journal available for purchase
• User profiles with progress tracking
• Audio narration support
• FAQ and support system

Start your reading adventure today! 🐾📚
```

- [ ] App bundle analyzed (no errors or warnings)
- [ ] Rollout percentage: 100% (or staged rollout)

### Internal Testing (Optional but Recommended)
- [ ] Internal testing track created
- [ ] Test users added
- [ ] App tested by internal team
- [ ] Feedback collected
- [ ] Issues resolved

### Closed Testing (Optional but Recommended)
- [ ] Closed testing track created
- [ ] Beta testers invited
- [ ] Testing period completed (1-2 weeks)
- [ ] Feedback incorporated
- [ ] Critical bugs fixed

---

## ✅ Pre-Submission Review

### Functionality Testing
- [ ] App installs correctly
- [ ] App launches without crashes
- [ ] All 12 books load and display correctly
- [ ] All 4 themes work properly
- [ ] Badge collection functions
- [ ] Character gallery accessible
- [ ] Navigation works (bottom nav + sidebar)
- [ ] User authentication flows
- [ ] Subscription pages load
- [ ] Store/cart functionality
- [ ] Profile creation/editing
- [ ] Settings save correctly
- [ ] FAQ/Support accessible
- [ ] Audio/TTS functions (if applicable)

### UI/UX Testing
- [ ] No overlapping elements
- [ ] All text readable
- [ ] Buttons properly sized for touch
- [ ] Images load correctly
- [ ] Animations smooth
- [ ] Theme switching works
- [ ] Responsive to screen rotation (if supported)
- [ ] Loading states shown
- [ ] Error messages clear

### Performance Testing
- [ ] App starts in < 3 seconds
- [ ] Smooth scrolling (60fps)
- [ ] No memory leaks
- [ ] Battery usage reasonable
- [ ] Network requests optimized
- [ ] Images optimized
- [ ] App size reasonable (< 150 MB)

### Device Testing
- [ ] Tested on Android 7.0 (API 24) - minimum
- [ ] Tested on Android 11 (API 30)
- [ ] Tested on Android 14 (API 34) - target
- [ ] Tested on small phone (4.7" - 5.5")
- [ ] Tested on large phone (6.0" - 6.7"+)
- [ ] Tested on different screen densities
- [ ] Tested with different locales (if applicable)

### Security Testing
- [ ] No hardcoded API keys
- [ ] HTTPS only (no cleartext traffic)
- [ ] Permissions justified
- [ ] Data encrypted
- [ ] Secure authentication
- [ ] ProGuard enabled
- [ ] Code obfuscated

### Compliance Testing
- [ ] COPPA compliant (children's privacy)
- [ ] GDPR compliant (if targeting EU)
- [ ] Google Play Families Policy compliant
- [ ] No misleading content
- [ ] No copyright violations
- [ ] No trademark violations
- [ ] Terms of service compliant

---

## 🔍 Final Review Checklist

### Publishing Overview
- [ ] All required sections completed (green checkmarks)
- [ ] No errors in Publishing overview
- [ ] All warnings addressed
- [ ] App ready for review

### Legal & Policy
- [ ] Privacy policy accessible
- [ ] Terms of service accessible (if applicable)
- [ ] Content rating appropriate
- [ ] No policy violations
- [ ] Developer account in good standing

### Pricing & Distribution
- [ ] Pricing set correctly
- [ ] Distribution countries selected
- [ ] Device categories: Phone (required), Tablet (optional)
- [ ] Android versions: API 24+ (Android 7.0+)

---

## 🚀 Submission Checklist

### Ready to Submit
- [ ] All checklist items above completed
- [ ] Team review conducted
- [ ] Final testing passed
- [ ] Assets approved
- [ ] Store listing reviewed
- [ ] Release notes finalized

### Submit for Review
- [ ] Click "Send for review" in Play Console
- [ ] Confirmation received
- [ ] Email notification received
- [ ] Submission date documented

### Post-Submission
- [ ] Monitor review status daily
- [ ] Check for Google Play emails
- [ ] Respond to any review questions within 24 hours
- [ ] Prepare for potential rejections/requests

---

## ⏱️ Expected Timeline

| Phase | Duration |
|-------|----------|
| Asset creation | 1-3 days |
| Build & testing | 1-2 days |
| Store listing setup | 2-4 hours |
| Internal review | 1-2 days |
| Google Play review | 1-7 days |
| **Total** | **4-14 days** |

---

## 📞 Support Contacts

### If Issues Arise

**Technical Issues:**
- Review Android logcat: `adb logcat`
- Check build errors in Android Studio
- Review Capacitor documentation: https://capacitorjs.com

**Play Console Issues:**
- Google Play Console Help Center
- Android Developer Support

**App-Specific Issues:**
- Developer Email: hub@xenwinx.com
- Review DEPLOYMENT_GUIDE.md
- Check troubleshooting section

---

## 🎉 Post-Launch Checklist

### After App Goes Live

- [ ] Test download from Play Store
- [ ] Verify app installs correctly
- [ ] Test in-app purchases (production mode)
- [ ] Monitor crash reports (Play Console)
- [ ] Monitor ANR reports
- [ ] Check user reviews
- [ ] Respond to user feedback
- [ ] Monitor analytics
- [ ] Set up alerts for critical issues
- [ ] Celebrate launch! 🎊

### First Week Actions
- [ ] Daily review monitoring
- [ ] Respond to reviews within 24-48 hours
- [ ] Monitor crash rate (should be < 2%)
- [ ] Check ANR rate (should be < 0.5%)
- [ ] Analyze user retention
- [ ] Track installation numbers
- [ ] Monitor subscription conversions
- [ ] Plan first update if needed

### Ongoing Maintenance
- [ ] Weekly review check
- [ ] Monthly analytics review
- [ ] Plan feature updates
- [ ] Monitor competitor apps
- [ ] Engage with user community
- [ ] Update content (new books)
- [ ] Seasonal promotions

---

## 📊 Success Metrics to Track

### Key Performance Indicators (KPIs)

**Installation Metrics:**
- Total downloads
- Daily active users (DAU)
- Monthly active users (MAU)
- User retention (Day 1, 7, 30)
- Uninstall rate

**Engagement Metrics:**
- Books read per user
- Session duration
- Session frequency
- Badge collection rate
- Character gallery views

**Monetization Metrics:**
- Subscription conversion rate
- Premium tier adoption
- Journal sales
- Average revenue per user (ARPU)
- Lifetime value (LTV)

**Quality Metrics:**
- App rating (target: 4.5+)
- Crash-free rate (target: 99%+)
- ANR rate (target: < 0.5%)
- Review sentiment (positive %)

**Support Metrics:**
- Support tickets
- Response time
- Resolution rate
- FAQ usage

---

## ✅ Final Pre-Launch Verification

**BEFORE clicking "Send for Review":**

1. [ ] I have tested the app thoroughly
2. [ ] All features work as intended
3. [ ] All assets are uploaded
4. [ ] Store listing is complete and accurate
5. [ ] Privacy policy is live and accessible
6. [ ] Content rating is appropriate
7. [ ] Pricing and countries are set correctly
8. [ ] Release notes are written
9. [ ] Team has approved
10. [ ] I have backed up my keystore
11. [ ] I understand the review process
12. [ ] I am ready to respond to Google's feedback
13. [ ] Support email is monitored: hub@xenwinx.com
14. [ ] I have read Google Play policies
15. [ ] I commit to maintaining this app

**Developer Signature:** ___________________  
**Date:** ___________________

---

## 🎊 You're Ready to Launch!

Once all checkboxes are complete, you're ready to submit Rooted Tales to the Google Play Store!

**Good luck with your launch! 🚀🌲🐾**

For questions or support: hub@xenwinx.com
