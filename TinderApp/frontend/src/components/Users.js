import React, { Component, PropTypes } from 'react'
import  {connect } from 'react-redux'
import {bindGoToLandingToDispatch} from '../actions/generalActions'
export const UsersItem = ({goToLanding, mostPopularColor, mostPopularManufacturer, averageDescriptionLength, ebayAveragePrice, amazonAveragePrice }) => {
  return  (
      <div>
          <input type="button" defaultValue="Home" onClick={goToLanding} id="LandingLink" />

          <table textAlign="center">
            <tbody>
              <tr>
                <td>Most popular color: </td>
                <td>{mostPopularColor}</td>
              </tr>
              <tr>
                <td>Most popular manufacturer: </td>
                <td>{mostPopularManufacturer}</td>
              </tr>
              <tr>
                <td>Average length (in characters) of a product description: </td>
                <td>{averageDescriptionLength}</td>
              </tr>
              <tr>
                <td>Average price of item on ebay: </td>
                <td>{ebayAveragePrice}</td>
              </tr>
              <tr>
                <td>Average price of item on amazon: </td>
                <td>{amazonAveragePrice}</td>
              </tr>
            </tbody>
          </table>
      </div>

  )
}

  export default connect( (state) =>
                          {
                            return {
                              mostPopularColor: state.mostPopularColor,
                              mostPopularManufacturer: state.mostPopularManufacturer,
                              averageDescriptionLength: state.averageLength.toString(),
                              ebayAveragePrice: state.ebayAveragePrice,
                              amazonAveragePrice: state.amazonAveragePrice
                            }
                          },
    (dispatch, ownProps) => {
          return {
              goToLanding: () => bindGoToLandingToDispatch()(dispatch)
          }
      })(UsersItem)
