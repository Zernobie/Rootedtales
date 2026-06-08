package com.xenwinx.rootedtales.services;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.IBinder;
import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;
import com.xenwinx.rootedtales.MainActivity;
import com.xenwinx.rootedtales.R;
import com.xenwinx.rootedtales.RootedTalesApplication;
import timber.log.Timber;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Foreground service for downloading ebooks
 * Shows persistent notification during download
 */
public class DownloadService extends Service {
    
    // Notification IDs
    private static final int NOTIFICATION_ID = 1001;
    private static final int NOTIFICATION_ID_COMPLETE = 1002;
    
    // Intent extras
    public static final String EXTRA_BOOK_ID = "bookId";
    public static final String EXTRA_BOOK_TITLE = "bookTitle";
    public static final String EXTRA_BOOK_URL = "bookUrl";
    public static final String EXTRA_FILE_NAME = "fileName";
    
    // Download status broadcasts
    public static final String ACTION_DOWNLOAD_STARTED = "com.xenwinx.rootedtales.DOWNLOAD_STARTED";
    public static final String ACTION_DOWNLOAD_PROGRESS = "com.xenwinx.rootedtales.DOWNLOAD_PROGRESS";
    public static final String ACTION_DOWNLOAD_COMPLETE = "com.xenwinx.rootedtales.DOWNLOAD_COMPLETE";
    public static final String ACTION_DOWNLOAD_FAILED = "com.xenwinx.rootedtales.DOWNLOAD_FAILED";
    
    private NotificationManager notificationManager;
    private ExecutorService executorService;
    
    @Override
    public void onCreate() {
        super.onCreate();
        Timber.d("DownloadService created");
        
        notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        executorService = Executors.newSingleThreadExecutor();
    }
    
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (intent == null) {
            Timber.e("Intent is null");
            stopSelf(startId);
            return START_NOT_STICKY;
        }
        
        String bookId = intent.getStringExtra(EXTRA_BOOK_ID);
        String bookTitle = intent.getStringExtra(EXTRA_BOOK_TITLE);
        String bookUrl = intent.getStringExtra(EXTRA_BOOK_URL);
        String fileName = intent.getStringExtra(EXTRA_FILE_NAME);
        
        if (bookId == null || bookTitle == null || bookUrl == null || fileName == null) {
            Timber.e("Missing required extras");
            stopSelf(startId);
            return START_NOT_STICKY;
        }
        
        Timber.i("Starting download for book: %s", bookTitle);
        
        // Start as foreground service
        Notification notification = createProgressNotification(bookTitle, 0);
        startForeground(NOTIFICATION_ID, notification);
        
        // Broadcast download started
        broadcastDownloadStatus(ACTION_DOWNLOAD_STARTED, bookId, bookTitle, 0);
        
        // Start download in background thread
        executorService.execute(() -> downloadBook(bookId, bookTitle, bookUrl, fileName, startId));
        
