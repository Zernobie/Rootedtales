package com.xenwinx.rootedtales;

import android.app.Application;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.os.Build;
import androidx.multidex.MultiDexApplication;
import timber.log.Timber;

/**
 * Rooted Tales Application Class
 * Initializes app-wide configurations, notification channels, and services
 */
public class RootedTalesApplication extends MultiDexApplication {
    
    // Notification Channel IDs
    public static final String CHANNEL_DOWNLOADS = "downloads";
    public static final String CHANNEL_REMINDERS = "reminders";
    public static final String CHANNEL_UPDATES = "updates";
    public static final String CHANNEL_DEFAULT = "default";
    
    // App-wide constants
    public static final String BOOKS_DIRECTORY = "downloaded_books";
    public static final String COVERS_DIRECTORY = "book_covers";
    public static final String CACHE_DIRECTORY = "cache";
    
    @Override
    public void onCreate() {
        super.onCreate();
        
        // Initialize Timber logging
        if (BuildConfig.DEBUG) {
            Timber.plant(new Timber.DebugTree());
        }
        
        Timber.d("RootedTales Application Starting...");
        
        // Create notification channels (Android 8.0+)
        createNotificationChannels();
        
        // Initialize crash reporting (uncomment if using)
        // initializeCrashReporting();
        
        // Initialize analytics (uncomment if using)
        // initializeAnalytics();
        
        Timber.d("RootedTales Application Initialized Successfully");
    }
    
    /**
     * Create notification channels for different notification types
     * Required for Android 8.0 (API 26) and above
     */
    private void createNotificationChannels() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            
            if (notificationManager == null) {
                Timber.e("NotificationManager is null, cannot create channels");
                return;
            }
            
            // Channel 1: Download Notifications
            NotificationChannel downloadsChannel = new NotificationChannel(
                CHANNEL_DOWNLOADS,
                getString(R.string.notification_channel_downloads),
                NotificationManager.IMPORTANCE_LOW  // Don't make sound during downloads
            );
            downloadsChannel.setDescription(getString(R.string.notification_channel_downloads_desc));
            downloadsChannel.setShowBadge(true);
            downloadsChannel.enableLights(true);
            downloadsChannel.setLightColor(getResources().getColor(R.color.colorPrimary, null));
            notificationManager.createNotificationChannel(downloadsChannel);
            Timber.d("Created Downloads notification channel");
            
            // Channel 2: Reading Reminders
            NotificationChannel remindersChannel = new NotificationChannel(
                CHANNEL_REMINDERS,
                getString(R.string.notification_channel_reminders),
                NotificationManager.IMPORTANCE_DEFAULT  // Default sound for reminders
            );
            remindersChannel.setDescription(getString(R.string.notification_channel_reminders_desc));
            remindersChannel.setShowBadge(true);
            remindersChannel.enableVibration(true);
            remindersChannel.setVibrationPattern(new long[]{0, 500, 200, 500});
            notificationManager.createNotificationChannel(remindersChannel);
            Timber.d("Created Reminders notification channel");
            
            // Channel 3: App Updates & News
            NotificationChannel updatesChannel = new NotificationChannel(
                CHANNEL_UPDATES,
                getString(R.string.notification_channel_updates),
                NotificationManager.IMPORTANCE_LOW
            );
            updatesChannel.setDescription(getString(R.string.notification_channel_updates_desc));
            updatesChannel.setShowBadge(true);
            notificationManager.createNotificationChannel(updatesChannel);
            Timber.d("Created Updates notification channel");
            
            // Channel 4: Default Channel
            NotificationChannel defaultChannel = new NotificationChannel(
                CHANNEL_DEFAULT,
                getString(R.string.notification_channel_default),
                NotificationManager.IMPORTANCE_DEFAULT
            );
            defaultChannel.setDescription(getString(R.string.notification_channel_default_desc));
            notificationManager.createNotificationChannel(defaultChannel);
            Timber.d("Created Default notification channel");
            
            Timber.i("All notification channels created successfully");
        }
    }
    
    /**
     * Initialize Firebase Crashlytics or other crash reporting
     * Uncomment and configure if using
     */
    private void initializeCrashReporting() {
        // Example for Firebase Crashlytics:
        // FirebaseCrashlytics.getInstance().setCrashlyticsCollectionEnabled(!BuildConfig.DEBUG);
        // Timber.d("Crash reporting initialized");
    }
    
    /**
     * Initialize Firebase Analytics or other analytics service
     * Uncomment and configure if using
     */
    private void initializeAnalytics() {
        // Example for Firebase Analytics:
        // FirebaseAnalytics analytics = FirebaseAnalytics.getInstance(this);
        // analytics.setAnalyticsCollectionEnabled(!BuildConfig.DEBUG);
        // Timber.d("Analytics initialized");
    }
    
    @Override
    public void onTerminate() {
        super.onTerminate();
        Timber.d("RootedTales Application Terminating");
    }
    
    @Override
    public void onLowMemory() {
        super.onLowMemory();
        Timber.w("Low memory warning received");
        // Clear caches or release resources if needed
    }
}
