import reducer, { addUser, deleteUser, editUser, UserState } from 'store/userSlice'

test('should handle a new user being added to an existed list', () => {
    const previousState: UserState = {
        users: [
            { firstName: 'Run the tests', lastName: '', id: 3213213 }
        ],
    }

    expect(reducer(previousState, addUser({ firstName: 'Run the tests', lastName: '', id: 343 }))).toEqual({
        ...previousState,
        users: [
            { firstName: 'Run the tests', lastName: '', id: 343 },
            { firstName: 'Run the tests', lastName: '', id: 3213213 },
        ]
    })
})

test('should handle a new user being added to an empty list', () => {
    const previousState: UserState = {
        users: [],
    }

    expect(reducer(previousState, addUser({ firstName: 'Run the tests', lastName: '', id: 343 }))).toEqual({
        ...previousState,
        users: [
            { firstName: 'Run the tests', lastName: '', id: 343 }
        ]
    })
})

test('should handle a user being removed from list', () => {
    const previousState: UserState = {
        users: [
            { firstName: 'Run the tests', lastName: '', id: 3213213 }
        ],
    }
    expect(reducer(previousState, deleteUser({ firstName: 'Run the tests', lastName: '', id: 3213213 }))).toEqual({
        ...previousState,
        users: []
    })
})

test('should handle an update from a user in list', () => {
    const previousState: UserState = {
        users: [
            { firstName: 'Master', lastName: '', id: 1 },
            { firstName: 'Run the tests', lastName: '', id: 3213213 }
        ],
    }
    expect(reducer(previousState, editUser({ firstName: 'Testing', lastName: '', id: 3213213 }))).toEqual({
        ...previousState,
        users: [
            { firstName: 'Master', lastName: '', id: 1 },
            { firstName: 'Testing', lastName: '', id: 3213213 }
        ]
    })
})