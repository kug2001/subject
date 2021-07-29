import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import styles from './enroll.module.css';

const EnrollPost = ({firebase, user, path, post, member, maxMember}) => {
  const [ checkId, setCheckId ] = useState('');
  const [ count, setCount ] = useState('');

  useEffect(()=>{
    if(!path){
      return;
    }
    const setRef = firebase.setDatabaseRef('subject').child(path).child('member').child(user);
      firebase.onDatabase(setRef)
        .then((data)=> {
          if(!data.exists()){
            setCheckId(false);
            return;
          }
          setCheckId(true);
        })
    const readRef = firebase.setDatabaseRef('user').child(user);
    firebase.onDatabase(readRef)
        .then((data) => {
          const enroll = data.val().enroll_chance;
          setCount(enroll);
    })

  }, [checkId, firebase, user, path, post])

  const userNameValue = useRef();
  const campusValue = useRef();
  const yearValue = useRef();

  const handleEnrollUser = () => {
    const userName = userNameValue.current.value;
    const campus = campusValue.current.value;
    const year = yearValue.current.value;

    if(!userName || !campus || !year){
      alert('정보를 입력해주세요');
      return;
    }
    else {
      setEnrollUser(userName, campus, year);
    }
  }
  const setEnrollUser = (userName, campus, year) => {
    const item = {
      'userName' : userName,
      'campus' : campus,
      'year' : year,
    };
    if(!checkId && count > 0 && member < maxMember){
      const setRef = firebase.setDatabaseRef('subject').child(path).child('member').child(user);
      firebase.setDatabase(setRef, item)
        .then((data)=>{
          alert(data);
          setCheckId(true);
          clickBtn();
          updateEnrollChance(true);
        });
      return;
    }
    else if(count <= 0) {
      alert('더 이상 등록할 수 없습니다.');
      return;
    }
    else if(member >= maxMember) {
      alert('정원이 다 되었습니다');
      return;
    }
    alert('이미 등록되어 있습니다.');
  }

  const handleCancleUser = () => {
    if(checkId){
      const setRef = firebase.setDatabaseRef('subject').child(path).child('member').child(user);
      firebase.removeDatabase(setRef)
        .then((data)=>{
          alert(data);
          setCheckId(false);
          clickBtn();
          updateEnrollChance(false);
        });
      return;
    }
    alert('등록되어 있지 않습니다.');
  }

  const updateEnrollChance = (select) => {
    const updataRef = firebase.setDatabaseRef('user').child(user);
    if(!select){
      const item = { enroll_chance : count + 1};
      firebase.updateDatabase(updataRef, item);
      return;
    }
    const item = { enroll_chance : count - 1};
    firebase.updateDatabase(updataRef, item);
  }

  const clickBtn = () => {
    post();
  }

  return (
    <div className={styles.postBox}>
      <label>
          이 &emsp; 름 : &ensp;
          <input type="text" ref={userNameValue} placeholder="ex)홍길동"/>
        </label>
        <label>
          캠 퍼 스 : &ensp;
          <input type="text" ref={campusValue} placeholder="ex)00대학교"/>
        </label>
        <label>
          학 &emsp; 번 : &ensp;
          <input type="text" ref={yearValue} placeholder="ex)21학번" / >
        </label>
        <div className={styles.btnBox}>
          <button onClick={handleEnrollUser}>등록하기</button>
          <button onClick={handleCancleUser}>취소하기</button>
        </div>
    </div>
  )
}

export default EnrollPost;