        return START_NOT_STICKY;
    }
    
    /**
     * Download book from URL to local storage
     */
    private void downloadBook(String bookId, String bookTitle, String bookUrl, 
                            String fileName, int startId) {
        HttpURLConnection connection = null;
        InputStream inputStream = null;
        FileOutputStream outputStream = null;
        
        try {
            Timber.d("Downloading: %s from %s", fileName, bookUrl);
            
            // Create books directory if it doesn't exist
            File booksDir = new File(getFilesDir(), RootedTalesApplication.BOOKS_DIRECTORY);
            if (!booksDir.exists()) {
                boolean created = booksDir.mkdirs();
                Timber.d("Books directory created: %s", created);
            }
            
            File outputFile = new File(booksDir, fileName);
            
            // Set up connection
            URL url = new URL(bookUrl);
            connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setConnectTimeout(15000);
            connection.setReadTimeout(15000);
            connection.connect();
            
            // Check response code
            int responseCode = connection.getResponseCode();
            if (responseCode != HttpURLConnection.HTTP_OK) {
                throw new Exception("Server returned HTTP " + responseCode);
            }
            
            // Get content length
            long contentLength = connection.getContentLength();
            Timber.d("Content length: %d bytes", contentLength);
            
            // Start download
            inputStream = connection.getInputStream();
            outputStream = new FileOutputStream(outputFile);
            
            byte[] buffer = new byte[8192];
            long totalBytesRead = 0;
            int bytesRead;
            int lastProgress = 0;
            
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
                totalBytesRead += bytesRead;
                
                // Calculate progress percentage
                int progress = contentLength > 0 
                    ? (int) ((totalBytesRead * 100) / contentLength) 
                    : 0;
                
                // Update notification every 10% progress
                if (progress >= lastProgress + 10) {
                    updateProgressNotification(bookTitle, progress);
                    broadcastDownloadStatus(ACTION_DOWNLOAD_PROGRESS, bookId, bookTitle, progress);
                    lastProgress = progress;
                }
            }
            
            outputStream.flush();
            
            Timber.i("Download complete: %s", fileName);
            
            // Show completion notification
            showCompletionNotification(bookTitle, outputFile.getAbsolutePath());
            
            // Broadcast completion
            broadcastDownloadStatus(ACTION_DOWNLOAD_COMPLETE, bookId, bookTitle, 100);
            
        } catch (Exception e) {
            Timber.e(e, "Download failed for: %s", bookTitle);
            
            // Show error notification
            showErrorNotification(bookTitle, e.getMessage());
            
            // Broadcast failure
            broadcastDownloadStatus(ACTION_DOWNLOAD_FAILED, bookId, bookTitle, 0);
            
        } finally {
            // Clean up
            try {
                if (outputStream != null) outputStream.close();
                if (inputStream != null) inputStream.close();
                if (connection != null) connection.disconnect();
            } catch (Exception e) {
                Timber.e(e, "Error closing streams");
            }
            
            // Stop foreground service
            stopForeground(true);
            stopSelf(startId);
        }
    }
    
    /**
     * Create initial progress notification
     */
    private Notification createProgressNotification(String bookTitle, int progress) {
        Intent intent = new Intent(this, MainActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(
            this, 0, intent, 
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );
        
        NotificationCompat.Builder builder = new NotificationCompat.Builder(
            this, RootedTalesApplication.CHANNEL_DOWNLOADS
        )
            .setSmallIcon(R.drawable.ic_notification)
            .setContentTitle(getString(R.string.download_notification_title))
            .setContentText(bookTitle)
            .setPriority(NotificationCompat.PRIORITY_LOW)
            .setOngoing(true)
            .setContentIntent(pendingIntent)
            .setOnlyAlertOnce(true);
        
        if (progress > 0) {
            builder.setProgress(100, progress, false);
            builder.setSubText(progress + "%");
        } else {
            builder.setProgress(100, 0, true); // Indeterminate
        }
        
        return builder.build();
    }
    
    /**
     * Update progress notification
     */
    private void updateProgressNotification(String bookTitle, int progress) {
        Notification notification = createProgressNotification(bookTitle, progress);
        notificationManager.notify(NOTIFICATION_ID, notification);
    }
    
    /**
     * Show completion notification
     */
    private void showCompletionNotification(String bookTitle, String filePath) {
        Intent intent = new Intent(this, MainActivity.class);
        intent.putExtra("openBook", filePath);
        
        PendingIntent pendingIntent = PendingIntent.getActivity(
            this, 0, intent,
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );
        
        NotificationCompat.Builder builder = new NotificationCompat.Builder(
            this, RootedTalesApplication.CHANNEL_DOWNLOADS
        )
            .setSmallIcon(R.drawable.ic_notification)
            .setContentTitle(getString(R.string.download_complete_title))
            .setContentText(String.format(
                getString(R.string.download_complete_text), bookTitle
            ))
            .setPriority(NotificationCompat.PRIORITY_DEFAULT)
            .setAutoCancel(true)
            .setContentIntent(pendingIntent);
        
        notificationManager.notify(NOTIFICATION_ID_COMPLETE, builder.build());
    }
    
    /**
     * Show error notification
     */
    private void showErrorNotification(String bookTitle, String errorMessage) {
        Intent intent = new Intent(this, MainActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(
            this, 0, intent,
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );
        
        NotificationCompat.Builder builder = new NotificationCompat.Builder(
            this, RootedTalesApplication.CHANNEL_DOWNLOADS
        )
            .setSmallIcon(R.drawable.ic_notification)
            .setContentTitle(getString(R.string.download_failed_title))
            .setContentText(String.format(
                getString(R.string.download_failed_text), bookTitle
            ))
            .setStyle(new NotificationCompat.BigTextStyle()
                .bigText(errorMessage))
            .setPriority(NotificationCompat.PRIORITY_DEFAULT)
            .setAutoCancel(true)
            .setContentIntent(pendingIntent);
        
        notificationManager.notify(NOTIFICATION_ID_COMPLETE, builder.build());
    }
    
    /**
     * Broadcast download status to the app
     */
    private void broadcastDownloadStatus(String action, String bookId, 
                                        String bookTitle, int progress) {
        Intent intent = new Intent(action);
        intent.putExtra(EXTRA_BOOK_ID, bookId);
        intent.putExtra(EXTRA_BOOK_TITLE, bookTitle);
        intent.putExtra("progress", progress);
        sendBroadcast(intent);
    }
    
    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null; // Not a bound service
    }
    
    @Override
    public void onDestroy() {
        super.onDestroy();
        Timber.d("DownloadService destroyed");
        
        if (executorService != null && !executorService.isShutdown()) {
            executorService.shutdown();
        }
    }
    
    /**
     * Static method to start download service
     */
    public static void startDownload(Context context, String bookId, String bookTitle, 
                                   String bookUrl, String fileName) {
        Intent intent = new Intent(context, DownloadService.class);
        intent.putExtra(EXTRA_BOOK_ID, bookId);
        intent.putExtra(EXTRA_BOOK_TITLE, bookTitle);
        intent.putExtra(EXTRA_BOOK_URL, bookUrl);
        intent.putExtra(EXTRA_FILE_NAME, fileName);
        
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            context.startForegroundService(intent);
        } else {
            context.startService(intent);
        }
    }
}
