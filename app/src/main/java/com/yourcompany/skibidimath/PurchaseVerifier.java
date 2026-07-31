package com.yourcompany.skibidimath;

import android.util.Base64;
import android.util.Log;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.spec.X509EncodedKeySpec;

public class PurchaseVerifier {
    
    private static final String TAG = "PurchaseVerifier";
    
    // ⚠️ REPLACE THIS WITH YOUR ACTUAL PUBLIC KEY FROM PLAY CONSOLE ⚠️
    private static final String BASE64_PUBLIC_KEY = "YOUR_BASE64_PUBLIC_KEY_HERE";
    
    public static boolean verifyPurchase(String signedData, String signature) {
        if (signedData == null || signature == null) {
            Log.e(TAG, "Data or signature is null");
            return false;
        }
        
        try {
            // Generate Public Key
            byte[] decodedKey = Base64.decode(BASE64_PUBLIC_KEY, Base64.DEFAULT);
            X509EncodedKeySpec keySpec = new X509EncodedKeySpec(decodedKey);
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            PublicKey publicKey = keyFactory.generatePublic(keySpec);
            
            // Verify signature
            java.security.Signature sig = java.security.Signature.getInstance("SHA1withRSA");
            sig.initVerify(publicKey);
            sig.update(signedData.getBytes());
            
            byte[] signatureBytes = Base64.decode(signature, Base64.DEFAULT);
            return sig.verify(signatureBytes);
            
        } catch (Exception e) {
            Log.e(TAG, "Verification error", e);
            return false;
        }
    }
}
