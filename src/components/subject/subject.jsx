import React from 'react';
import styles from './subject.module.css';

const Subject = ({ item, path, enroll }) => {

  const title = item.title;
  const speaker = item.speaker;
  const discription = item.discription;
  const maxMember = item.maxMember;
  let member = '';
  
  if(!item.member){
    member = 0;
  }
  else {
    const keys = Object.keys(item.member);
    member = keys.length;
  }

  const handelPushPath = () => {
    enroll(path, item);
  }

  return (
    <>
        <li className={styles.contentBox} onClick={handelPushPath}>
          <div className={styles.titleBox}>
            <h2>강의명 : {title}</h2>
          </div>
          <div className={styles.subtitleBox}>
            <span>강사 : {speaker}</span>
            <span>정원 : {member}/{maxMember}</span>
          </div>
          <div>{discription}</div>
        </li>
    </>
  )
}

export default Subject;