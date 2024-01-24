// firebase initializer

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBdiAafwF1tbx7QTlTYhJaMYpsBInHqD28",
  authDomain: "amir-portfolio-9fe8a.firebaseapp.com",
  projectId: "amir-portfolio-9fe8a",
  storageBucket: "amir-portfolio-9fe8a.appspot.com",
  messagingSenderId: "863602545457",
  appId: "1:863602545457:web:7c9322578d8aaab8c95610",
  measurementId: "G-TJWMMTQZ2G",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
