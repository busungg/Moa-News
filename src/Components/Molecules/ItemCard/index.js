import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
//import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 600,
    height: 300,
  },
  media: {
    height: 140,
  },
});

const ItemCard = ({
  title,
  description,
  urlToImage,
  publishedAt,
  evtClick,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          image={`${urlToImage}`}
          title={''}
          className={classes.media}
        />
        <CardContent>
          <Typography gutterBottom variant={'h5'} component={'h2'}>
            {title}
          </Typography>
          <Typography gutterBottom variant={'h5'} component={'h4'}>
            {publishedAt}
          </Typography>
          <Typography variant={'body2'} color={'textSecondary'} component={'p'}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ItemCard;
