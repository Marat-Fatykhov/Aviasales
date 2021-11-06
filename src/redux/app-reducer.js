import api from '../api/api'

const SET_USER_ID = 'SET_USER_ID'
const SET_TICKETS = 'SET_TICKETS'
const ALL_TICKETS_CHECK = 'ALL_TICKETS_CHECK'
const NO_TRANSFER_CHECK = 'NO_TRANSFER_CHECK'
const ONE_TRANSFER_CHECK = 'ONE_TRANSFER_CHECK'
const TWO_TRANSFER_CHECK = 'TWO_TRANSFER_CHECK'
const THREE_TRANSFER_CHECK = 'THREE_TRANSFER_CHECK'
const CHEAP_TICKETS = 'CHEAP_TEACKETS'
const CLEAN_TICKETS = 'CLEAN_TICKETS'
const FAST_TICKETS = 'FAST_TICKETS'
const OPTIMAL_TICKETS = 'OPTIMAL_TICKETS'

const initialState = {
    userID: null,
    tickets: [],
    viewTickets: [],
    all: false,
    noTrasfer: false,
    oneTransfer: false,
    twoTransfer: false,
    threeTransfer: false
}

const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER_ID:
            return { ...state, userID: action.id }
        case SET_TICKETS:
            return { ...state, tickets: [ ...state.tickets, ...action.data ] }
        case ALL_TICKETS_CHECK:
            return { ...state, viewTickets: action.active ? state.tickets : [], 
                all: !state.all, 
                noTrasfer: !state.noTrasfer,
                oneTransfer: !state.oneTransfer,
                twoTransfer: !state.twoTransfer,
                threeTransfer: !state.threeTransfer }
        case NO_TRANSFER_CHECK:
            return { ...state, viewTickets: [ ...state.viewTickets, action.active 
                ? state.tickets.filter(ticket => {
                    const [ there, back ] = ticket.segments
                    if(there.stops.length === 0 && back.stops.length === 0) {
                        return true
                    }
                    return false
                }) 
                : [] ].flat(), noTrasfer: !state.noTrasfer }
        case ONE_TRANSFER_CHECK:
            return { ...state, viewTickets: [ ...state.viewTickets, action.active ? state.tickets.filter(ticket => {
                const [ there, back ] = ticket.segments
                if(there.stops.length === 1 && back.stops.length === 1) {
                    return true
                }
                return false
            }) : [] ].flat(), oneTransfer: !state.oneTransfer }
        case TWO_TRANSFER_CHECK:
            return { ...state, viewTickets: [ ...state.viewTickets, action.active ? state.tickets.filter(ticket => {
                const [ there, back ] = ticket.segments
                if(there.stops.length === 2 && back.stops.length === 2) {
                    return true
                }
                return false
            }) : [] ].flat(), twoTransfer: !state.twoTransfer }
        case THREE_TRANSFER_CHECK:
            return { ...state, viewTickets: [ ...state.viewTickets, action.active ? state.tickets.filter(ticket => {
                const [ there, back ] = ticket.segments
                if(there.stops.length === 3 && back.stops.length === 3) {
                    return true
                }
                return false
            }) : [] ].flat(), threeTransfer: action.active }
        case CHEAP_TICKETS:
            return { ...state, viewTickets: [...state.viewTickets.sort((prev, next) => prev.price > next.price ? 1 : -1)] }
        case FAST_TICKETS:
            return { ...state, viewTickets: [...state.viewTickets.sort((prev, next) => {
                const [ aThere, aBack ] = prev.segments
                const [ bThere, bBack ] = next.segments
                const prevValue = aThere.duration + aBack.duration
                const nextValue = bThere.duration + bBack.duration
                return prevValue > nextValue ? 1 : -1
            })] }
        case OPTIMAL_TICKETS:
            return { ...state, viewTickets: [...state.viewTickets.sort((prev, next) => {
                const [ aThere, aBack ] = prev.segments
                const [ bThere, bBack ] = next.segments
                const prevValue = aThere.duration + aBack.duration + prev.price
                const nextValue = bThere.duration + bBack.duration + next.price
                return prevValue > nextValue ? 1 : -1
            })] }
        case CLEAN_TICKETS:
            return { ...state, viewTickets: [] }
        default:
            return state
    }
}

export const getUser = () => (dispatch) => {
    const { getUserID } = api
    getUserID()
        .then(response => {
            dispatch(setUserId(response.data.searchId))
        })
}

export const getAllTickets = (id) => (dispatch) => {
    const { getTickets } = api
    getTickets(id)
        .then(response => {
            const { stop, tickets } = response.data
            if(!stop) {
                dispatch(setTickets(tickets))
            } 
        })        
        .catch(error => { 
            if(error.response.status === 500) dispatch(setTickets([])) 
        })
}

const setUserId = (id) => ({
    type: SET_USER_ID,
    id
})

const setTickets = (data) => ({
    type: SET_TICKETS,
    data
})

export const allTicketsCheck = (active) => ({
    type: ALL_TICKETS_CHECK,
    active
})

export const noTrasferCheck = (active) => ({
    type: NO_TRANSFER_CHECK,
    active
})

export const oneTransferCheck = (active) => ({
    type: ONE_TRANSFER_CHECK,
    active
})

export const twoTransferCheck = (active) => ({
    type: TWO_TRANSFER_CHECK,
    active
})

export const threeTransferCheck = (active) => ({
    type: THREE_TRANSFER_CHECK,
    active
})

export const cheapTickets = () => ({
    type: CHEAP_TICKETS
})

export const fastTickets = () => ({
    type: FAST_TICKETS
})

export const optimalTickets = () => ({
    type: OPTIMAL_TICKETS
})

export const cleanTickets = () => ({
    type: CLEAN_TICKETS
})

export default appReducer