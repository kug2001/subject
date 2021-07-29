import React, { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './navbar.module.css';

const useScroll = () => {
  const [status, setStatus] = useState({
    scrollY: 0,
    scrollX: 0,
  });
  const handler = () => {
    setStatus({
      scrollY: window.scrollY,
      scrollX: window.scrollX,
    })
  };
  useEffect(() => {
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll",handler);
  }, []);

  return status;
};

const Navbar = ({title, firebase, user}) => {

  const [rect, setRect] = useState([]);
  const [styleNavbar, setStyleNavbar] = useState({});
  const { scrollY } = useScroll();
  const history = useHistory();
  const navbar = useRef();
  const logout = useRef();
  
  useEffect(()=>{
    setRect(navbar.current.getBoundingClientRect())
    if(!user){
      logout.current.style.visibility = "hidden";
      
      return;
    }
    else{
      logout.current.style.visibility = "visible";
      return;
    }
  }, [user])
  
  const handleLogout = () =>{
      firebase.googleLogout()
        .then(() => {
          alert('로그아웃 되었습니다');
        })
  }

  const handleBackPage = () => {
    history.push('/class-list');
  }
  

  return (
    <>
      <section className={styles.navbarContainer} ref={navbar} style={{position : 'fixed'}}>
        <span className={styles.btnBox}>
          <button onClick={handleBackPage} className={styles.backPageBtn}> 뒤로 </button>
        </span>
        <h1 className={styles.navbarTitle}>{title}</h1>
        <span className={styles.btnBox}>
          <button className={styles.logoutBtn} onClick={handleLogout} ref={logout}>Logout</button>
        </span>
      </section>
    </>
  )
}
export default Navbar;