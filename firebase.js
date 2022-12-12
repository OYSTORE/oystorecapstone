
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_APIKEY,

    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  
    projectId: process.env.NEXT_PUBLIC_PROJECTID,
  
    storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  
    appId: process.env.NEXT_PUBLIC_APPID,

    storageBucket: 'gs://capstone-ad877.appspot.com'

  
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);


