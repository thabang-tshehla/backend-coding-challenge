## 🔐 Design Write-Up

### 1. Choice of Encryption method

I use **AES-256-CBC** for encryption, because:
- AES-256 is a widely accepted standard for secure encryption.
- CBC mode ensures that identical plaintext blocks produce different ciphertext blocks when combined with a random IV, enhancing security.

### 2. Ensuring that only original user can access their messages

- A unique encryption key will be derived for each user using HMAC-SHA256 with a server-side secret and the user's ID. This ensures that only the user with the correct ID can decrypt their messages.
- Additionally, token-based authentication will be implemented to verify the user's identity before accessing their messages.

### 3. IV Storage and extraction

- The IV is generated randomly for each message and prepended to the ciphertext before encoding it in Base64 format.
- During decryption, the IV is extracted from the first 16 bytes of the Base64-decoded ciphertext.

### 4. Preventing userId spoofing and unauthorized access to user's messages

- Token-based authentication is used to validate the user's identity. The token contains the user's ID, which is verified using a server-side secret.
- The user's ID from the token is matched against the requested user ID to ensure access is restricted to the rightful owner.
