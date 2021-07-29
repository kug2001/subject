import React from 'react';
import Navbar from '../navbar/navbar';
import EnrollPost from './enrollpost';
import styles from './enroll.module.css';
import { useEffect } from 'react';
import { useState } from 'react';

const Enroll = ({firebase, user, path, item}) => {

  const [member, setMember] = useState('0');
  const [post, setPost] = useState(false);

  useEffect(()=> {
    if(!path){
      return;
    }
    const setRef = firebase.setDatabaseRef('subject').child(path).child('member');
    firebase.onDatabase(setRef)
      .then((data) => {
        if(!data.exists()){
          setMember(0);
        }
        setMember(data.numChildren());
      })
    
    
  }, [firebase, post, path])

  const onHandlePost = () => {
    if(!post) {
      setPost(true);
    }
    setPost(false);
  }

  return (
    <section className={styles.enrollContainer}>
      <Navbar 
        firebase={firebase} 
        user={user}
        title={item.title}
      />
      <div className={styles.subjectBox}>
        <div className={styles.titleBox}>
          <h1>강의명 : {item.title}</h1>
        </div>
        <div className={styles.subTitle}>
          <h2>강사 : {item.speaker}</h2>
          <h2>정원 : {member}/{item.maxMember}</h2>
        </div>
        <div className={styles.discriptionBox}>
          <h2>{item.discription}</h2>
        </div>
        <EnrollPost
          firebase={firebase} 
          user={user}
          path={path}
          post={onHandlePost}
          member={member}
          maxMember={item.maxMember}
        />
      </div>
      
    </section>
  )
}

export default Enroll;