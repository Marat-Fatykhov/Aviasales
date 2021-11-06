import axios from "axios";

const instance = axios.create({
    baseURL: 'https://front-test.beta.aviasales.ru/',
    headers: {
        'Content-Type': 'application/json'
    }
})

const api = {
    getUserID: () => instance.get('search'),
    getTickets: (id) => instance.get(`tickets?searchId=${id}`)
}

export default api