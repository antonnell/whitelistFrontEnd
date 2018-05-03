import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import Card, { CardActions, CardContent } from "material-ui/Card";
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import SvgIcon from 'material-ui/SvgIcon';
import Snackbar from 'material-ui/Snackbar';
import { CircularProgress } from 'material-ui/Progress';

const styles = {};

function CopyIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
    </SvgIcon>
  );
}

class Welcome extends Component {

  constructor(props) {
    super(props);
  };

  render() {
    var that = this

    if(this.props.loaded) {
      return (
        <Grid>
          <Grid container justify="center" alignItems="center" direction="row" spacing={0} style={{padding: "60px 20px 60px 20px", maxWidth: "400px", margin: "0 auto", marginTop:"100px"}}>
            <Grid item xs={12} align="center">
              <Grid container justify="space-around" alignItems="center" direction="row" spacing={0} style={{minHeight: "30px"}}>
                <Grid item xs={12} align="center">
                  <Typography variant="display1" color="inherit" style={{fontSize: '2.125rem'}}>
                    Submission Accepted
                  </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                  <Typography variant="body1" style={{marginTop: '24px'}} >
                    Thank you for joining the CryptoCurve whitelist. We will keep in contact with you via your submitted email address.
                  </Typography>
                  <Typography variant="body1" style={{marginTop: '24px'}}>
                    All you need to do, is send Eth to the address below:
                  </Typography>
                  <Typography variant="body2" style={{marginTop: '24px', fontWeight: 'bold'}}>
                    {this.props.smartContractAddress}
                    <Tooltip id="tooltip-icon" title="Copy Smart Contract Address">
                      <IconButton color="primary" component="span" onClick={this.props.onCopyClicked}>
                        <CopyIcon />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                </Grid>
              </Grid>
              <Grid container justify="space-around" alignItems="center" direction="row" spacing={0} style={{marginTop: "20px"}}>
                <Grid item xs={12} align="right">
                  <Button variant="raised" size="large" fullWidth={true} style={{transition:"ease 1s",borderRadius:"0px"}} color="secondary" onClick={this.props.navigateBack} disabled={this.props.loading}>
                    Back
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            open={this.props.snackOpen}
            autoHideDuration={3000}
            onClose={this.props.handleSnackClose}
            SnackbarContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">Address copied to clipboard</span>}
          />
        </Grid>
      )
    }

    return (
      <Grid>
        <Grid container justify="center" alignItems="center" direction="row" spacing={0} style={{padding: "60px 20px 60px 20px", maxWidth: "400px", margin: "0 auto",marginTop:"100px"}}>
          <Grid item xs={12} align="center">
            <Grid container justify="space-around" alignItems="center" direction="row" spacing={0}>
              <Grid item xs={12} align="center">
                <Typography variant="display1" color="inherit" style={{fontSize: '2.125rem'}}>
                  Whitelist
                </Typography>
              </Grid>
            </Grid>
            <Grid container justify="space-around" alignItems="center" direction="row" spacing={0}>
              <Grid item xs={12} style={{marginTop: "20px"}}>
                <TextField required fullWidth={true} color="textSecondary" error={this.props.emailAddressError} disabled={this.props.loading}
                  id="emailAddress" placeholder="Email Address" value={this.props.emailAddress}
                  onChange={(event) => { this.props.handleChange(event, "emailAddress"); }} margin="normal" onKeyDown={this.props.onWhitelistKeyDown}
                  helperText={this.props.emailAddressErrorText != null ? this.props.emailAddressErrorText: "Your email address that we can get hold of you on"}/>
                <TextField required fullWidth={true} color="textSecondary" error={this.props.ethAddressError} disabled={this.props.loading}
                  id="ethAddress" placeholder="Ethereum Address" value={this.props.ethAddress}
                  onChange={(event) => { this.props.handleChange(event, "ethAddress"); }} margin="normal" onKeyDown={this.props.onWhitelistKeyDown}
                  helperText={this.props.ethAddressErrorText != null ? this.props.ethAddressErrorText: "Your Ethereum public address"}/>
                <TextField required fullWidth={true} color="textSecondary" error={this.props.wanAddressError} disabled={this.props.loading}
                  id="wanAddress" placeholder="Wanchain Address" value={this.props.wanAddress}
                  onChange={(event) => { this.props.handleChange(event, "wanAddress"); }} margin="normal" onKeyDown={this.props.onWhitelistKeyDown}
                  helperText={this.props.wanAddressErrorText != null ? this.props.wanAddressErrorText: "Your Wanchain public address"}/>
              </Grid>
            </Grid>
            {this.props.loading && <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>}
            <Grid container justify="space-around" alignItems="center" direction="row" spacing={0} style={{minHeight: "30px"}}>
              <Grid item xs={12} align="right">
                <Typography style={{color: "#f44336"}} >
                  {this.props.error}
                </Typography>
              </Grid>
            </Grid>
            <Grid container justify="space-around" alignItems="center" direction="row" spacing={0} style={{marginTop: "20px"}}>
              <Grid item xs={12} align="right">
                <Button variant="raised" size="large" fullWidth={true} style={{transition:"ease 1s",borderRadius:"0px"}} color="secondary" onClick={this.props.submitWhitelist} disabled={this.props.loading}>
                  Whitelist
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };
}
//
export default withStyles(styles)(Welcome);
