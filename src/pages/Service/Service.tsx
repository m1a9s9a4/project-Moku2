import React from 'react';
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import { themeColor, blueColor } from '../../utils/themeColor';
import Icon from '../../assets/images/logo_title.png'
import FirstView from '../../assets/images/firstView.png';
import WhatIsMoku from '../../assets/images/whatIsMoku.png';
import Logo from '../../assets/images/logo.png';
import WhatFeatures from '../../assets/images/whatFeatures.png';
import {appConfig} from "../../config";

const useStyles = makeStyles({
  topWrapper: {
    fontSize: '20px',
    lineHeight: '40px',
  },
  appHeader: {
    backgroundColor: blueColor,
    height: '50px',
    color: '#ffffff',
    position: 'relative',
  },
  image: {
    position: 'relative',
    height: '50px',
    margin: 'auto',
    display: 'block',
  },
  firstView: {
    width: '100%',
  },
  firstViewImage: {
    width: '100%',
  },
  whatIsMokuWrapper: {
    width: '100%',
    textAlign: 'center',
  },
  heading: {
    width: '300px',
    margin: '20px auto',
    display: 'block',
  },
  registerBtnWrapper: {
    width: '100%',
    marginTop: '20px',
  },
  registerBtn: {
    width: '400px',
    height: '70px',
    margin: 'auto',
    display: 'block',
    fontSize: '20px',
    backgroundColor: themeColor,
    color: '#ffffff',
  }
})

const Service: React.FC = () => {
  const classes = useStyles();
  return (
    <div>
      <header className={classes.appHeader}>
        <img src={Icon} alt={appConfig.title} className={classes.image} />
      </header>
      <div className={classes.firstView}>
        <img src={FirstView} className={classes.firstViewImage} alt='first view image' />
      </div>
      <Container className={classes.topWrapper}>
        <div className={classes.registerBtnWrapper} >
          <Button variant="contained" className={classes.registerBtn}>入場する</Button>
        </div>
        <div className={classes.whatIsMokuWrapper}>
          <img src={WhatIsMoku} className={classes.heading} alt='what is moku image' />
          <p>
            もくもく会を知らない人とやっている感覚を<br/>
            味わえる「オンラインもくもくサービス」です<br />
            他のMOKU参加者のオンライン状況が見れることで<br />
            「他の人も頑張ってるから自分も！」とモチベーションをお互いに与え合うことを期待しています<br />
          </p>
          <img src={Logo} />
        </div>
        <div>
          <img src={WhatFeatures} className={classes.heading} />
        </div>
      </Container>
    </div>
  )
}

export default Service;