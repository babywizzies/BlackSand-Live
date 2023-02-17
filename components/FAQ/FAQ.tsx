import React, { useState } from "react";
import styles from '../../styles/css/faq.module.css'
import {FaqItem} from '../../styles/data/FaqItem'

const FAQ = () => {

  const [activeIndex, setActiveIndex] = useState(-1);

  const handleClick = (id: number) => {
    setActiveIndex(id === activeIndex ? -1 : id);
  };

  return (
      <div className={styles.container}>
        <h1 className={styles.title}>Frequently Asked Questions</h1>

        <div className={styles.faq_container}>
        {FaqItem.map(({ id, question, answer, link }) => ( 
            <div key={id}>
              <div className={styles.question} onClick={() => handleClick(id)}>
                <p className={styles.question_text}>{question}</p>
                
              </div>
              <div className={styles.answer}
                style={{
                  maxHeight:id === activeIndex ? "100%" : "0",
                  overflow: "hidden",
                }}
              >
                <p className={styles.answer_text}>{answer}<a target="_blank" rel="noopener noreferrer" href={link} className={styles.links}> {link}</a></p>
              </div>
            </div>
          ))}
        </div>
          
      </div>
  );
};

export default FAQ;