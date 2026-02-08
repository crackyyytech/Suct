# Firebase Setup Guide

## 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `educonnect-platform`
4. Enable Google Analytics (optional)
5. Create project

## 2. Enable Authentication

1. Go to Authentication → Sign-in method
2. Enable Email/Password provider
3. Enable Google provider (optional)
4. Save configuration

## 3. Create Firestore Database

1. Go to Firestore Database
2. Click "Create database"
3. Start in test mode (for development)
4. Choose location (closest to your users)

## 4. Get Configuration

1. Go to Project Settings → General
2. Scroll to "Your apps"
3. Click "Web app" icon
4. Register app name: `educonnect-web`
5. Copy the config object

## 5. Update Environment Variables

Create `.env.local` file with your Firebase config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 6. Security Rules

Update Firestore rules in Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Students can read curriculum data
    match /syllabus/{document=**} {
      allow read: if request.auth != null;
    }
    
    // Students can read/write their progress
    match /student_progress/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Teachers can read student data in their classes
    match /users/{userId} {
      allow read: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'teacher';
    }
    
    // Admins can read/write everything
    match /{document=**} {
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

## 7. Test Connection

Run the app and check browser console for Firebase connection status.