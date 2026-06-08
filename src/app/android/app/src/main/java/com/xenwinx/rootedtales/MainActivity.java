package com.xenwinx.rootedtales;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import timber.log.Timber;

/**
 * Main Activity for Rooted Tales
 * This is the entry point for the Android app
 * Extends BridgeActivity to provide Capacitor functionality
 */
public class MainActivity extends BridgeActivity {
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // Apply splash screen theme
        setTheme(R.style.AppTheme);
        
        super.onCreate(savedInstanceState);
        
        Timber.d("MainActivity onCreate");
        
        // Handle incoming intent (deep links, file opens)
        handleIntent(getIntent());
    }
    
    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        
        Timber.d("MainActivity onNewIntent: %s", intent.getAction());
        
        // Handle new intent (for deep links when app is already running)
        handleIntent(intent);
    }
    
    /**
     * Handle deep links and file opening intents
     */
    private void handleIntent(Intent intent) {
        if (intent == null) {
            return;
        }
        
        String action = intent.getAction();
        Uri data = intent.getData();
        
        Timber.d("Handling intent - Action: %s, Data: %s", action, data);
        
        // Handle VIEW action (deep links)
        if (Intent.ACTION_VIEW.equals(action) && data != null) {
            handleDeepLink(data);
        }
        
        // Handle SEND action (sharing to app)
        else if (Intent.ACTION_SEND.equals(action)) {
            handleSharedContent(intent);
        }
    }
    
    /**
     * Handle deep link URLs
     * Examples:
     * - rootedtales://book/123
     * - https://rootedtales.app/book/123
     */
    private void handleDeepLink(Uri uri) {
        String scheme = uri.getScheme();
        String host = uri.getHost();
        String path = uri.getPath();
        
        Timber.i("Deep link received - Scheme: %s, Host: %s, Path: %s", scheme, host, path);
        
        try {
            // Custom scheme: rootedtales://book/123
            if ("rootedtales".equals(scheme)) {
                if ("book".equals(host) && path != null) {
                    String bookId = path.substring(1); // Remove leading slash
                    openBook(bookId);
                } else if ("character".equals(host) && path != null) {
                    String characterId = path.substring(1);
                    openCharacter(characterId);
                } else if ("store".equals(host)) {
                    openStore();
                }
            }
            
            // HTTPS scheme: https://rootedtales.app/book/123
            else if ("https".equals(scheme) && 
                    ("rootedtales.app".equals(host) || "www.rootedtales.app".equals(host))) {
                
                if (path != null) {
                    if (path.startsWith("/book/")) {
                        String bookId = path.substring(6);
                        openBook(bookId);
                    } else if (path.startsWith("/character/")) {
                        String characterId = path.substring(11);
                        openCharacter(characterId);
                    } else if (path.startsWith("/store")) {
                        openStore();
                    }
                }
            }
            
            // File scheme: file:///path/to/book.epub
            else if ("file".equals(scheme) || "content".equals(scheme)) {
                openFile(uri);
            }
            
        } catch (Exception e) {
            Timber.e(e, "Error handling deep link: %s", uri);
        }
    }
    
    /**
     * Open a specific book in the reader
     */
    private void openBook(String bookId) {
        Timber.i("Opening book with ID: %s", bookId);
        
        // Send message to JavaScript
        String jsCode = String.format("window.openBook('%s')", bookId);
        getBridge().eval(jsCode, null);
    }
    
    /**
     * Open a specific character in the gallery
     */
    private void openCharacter(String characterId) {
        Timber.i("Opening character with ID: %s", characterId);
        
        String jsCode = String.format("window.openCharacter('%s')", characterId);
        getBridge().eval(jsCode, null);
    }
    
    /**
     * Open the store screen
     */
    private void openStore() {
        Timber.i("Opening store");
        
        String jsCode = "window.openStore()";
        getBridge().eval(jsCode, null);
    }
    
    /**
     * Open an ebook file (EPUB, PDF)
     */
    private void openFile(Uri fileUri) {
        Timber.i("Opening file: %s", fileUri);
        
        // Send file URI to JavaScript for processing
        String jsCode = String.format("window.openFile('%s')", fileUri.toString());
        getBridge().eval(jsCode, null);
    }
    
    /**
     * Handle content shared to the app
     */
    private void handleSharedContent(Intent intent) {
        String type = intent.getType();
        
        Timber.i("Shared content received - Type: %s", type);
        
        if ("text/plain".equals(type)) {
            String sharedText = intent.getStringExtra(Intent.EXTRA_TEXT);
            if (sharedText != null) {
                handleSharedText(sharedText);
            }
        } else if (type != null && type.startsWith("image/")) {
            Uri imageUri = intent.getParcelableExtra(Intent.EXTRA_STREAM);
            if (imageUri != null) {
                handleSharedImage(imageUri);
            }
        }
    }
    
    /**
     * Handle shared text
     */
    private void handleSharedText(String text) {
        Timber.i("Shared text: %s", text);
        
        String jsCode = String.format("window.handleSharedText('%s')", 
            text.replace("'", "\\'"));
        getBridge().eval(jsCode, null);
    }
    
    /**
     * Handle shared image
     */
    private void handleSharedImage(Uri imageUri) {
        Timber.i("Shared image: %s", imageUri);
        
        String jsCode = String.format("window.handleSharedImage('%s')", imageUri.toString());
        getBridge().eval(jsCode, null);
    }
    
    @Override
    protected void onResume() {
        super.onResume();
        Timber.d("MainActivity onResume");
    }
    
    @Override
    protected void onPause() {
        super.onPause();
        Timber.d("MainActivity onPause");
    }
    
    @Override
    protected void onDestroy() {
        super.onDestroy();
        Timber.d("MainActivity onDestroy");
    }
}
