import React from 'react';
import { PropTypes } from 'prop-types'
import { Checkbox } from 'antd';
import './Navigation.css'

const Navigation = (props) => {
    const { allTicketsCheck, noTrasfer, oneTransfer, twoTransfer, threeTransfer, 
    noTrasferCheck, oneTransferCheck, twoTransferCheck, threeTransferCheck } = props
    
    return (
        <div className='app__navigation'>
            <h5>КОЛИЧЕСТВО ПЕРЕСАДОК</h5>
            <Checkbox checked={(noTrasfer && oneTransfer && twoTransfer && threeTransfer)} 
            onChange={ (event) => allTicketsCheck(event.target.checked)} className='navigation__checkbox'>
                Все
            </Checkbox>
            <Checkbox checked={noTrasfer} onChange={ (event) => noTrasferCheck(event.target.checked) } className='navigation__checkbox'>Без пересадок</Checkbox>
            <Checkbox checked={oneTransfer} onChange={ (event) => oneTransferCheck(event.target.checked) } className='navigation__checkbox'>1 пересадка</Checkbox>
            <Checkbox checked={twoTransfer} onChange={ (event) => twoTransferCheck(event.target.checked) } className='navigation__checkbox'>2 пересадки</Checkbox>
            <Checkbox checked={threeTransfer} onChange={ (event) => threeTransferCheck(event.target.checked) } className='navigation__checkbox'>3 пересадки</Checkbox>
        </div>
    )
}

Navigation.propTypes = {
    allTicketsCheck: PropTypes.func.isRequired, 
    noTrasfer: PropTypes.bool.isRequired, 
    oneTransfer: PropTypes.bool.isRequired, 
    twoTransfer: PropTypes.bool.isRequired, 
    threeTransfer: PropTypes.bool.isRequired, 
    noTrasferCheck: PropTypes.func.isRequired, 
    oneTransferCheck: PropTypes.func.isRequired, 
    twoTransferCheck: PropTypes.func.isRequired, 
    threeTransferCheck: PropTypes.func.isRequired
}

export default Navigation