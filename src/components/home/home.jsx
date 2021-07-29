import React from 'react';
import Navbar from '../navbar/navbar';
import styles from './home.module.css';

const Home = ({firebase}) => {

  const handleGoogleLogin = () => {
    firebase.googleLogin()
      .then((credential) => {
        console.log(credential.user.uid);
        setUserIdEnroll(credential.user.uid)
      })
  }

  const setUserIdEnroll = (uid) => {
    const setRef = firebase.setDatabaseRef('user').child(uid);
    const item = {
      enroll_chance : 2
    }
    firebase.setDatabase(setRef, item)
      .then((msg) => console.log(msg));
  }

  return(
    <>
    <Navbar />
      <section className={styles.mainContainer}>
        <h1>청주지구 선택특강에 오신 여러분을 환영합니다.</h1>
        <div className={styles.loginBox}>
          <h2>아래의 버튼을 통해서 로그인을 해야합니다.</h2>
        </div>
        <button onClick={handleGoogleLogin}>구글로 로그인 하기</button>
      </section>
    </>
  )
}

export default Home;