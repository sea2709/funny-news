import React from 'react'
import styles from './article-preview.module.css'

const ArticlePreview = (props) => {
  return (
    <div className={styles.article}>
      <div className={styles.image} style={{backgroundImage: "url(" + props.image + ")"}} />
      <div className={styles.content}>
        <div className={styles.title}>
          <a href={props.link} target="_link">{props.title}</a>
        </div>
        <div className={styles.description}>{props.description}</div>
      </div>
    </div>
  );
}

export default ArticlePreview;