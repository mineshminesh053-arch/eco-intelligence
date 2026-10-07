import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDemoKey-placeholder",
  authDomain: "ecobot-waste-mgmt.firebaseapp.com",
  projectId: "ecobot-waste-mgmt",
  storageBucket: "ecobot-waste-mgmt.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:0000000000000000000000"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Reports Collection helpers
export const addReportToFirebase = async (report) => {
  try {
    const docRef = await addDoc(collection(db, 'wasteReports'), {
      ...report,
      createdAt: serverTimestamp()
    });
    console.log('Report saved to Firebase with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.warn('Firebase write skipped (offline/config):', error.message);
    return null;
  }
};

export const getReportsFromFirebase = async () => {
  try {
    const q = query(collection(db, 'wasteReports'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ firebaseId: d.id, ...d.data() }));
  } catch (error) {
    console.warn('Firebase read skipped (offline/config):', error.message);
    return [];
  }
};

export const updateReportStatus = async (firebaseId, newStatus, note) => {
  try {
    const ref = doc(db, 'wasteReports', firebaseId);
    await updateDoc(ref, {
      status: newStatus,
      [`updates`]: [{ time: new Date().toLocaleTimeString(), note }]
    });
  } catch (error) {
    console.warn('Firebase update skipped:', error.message);
  }
};

// Save chat message to Firebase
export const saveChatMessage = async (sessionId, message) => {
  try {
    await addDoc(collection(db, 'chatSessions', sessionId, 'messages'), {
      ...message,
      createdAt: serverTimestamp()
    });
  } catch (error) {
    console.warn('Chat save skipped:', error.message);
  }
};

export { db };
