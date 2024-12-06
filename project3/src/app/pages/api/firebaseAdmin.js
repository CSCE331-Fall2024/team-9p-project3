import admin from 'firebase-admin';
const serviceAccountJson = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccountJson),
    });
}

export const authAdmin = admin.auth();