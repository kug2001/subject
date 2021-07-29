import React from 'react';
import { useRef } from 'react';
import { useHistory } from 'react-router';
import Navbar from '../navbar/navbar';
import styles from './post.module.css'

const Post = ({firebase, user}) => {
  const title = useRef();
  const sperker = useRef();
  const discription = useRef();
  const maxMember = useRef();
  const history = useHistory();

  const handdleSaveBtn = () => {
    const titleData = title.current.value;
    const sperkerData = sperker.current.value;
    const discriptionData = discription.current.value;
    const maxMemberData = maxMember.current.value;
    
    firebase.subjectWriteData(titleData, sperkerData, discriptionData, maxMemberData)
    .then((msg)=>{
      alert(msg);
      history.push('/class-list');
    });

  }
  const handdleCancleBtn = () => {
    history.goBack();
  }

  return (
    <>
      <Navbar title={'강의등록'} firebase={firebase} user={user}/>
      <div className={styles.postBox}>
        <ol>
          <li className={styles.inputList}>
            <label>
              제목
              <input className={styles.input} name="제목" ref={title} type="text" />
            </label>
          </li>
          <li className={styles.inputList}>
            <label>
              강사
              <input className={styles.input} name="제목" ref={sperker} type="text"/>
            </label>
          </li>
          <li className={styles.inputList}>
            <label className={styles.labels}>
              설명
              <textarea className={styles.textarea} name="설명" ref={discription} cols="30" rows="10"></textarea>
            </label>
          </li>
          <li className={styles.inputList}>
            <label>
              정원
              <input className={styles.input} name="정원" ref={maxMember}></input>
            </label>
          </li>
        </ol>
      </div>
      <div className={styles.btnBox}>
        <button onClick={handdleSaveBtn}>저장</button>
        <button onClick={handdleCancleBtn}>취소</button>
      </div>
    </>
  )
}

export default Post;