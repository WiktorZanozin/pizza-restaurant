import { CircularProgress, createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  }),
);

export const LoadingComponent = () => {
    const classes = useStyles();

    return (
      <div className={classes.root}>
        <CircularProgress />
      </div>
    );
};