import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types'
import Ticket from './Ticket/Ticket';
import './Content.css'

const Content = (props) => {
    const { viewTickets, cheapTickets, noTrasfer, oneTransfer, twoTransfer, threeTransfer, cleanTickets, fastTickets, optimalTickets } = props
    const tickets = viewTickets.map(ticket => {
        const { carrier, price, segments } = ticket
        const [ there, back ] = segments
        return <Ticket carrier={carrier} price={price} there={there} back={back} key={Math.random()} />
    })
    const [counter, setCounter] = useState(5)
    const content = viewTickets.length !== 0 ? tickets.slice(0, counter) : <h2>Настройте фильтр по пересадкам</h2>
    useEffect(() => {
        if(!noTrasfer && !oneTransfer && !twoTransfer && !threeTransfer) cleanTickets()
    }, [noTrasfer, oneTransfer, twoTransfer, threeTransfer, cleanTickets])
    const showMoreButton = viewTickets.length !== 0 
        ? <button type ='button' className='content__show-more' onClick={ () => setCounter(prevValue => prevValue + 5)}>Показать еще пять билетов</button> 
        : null
    return (
        <div className='app__content'>
            <div className='content__filter'>
                <button type='button' className='filter__button' onClick={ cheapTickets }>САМЫЙ ДЕШЕВЫЙ</button>
                <button type='button' className='filter__button' onClick={ fastTickets }>САМЫЙ БЫСТРЫЙ</button>
                <button type='button' className='filter__button' onClick={ optimalTickets }>ОПТИМАЛЬНЫЙ</button>
            </div>
            {content}
            {showMoreButton}
        </div>
    )
}

Content.propTypes = {
    viewTickets: PropTypes.instanceOf(Array).isRequired, 
    cheapTickets: PropTypes.func.isRequired, 
    noTrasfer: PropTypes.bool.isRequired, 
    oneTransfer: PropTypes.bool.isRequired, 
    twoTransfer: PropTypes.bool.isRequired, 
    threeTransfer: PropTypes.bool.isRequired, 
    cleanTickets: PropTypes.func.isRequired, 
    fastTickets: PropTypes.func.isRequired, 
    optimalTickets: PropTypes.func.isRequired
}

export default Content