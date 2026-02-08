import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { useAuth, useFirestore } from '@/firebase';
import { students, teacherCredentials, adminCredentials } from '@/lib/demo-data';

export type UserRole = 'student' | 'teacher' | 'admin';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  createdAt: any;
  lastLoginAt: any;
  isActive: boolean;
  
  // Role-specific data
  studentProfile?: {
    studentId: string;
    class: string;
    rollNumber?: string;
    overallProgress: number;
  };
  
  teacherProfile?: {
    teacherId: string;
    subjects: string[];
    classes: string[];
    isApproved: boolean;
  };
  
  adminProfile?: {
    adminId: string;
    permissions: string[];
  };
}

class AuthService {
  private auth: any = null;
  private firestore: any = null;

  initialize(auth: any, firestore: any) {
    this.auth = auth;
    this.firestore = firestore;
  }

  // Check if Firebase is available, fallback to mock auth
  private get isFirebaseAvailable() {
    return this.auth && this.firestore && process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  }

  // Mock authentication for demo
  async mockSignIn(identifier: string, password: string): Promise<{ user: UserProfile; role: UserRole }> {
    // Check student credentials
    const student = students.find(s => s.studentId === identifier && s.password === password);
    if (student) {
      const userProfile: UserProfile = {
        uid: student.id,
        email: student.email,
        displayName: student.name,
        role: 'student',
        createdAt: new Date(),
        lastLoginAt: new Date(),
        isActive: true,
        studentProfile: {
          studentId: student.studentId,
          class: student.class,
          overallProgress: student.overallProgress
        }
      };
      
      // Store in localStorage for persistence
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
      localStorage.setItem('userRole', 'student');
      
      return { user: userProfile, role: 'student' };
    }

    // Check teacher credentials
    const teacher = teacherCredentials.find(t => t.id === identifier && t.password === password);
    if (teacher) {
      const userProfile: UserProfile = {
        uid: `teacher-${teacher.id}`,
        email: `${teacher.id}@educonnect.local`,
        displayName: 'Demo Teacher',
        role: 'teacher',
        createdAt: new Date(),
        lastLoginAt: new Date(),
        isActive: true,
        teacherProfile: {
          teacherId: teacher.id,
          subjects: ['Mathematics', 'Science'],
          classes: ['Class 1', 'Class 2', 'Class 3'],
          isApproved: true
        }
      };
      
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
      localStorage.setItem('userRole', 'teacher');
      
      return { user: userProfile, role: 'teacher' };
    }

    // Check admin credentials
    if (identifier === adminCredentials.id && password === adminCredentials.password) {
      const userProfile: UserProfile = {
        uid: 'admin-demo',
        email: 'admin@educonnect.local',
        displayName: 'Demo Admin',
        role: 'admin',
        createdAt: new Date(),
        lastLoginAt: new Date(),
        isActive: true,
        adminProfile: {
          adminId: adminCredentials.id,
          permissions: ['all']
        }
      };
      
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
      localStorage.setItem('userRole', 'admin');
      
      return { user: userProfile, role: 'admin' };
    }

    throw new Error('Invalid credentials');
  }

  // Firebase authentication
  async firebaseSignIn(email: string, password: string): Promise<{ user: UserProfile; role: UserRole }> {
    if (!this.isFirebaseAvailable) {
      throw new Error('Firebase not configured');
    }

    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    const user = userCredential.user;

    // Get user profile from Firestore
    const userDoc = await getDoc(doc(this.firestore, 'users', user.uid));
    
    if (!userDoc.exists()) {
      throw new Error('User profile not found');
    }

    const userProfile = userDoc.data() as UserProfile;
    
    // Update last login
    await setDoc(doc(this.firestore, 'users', user.uid), {
      ...userProfile,
      lastLoginAt: serverTimestamp()
    }, { merge: true });

    return { user: userProfile, role: userProfile.role };
  }

  // Universal sign in (tries Firebase first, falls back to mock)
  async signIn(identifier: string, password: string): Promise<{ user: UserProfile; role: UserRole }> {
    try {
      if (this.isFirebaseAvailable) {
        // Try Firebase authentication first
        return await this.firebaseSignIn(identifier, password);
      }
    } catch (error) {
      console.log('Firebase auth failed, using mock auth:', error);
    }

    // Fallback to mock authentication
    return await this.mockSignIn(identifier, password);
  }

  // Sign out
  async signOut(): Promise<void> {
    try {
      if (this.isFirebaseAvailable && this.auth.currentUser) {
        await firebaseSignOut(this.auth);
      }
    } catch (error) {
      console.error('Firebase signout error:', error);
    }

    // Clear local storage
    localStorage.removeItem('userProfile');
    localStorage.removeItem('userRole');
    localStorage.removeItem('studentId');
    localStorage.removeItem('studentData');
    localStorage.removeItem('teacherId');
    localStorage.removeItem('teacherData');
    localStorage.removeItem('adminData');
  }

  // Get current user from localStorage
  getCurrentUser(): UserProfile | null {
    if (typeof window === 'undefined') return null;
    
    const userProfileStr = localStorage.getItem('userProfile');
    if (userProfileStr) {
      try {
        return JSON.parse(userProfileStr);
      } catch (error) {
        console.error('Error parsing user profile:', error);
        return null;
      }
    }
    return null;
  }

  // Register new user (Firebase only)
  async register(email: string, password: string, userData: Partial<UserProfile>): Promise<UserProfile> {
    if (!this.isFirebaseAvailable) {
      throw new Error('Registration requires Firebase configuration');
    }

    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = userCredential.user;

    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email!,
      displayName: userData.displayName || '',
      role: userData.role || 'student',
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
      isActive: true,
      ...userData
    };

    // Save to Firestore
    await setDoc(doc(this.firestore, 'users', user.uid), userProfile);

    return userProfile;
  }
}

export const authService = new AuthService();