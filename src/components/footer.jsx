import React from 'react';
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import SvgIcon from 'material-ui/SvgIcon';

const VERSION = '1.0.0 (Release Candidate)';

const affiliateLinks = [
  { text: 'Buy a Ledger Wallet', link: 'https://www.ledgerwallet.com/r/1985?path=/products/' },
  { text: 'Buy a TREZOR', link: 'https://shop.trezor.io?a=mycrypto.com' },
  { text: 'Buy a Keepkey', link: 'https://keepkey.go2cloud.org/aff_c?offer_id=1&aff_id=4086' },
  { text: 'Get a Steely', link: 'https://stee.ly/2Hcl4RE' },
  { text: 'Get an Ether.card', link: 'https://ether.cards/?utm_source=mycrypto&utm_medium=cpm&utm_campaign=site' },
]

const socialMediaLinks = [
  {
    link: 'https://twitter.com/crypto_curve',
    icon: <TwitterIcon color="inherit" nativeColor="#FFF" />,
    text: 'Twitter'
  },
  {
    link: 'https://www.facebook.com/CryptoCurve/',
    icon: <FacebookIcon color="inherit" nativeColor="#FFF" />,
    text: 'Facebook'
  },
  {
    link: 'https://medium.com/@Cryptocurve',
    icon: <MediumIcon color="inherit" nativeColor="#FFF" />,
    text: 'Medium'
  }
]

function FacebookIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M18,5H15.5A3.5,3.5 0 0,0 12,8.5V11H10V14H12V21H15V14H18V11H15V9A1,1 0 0,1 16,8H18V5Z" />
    </SvgIcon>
  );
}
function TwitterIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" />
    </SvgIcon>
  );
}
function MediumIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M4.37,7.3C4.4,7.05 4.3,6.81 4.12,6.65L2.25,4.4V4.06H8.05L12.53,13.89L16.47,4.06H22V4.4L20.4,5.93C20.27,6.03 20.2,6.21 20.23,6.38V17.62C20.2,17.79 20.27,17.97 20.4,18.07L21.96,19.6V19.94H14.12V19.6L15.73,18.03C15.89,17.88 15.89,17.83 15.89,17.59V8.5L11.4,19.9H10.8L5.57,8.5V16.14C5.5,16.46 5.63,16.78 5.86,17L7.96,19.57V19.9H2V19.57L4.1,17C4.33,16.78 4.43,16.46 4.37,16.14V7.3Z" />
    </SvgIcon>
  );
}

const SocialMediaLink = ({ link, text, icon }: { link: string; text: string; icon: object; }) => {
  return (
    <a style={{transition: 'opacity .3s', color: '#fff', marginLeft: '0.55rem', textDecoration: 'none', }} className="SocialMediaLink" key={link} href={link} aria-label={text}>
      {icon}
    </a>
  );
};

interface Props {
  latestBlock: string;
}

interface State {
  isDisclaimerOpen: boolean;
}

export default class Footer extends React.PureComponent<Props, State> {
  state = {
    isDisclaimerOpen: false
  };

   render() {
    return (
      <Grid container justify="center" alignItems="flex-start" direction="row" spacing={0} style={{ backgroundColor: 'black', color: 'white', padding: '1.5rem' }}>
        <Grid item xs={12} md={3} align="left">
          {socialMediaLinks.map((socialMediaItem, idx) => (
            <SocialMediaLink
              link={socialMediaItem.link}
              key={idx}
              text={socialMediaItem.text}
              icon={socialMediaItem.icon}
            />
          ))}
        </Grid>
        <Grid item xs={12} md={6} align="center">
          <div style={{marginBottom: '1rem'}}>
            <Typography style={{display: 'inline-block', paddingLeft: '12px', paddingRight: '12px'}}><a style={{color: '#FFFFFF', textDecoration: 'none', fontSize: '1.07rem'}} href="https://cryptocurve.io/">cryptocurve.io</a></Typography>
            <Typography style={{display: 'inline-block', paddingLeft: '12px', paddingRight: '12px'}}><a style={{color: '#FFFFFF', textDecoration: 'none', fontSize: '1.07rem'}} href="https://mycrypto.com/">mycrypto.com</a></Typography>
            <Typography style={{display: 'inline-block', paddingLeft: '12px', paddingRight: '12px'}}><a style={{color: '#FFFFFF', textDecoration: 'none', fontSize: '1.07rem'}} href="https://cryptocurve.io/team.php">Our Team</a></Typography>
          </div>

          <p style={{fontSize: '.75rem', maxWidth: '530px', opacity: '.8', margin: '0 auto 1rem'}}>This is an open-source, client-side tool for generating wallets, handling Smart Contract tokens, and interacting with the blockchain more easily. Developed by and for the community since 2018, we’re focused on building awesome products that put the power in people’s hands.</p>

          <div >
            <div style={{display: 'inline-block', margin: '0 .5rem', fontSize: '.8rem'}} >
              © {new Date().getFullYear()} CryptoCurve & MyCrypto, Inc.
            </div>
            <div style={{display: 'inline-block', margin: '0 .5rem', fontSize: '.8rem', cursor: 'pointer'}} >
              <a onClick={this.props.toggleModal}>Disclaimer</a>
            </div>
            <div style={{display: 'inline-block', margin: '0 .5rem', fontSize: '.8rem'}} >v{VERSION}</div>
          </div>
        </Grid>
        <Grid item xs={12} md={3} align="right">
          <h5 style={{margin: '0 0 .5rem', fontSize: '1rem', fontWeight: 400}} className="Footer-support-title">Support MyCrypto & Our Friends</h5>
          <div style={{marginBottom: '.5rem'}}>
            {affiliateLinks.map((link, i) => (
              <Typography style={{fontWeight: '400', lineHeight: '1.46429em', fontSize: '0.875rem'}}>
                <a style={{display: 'block', fontSize: '.8rem', marginBottom: '.25rem', color: '#fff', textDecoration: 'none'}} key={i} href={link.link}>
                  {link.text}
                </a>
              </Typography>
            ))}
          </div>
        </Grid>
      </Grid>
    );
  }

   toggleModal = () => {
    this.setState(state => {
      this.setState({ isDisclaimerOpen: !state.isDisclaimerOpen });
    });
  };
}
