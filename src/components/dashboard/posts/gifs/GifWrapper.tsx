import React from 'react';

export const GifWrapper = (props: any) => {
  return (
    <div style={styles.container}>
      <div style={styles.contentFiller}/>
      <div style={styles.gifDisplay}>{props.children}</div>
      <div style={styles.contentFiller}/>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex'
  },
  gifDisplay: {
    flex: 3
  },
  contentFiller: {
    flex: 1
  }
};