import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types'
import Content from '../Content/Content';
import Navigation from '../Navigation/Navigation';
import logo from '../../img/Logo.png'
import './App.css'


const App = (props) => {
    const {tickets, userID, getAllTickets } = props
    useEffect(() => {
        if(userID) {
            getAllTickets(userID)
        }
    }, [tickets, getAllTickets, userID])
    return (
        <BrowserRouter>
            <div className='app'>
                <img src={logo} className='app__logo' alt='aviaSales-logo' />
                <div className='app__wrapper'>
                    <Navigation { ...props } />
                    <Content { ...props } />
                </div>
            </div>
        </BrowserRouter>
    )
}

App.defaultProps = {
    userID: null
}

App.propTypes = {
    tickets: PropTypes.instanceOf(Array).isRequired, 
    userID: PropTypes.string,
    getAllTickets: PropTypes.func.isRequired
}

export default App