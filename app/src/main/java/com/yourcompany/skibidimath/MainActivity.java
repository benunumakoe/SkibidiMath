package com.yourcompany.skibidimath;

import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebSettings;
import android.widget.Button;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    
    private WebView webView;
    private BillingManager billingManager;
    
    // Product IDs - MATCH THESE with Play Console
    public static final String SKU_REMOVE_ADS = "remove_ads";
    public static final String SKU_PRO_PACK = "pro_pack";
    public static final String SKU_MONTHLY_SUB = "monthly_sub";
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        // Initialize Billing
        billingManager = new BillingManager(this);
        billingManager.startConnection();
        
        // Setup WebView for your HTML game
        setupWebView();
        
        // Setup purchase buttons
        setupPurchaseButtons();
    }
    
    private void setupWebView() {
        webView = findViewById(R.id.webView);
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setLoadWithOverviewMode(true);
        webSettings.setUseWideViewPort(true);
        
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                // Inject JavaScript interface for billing
                view.loadUrl("javascript:window.android = { " +
                    "purchaseRemoveAds: function() { AndroidInterface.purchaseRemoveAds(); }, " +
                    "purchaseProPack: function() { AndroidInterface.purchaseProPack(); }, " +
                    "hasRemoveAds: function() { return AndroidInterface.hasRemoveAds(); }, " +
                    "hasProPack: function() { return AndroidInterface.hasProPack(); } " +
                    "};");
            }
        });
        
        // Load your HTML game from assets
        webView.loadUrl("file:///android_asset/index.html");
    }
    
    private void setupPurchaseButtons() {
        // These buttons can be in your layout or controlled from JavaScript
        findViewById(R.id.btn_remove_ads).setOnClickListener(v -> 
            billingManager.purchaseProduct(SKU_REMOVE_ADS)
        );
        
        findViewById(R.id.btn_pro_pack).setOnClickListener(v -> 
            billingManager.purchaseProduct(SKU_PRO_PACK)
        );
        
        findViewById(R.id.btn_subscribe).setOnClickListener(v -> 
            billingManager.purchaseProduct(SKU_MONTHLY_SUB)
        );
    }
    
    // Methods called from JavaScript
    public void purchaseRemoveAds() {
        billingManager.purchaseProduct(SKU_REMOVE_ADS);
    }
    
    public void purchaseProPack() {
        billingManager.purchaseProduct(SKU_PRO_PACK);
    }
    
    public boolean hasRemoveAds() {
        return billingManager.hasPurchased(SKU_REMOVE_ADS);
    }
    
    public boolean hasProPack() {
        return billingManager.hasPurchased(SKU_PRO_PACK);
    }
    
    @Override
    protected void onDestroy() {
        super.onDestroy();
        billingManager.endConnection();
    }
}
