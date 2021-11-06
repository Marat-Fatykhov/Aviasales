import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux';
import { getUser, getAllTickets, allTicketsCheck, noTrasferCheck, oneTransferCheck, optimalTickets,
twoTransferCheck, threeTransferCheck, cheapTickets, cleanTickets, fastTickets } from '../../redux/app-reducer';
import App from './App';

const AppContainer = ({ getUser, ...props }) => {
    
    useEffect(() => {
        getUser()
    }, [getUser])
    
    return (
        <App { ...props } />
    )
}

const mapStatetoProps = (state) => {
    const { tickets, userID, viewTickets, all, noTrasfer, oneTransfer, twoTransfer, threeTransfer } = state.app
    return {
        tickets,
        userID,
        viewTickets,
        all,
        noTrasfer,
        oneTransfer,
        twoTransfer,
        threeTransfer,
    }
}

AppContainer.propTypes = {
    getUser: PropTypes.func.isRequired
}

export default connect(mapStatetoProps, {getUser, getAllTickets, allTicketsCheck, noTrasferCheck, optimalTickets,
    oneTransferCheck, twoTransferCheck, threeTransferCheck, cheapTickets, cleanTickets, fastTickets })(AppContainer)