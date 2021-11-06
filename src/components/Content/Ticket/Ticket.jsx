import React from 'react';
import { PropTypes } from 'prop-types'
import './Ticket.css'

const Ticket = (props) => {
    if (props !== {}) {
        const { carrier, price, there, back } = props
        const { origin: thereOrigin, destination: thereDestination, stops: thereStops,
            date: thereDate, duration: thereDuration } = there
        const { origin: backOrigin, destination: backDestination, stops: backStops,
            date: backDate, duration: backDuration } = back
        const finishThereTime = thereDate.slice(11, 16).split(':')
        const [ thereTimeHours, thereTimeMin ] = finishThereTime
        const thereHours = Number(thereTimeHours) + (thereDuration / 60)
        const thereMin = Number(thereTimeMin) + (thereDuration % 60)
        const finishBackTime = backDate.slice(11, 16).split(':')
        const [ backTimeHours, backTimeMin ] = finishBackTime
        const backHours = Number(backTimeHours) + (backDuration / 60)
        const backMin = Number(backTimeMin) + (backDuration % 60)
        return (
            <div className='content__ticket'>
                <div className='ticket__wrapper'>
                    <h3 className='price__price'>{`${price} P`}</h3>
                    <img src={`https://pics.avs.io/99/36/${carrier}.png`} alt='avia-logo' />
                </div>
                <div className='ticket__wrapper'>
                    <div className='wrapper__wrapper'>
                        <p className='wrapper__title'>{`${thereOrigin} - ${thereDestination}`}</p>
                        <div className='wrapper__margin'>{`${thereDate.slice(11, 16)} - ${Math.ceil(thereHours % 24)}:${thereMin % 60}`}</div>
                        <p className='wrapper__title'>{`${backOrigin} - ${backDestination}`}</p>
                        <div>{`${backDate.slice(11, 16)} - ${Math.ceil(backHours % 24)}:${backMin % 60}`}</div>
                    </div>
                    <div className='wrapper__wrapper'>
                        <p className='wrapper__title'>В ПУТИ</p>
                        <div className='wrapper__margin'>{`${Math.ceil(thereDuration / 60)}ч ${thereDuration % 60}м`}</div>
                        <p className='wrapper__title'>В ПУТИ</p>
                        <div>{`${Math.ceil(backDuration / 60)}ч ${backDuration % 60}м`}</div>
                    </div>
                    <div className='wrapper__wrapper'>
                        <p className='wrapper__title'>{`${thereStops.length} Пересадок`}</p>
                        <div className='wrapper__margin'>{thereStops.join()}</div>
                        <p className='wrapper__title'>{`${backStops.length} Пересадок`}</p>
                        <div>{backStops.join()}</div>
                    </div>
                </div>

            </div>
        )
    } else {
        return <div></div>
    }
}

Ticket.propTypes = {
    carrier: PropTypes.string.isRequired, 
    price: PropTypes.number.isRequired, 
    there: PropTypes.instanceOf(Object).isRequired, 
    back: PropTypes.instanceOf(Object).isRequired,
}

export default Ticket