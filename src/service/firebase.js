import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';

export default class Firebase {
  firebaseInit () {
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
      measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
    }
    firebase.initializeApp(firebaseConfig);
  };

  //구글 로그인&로그아웃

  googleLogin () {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  }

  googleLogout () {
    return firebase.auth().signOut();
  }

  //유저정보 관찰자

  authObserver(user){
    return firebase.auth().onAuthStateChanged(user);
  }

  // 데이터베이스

  setDatabaseRef(ref){
    return firebase.database().ref(ref);
  }
  setDatabase (setRef, item){
    return new Promise((resolve, reject) => {
        setRef.set(item);
        resolve('저장완료');
      })
  }
  removeDatabase (setRef) {
    return new Promise((resolve, reject)=>{
      setRef.remove();
      resolve('강의가 취소되었습니다');
    })
  }
  onDatabase (setRef) {
    return new Promise((resolve, reject) => {
      setRef.on('value', (snapshot) => {
        resolve(snapshot);
        
      })
    })
  }
  
  updateDatabase (setRef, item) {
    return new Promise((resolve, reject) => {
      const update = setRef.update(item);
      resolve(update);
      })
  }


  subjectWriteData(title, speaker, discription, maxMember){
    const setRef = firebase.database().ref('subject');
    return new Promise((resolve, reject) => {
      const newSubjectRef = setRef.push();
      newSubjectRef.set({
        title : title,
        speaker: speaker,
        discription : discription,
        maxMember : Number(maxMember),
        member : 0,
      })
    });
  }


  //end
}