import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
//import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import styles from './style.module.css';

const limitText = (text) => {
  if (text && text.length > 120) {
    return `${text.substring(0, 120)}...`;
  } else if (!text) {
    return '....';
  }

  return text;
};

const ItemCard = ({
  title,
  description,
  urlToImage,
  publishedAt,
  evtClick,
}) => {
  return (
    <Card className={styles.root}>
      <CardActionArea>
        <div className={styles.wrap__title}>
          {urlToImage && (
            <CardMedia
              image={`${urlToImage}`}
              title={''}
              className={styles.media}
            />
          )}
          <div className={styles.title}>
            <Typography gutterBottom component={'h4'}>
              {title}
            </Typography>
            <Typography gutterBottom component={'h5'}>
              {publishedAt}
            </Typography>
          </div>
        </div>
        <CardContent className={styles.wrap__content}>
          <Typography
            className={styles.content}
            variant={'body2'}
            color={'textSecondary'}
            component={'p'}
          >
            {limitText(description)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ItemCard;
