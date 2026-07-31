package com.yourcompany.skibidimath;

import android.content.Context;
import android.content.SharedPreferences;
import android.widget.Toast;
import com.android.billingclient.api.*;
import java.util.ArrayList;
import java.util.List;

public class BillingManager implements PurchasesUpdatedListener {
    
    private Context context;
    private BillingClient billingClient;
    private SharedPreferences prefs;
    
    public BillingManager(Context context) {
        this.context = context;
        this.prefs = context.getSharedPreferences("purchases", Context.MODE_PRIVATE);
        
        setupBillingClient();
    }
    
    private void setupBillingClient() {
        billingClient = BillingClient.newBuilder(context)
                .setListener(this)
                .enablePendingPurchases()
                .build();
    }
    
    public void startConnection() {
        billingClient.startConnection(new BillingClientStateListener() {
            @Override
            public void onBillingSetupFinished(BillingResult billingResult) {
                if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK) {
                    // Check for existing purchases
                    queryPurchases();
                    loadProducts();
                } else {
                    Toast.makeText(context, "Billing setup failed", Toast.LENGTH_SHORT).show();
                }
            }
            
            @Override
            public void onBillingServiceDisconnected() {
                // Try to reconnect
                startConnection();
            }
        });
    }
    
    private void loadProducts() {
        List<QueryProductDetailsParams.Product> productList = new ArrayList<>();
        
        // Add your products
        productList.add(QueryProductDetailsParams.Product.newBuilder()
                .setProductId(MainActivity.SKU_REMOVE_ADS)
                .setProductType(BillingClient.ProductType.INAPP)
                .build());
        
        productList.add(QueryProductDetailsParams.Product.newBuilder()
                .setProductId(MainActivity.SKU_PRO_PACK)
                .setProductType(BillingClient.ProductType.INAPP)
                .build());
        
        productList.add(QueryProductDetailsParams.Product.newBuilder()
                .setProductId(MainActivity.SKU_MONTHLY_SUB)
                .setProductType(BillingClient.ProductType.SUBS)
                .build());
        
        QueryProductDetailsParams params = QueryProductDetailsParams.newBuilder()
                .setProductList(productList)
                .build();
        
        billingClient.queryProductDetailsAsync(params, (billingResult, productDetailsList) -> {
            if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK) {
                // Store product details for later use
                // You can pass these to your UI
                for (ProductDetails product : productDetailsList) {
                    // Log or store product details
                    String price = product.getOneTimePurchaseOfferDetails() != null ? 
                            product.getOneTimePurchaseOfferDetails().getFormattedPrice() : 
                            "Subscription";
                    // Use this info in your UI
                }
            }
        });
    }
    
    private void queryPurchases() {
        // Check for existing purchases
        billingClient.queryPurchasesAsync(
                QueryPurchasesParams.newBuilder()
                        .setProductType(BillingClient.ProductType.INAPP)
                        .build(),
                (billingResult, purchases) -> {
                    if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK) {
                        for (Purchase purchase : purchases) {
                            handlePurchase(purchase);
                        }
                    }
                }
        );
    }
    
    public void purchaseProduct(String productId) {
        // First, check if already purchased
        if (hasPurchased(productId)) {
            Toast.makeText(context, "Already purchased!", Toast.LENGTH_SHORT).show();
            return;
        }
        
        // Get product details and launch purchase flow
        List<QueryProductDetailsParams.Product> productList = new ArrayList<>();
        productList.add(QueryProductDetailsParams.Product.newBuilder()
                .setProductId(productId)
                .setProductType(BillingClient.ProductType.INAPP)
                .build());
        
        QueryProductDetailsParams params = QueryProductDetailsParams.newBuilder()
                .setProductList(productList)
                .build();
        
        billingClient.queryProductDetailsAsync(params, (billingResult, productDetailsList) -> {
            if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK 
                    && !productDetailsList.isEmpty()) {
                
                ProductDetails productDetails = productDetailsList.get(0);
                List<BillingFlowParams.ProductDetailsParams> productDetailsParamsList = 
                        List.of(BillingFlowParams.ProductDetailsParams.newBuilder()
                                .setProductDetails(productDetails)
                                .build());
                
                BillingFlowParams billingFlowParams = BillingFlowParams.newBuilder()
                        .setProductDetailsParamsList(productDetailsParamsList)
                        .build();
                
                billingClient.launchBillingFlow((MainActivity) context, billingFlowParams);
            } else {
                Toast.makeText(context, "Product not found", Toast.LENGTH_SHORT).show();
            }
        });
    }
    
    @Override
    public void onPurchasesUpdated(BillingResult billingResult, List<Purchase> purchases) {
        if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK 
                && purchases != null) {
            for (Purchase purchase : purchases) {
                if (purchase.getPurchaseState() == Purchase.PurchaseState.PURCHASED) {
                    handlePurchase(purchase);
                }
            }
        } else if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.USER_CANCELED) {
            Toast.makeText(context, "Purchase cancelled", Toast.LENGTH_SHORT).show();
        } else {
            Toast.makeText(context, "Purchase failed: " + billingResult.getDebugMessage(), 
                    Toast.LENGTH_SHORT).show();
        }
    }
    
    private void handlePurchase(Purchase purchase) {
        // Verify the purchase (optional but recommended)
        String productId = purchase.getProducts().get(0);
        String purchaseToken = purchase.getPurchaseToken();
        
        // Save to SharedPreferences
        prefs.edit().putBoolean(productId, true).apply();
        
        // Acknowledge the purchase (required for non-consumable products)
        if (!purchase.isAcknowledged()) {
            AcknowledgePurchaseParams acknowledgeParams = AcknowledgePurchaseParams.newBuilder()
                    .setPurchaseToken(purchaseToken)
                    .build();
            
            billingClient.acknowledgePurchase(acknowledgeParams, billingResult -> {
                if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK) {
                    Toast.makeText(context, "Purchase acknowledged", Toast.LENGTH_SHORT).show();
                }
            });
        }
        
        // Apply purchase benefits
        applyPurchaseBenefits(productId);
    }
    
    private void applyPurchaseBenefits(String productId) {
        String message = "";
        switch (productId) {
            case "remove_ads":
                message = "Ads removed! Thank you for your support! 🎉";
                // Hide ads in your app
                break;
            case "pro_pack":
                message = "Pro features unlocked! 🚀";
                // Unlock pro features
                break;
            case "monthly_sub":
                message = "Subscription activated! 🌟";
                // Activate subscription benefits
                break;
        }
        
        // Show success message (via Toast or WebView)
        Toast.makeText(context, message, Toast.LENGTH_LONG).show();
        
        // Notify WebView (if you want to update UI)
        if (context instanceof MainActivity) {
            ((MainActivity) context).runOnUiThread(() -> {
                // Send message to WebView
                // ((MainActivity) context).webView.loadUrl("javascript:location.reload()");
            });
        }
    }
    
    public boolean hasPurchased(String sku) {
        return prefs.getBoolean(sku, false);
    }
    
    public void endConnection() {
        if (billingClient != null) {
            billingClient.endConnection();
        }
    }
}
