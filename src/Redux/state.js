let initialState = {
    user: {},
    others: [],
    forms: [],
    sentForms: [],
    reload: false
}

export default function appReducer(state = initialState, action) {
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        default:
            return newState
        case 'get_data':
            const { user, others } = action.payload
            newState.user = user
            newState.others = others
            return newState
        case 'get_forms':
            newState.forms = action.payload
            return newState
        case 'done':
            newState.reload = true
            return newState
        case 'reloaded':
            newState.reload = false
            return newState
        case 'get_sent_forms':
            newState.sentForms = action.payload
            return newState
        case 'logout':
            newState.user = {}
            newState.others = []
            newState.forms = []
            newState.sentForms = []
            newState.reload = false
            return newState
    }
}