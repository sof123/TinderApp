import React, { Component, PropTypes } from 'react'
import  {connect } from 'react-redux'
import {bindDoComputationToDispatch, sendCredsAction} from '../actions/generalActions'
import FacebookLogin from 'react-facebook-login';
const user = {}
var tinder = require('tinder');
var client = new tinder.TinderClient();


export const LandingItem = ({doComputation, componentClicked, sendCreds}) =>{
  document.body.style.backgroundColor = "#E6E6FA";
  let userID
  let accessToken
  const responseFacebook = (response) => {
    console.log(response);
    userID = response.userID
    accessToken = response.accessToken
    sendCreds(userID, accessToken)
  }


return (
      <div >
        <meta name="author" content="Stephen" />
          <input type="hidden" name="timeStamp" />
        <table textAlign="center">
          <tbody>
            <tr>
              <td>
                <span id="AccountNameText"></span> <input type="button" defaultValue="Compute Results" id="update" onClick={doComputation} /><br />
              </td>
            </tr>

          </tbody>
        </table>

  <FacebookLogin
    appId="153778541904115"
    autoLoad={true}
    fields="name,email,picture"
    onClick={componentClicked}
    callback={responseFacebook} />
      </div>
)
}

//dispatching  method to reducer
export default connect(null, (dispatch, ownProps) => {
        return {
            doComputation: () => bindDoComputationToDispatch()(dispatch),
            sendCreds: (userID, accessToken) => sendCredsAction(userID, accessToken)(dispatch)
        }
    })(LandingItem)
