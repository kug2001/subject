import React, {useState} from 'react';
import Navbar from '../navbar/navbar'
import Subject from '../subject/subject';

import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './classList.module.css';

const ClassList = ({firebase, user, enroll}) => {

  const title = "선택특강 리스트";
  const [ list, setList ] = useState('');
  const history = useHistory();

  useEffect(() => {
    const setRef = firebase.setDatabaseRef('subject');
    firebase.onDatabase(setRef)
      .then((subject)=>{
        const data = subject.val();
        if(!data) {
          return;
        }
        setList(Object.entries(data));
    })
  }, [firebase]);

  const handdlePostPush = () => {
    history.push('/post');
  }
  const onHandleEnroll = (path, item) => {
    enroll(path, item, list);
  }

  return(
    <section className={styles.classListContainer}>
      <Navbar title={title} firebase={firebase} user={user} />
      
      <ul className={styles.classListBox}>
        {
          list&&list.map((item) => {
            return (
                <Subject 
                  item={item[1]}
                  key={item[0]} 
                  path={item[0]} 
                  enroll={onHandleEnroll}
                />
            )
          })
        }
      </ul>
      <div className={styles.btnBox}>
        <button className={styles.subjectRegiste} onClick={handdlePostPush}>강의 등록하기</button>
        {/* <button className={styles.subjectRegiste} onClick={null}>강의 삭제하기</button> */}
      </div>
    </section>
  )
}

export default ClassList;