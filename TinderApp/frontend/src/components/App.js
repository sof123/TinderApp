
import React, { Component, PropTypes } from 'react'
import {connect } from 'react-redux'
import LandingItem from './Landing'
import MetricsItem from './Metrics'
//render app component depending on location member in state
const App = ({location}) =>
{
  if (location == "Landing.js")
  {
    return (<div>
        <LandingItem />
      </div>
    );
  }

  if (location == "Metrics.js")
  {
    return (<div>
        <MetricsItem />
      </div>
    );
  }

  return (<div>
      <LandingItem />
    </div>
  );

}
export default connect(
	(state) =>{
				return {
					location : state.location
				}
	}
)(App);
