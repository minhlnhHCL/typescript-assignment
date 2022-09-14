import { renderWithRedux } from "test-util"
import UserList from "components/User/UserList"
import { useNavigate } from "react-router-dom"
import { cleanup, waitFor } from '@testing-library/react'
import { get } from "utils/api-requests"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { getUsers } from "store/userSlice"

const sampleUsers = [{
    id: 1,
    firstName: "Minh",
    lastName: "Luong",
    image: 'https://robohash.org/hicveldicta.png',
    age: 25,
    company: {
        title: "Front End Engineer",
    },
}, {
    id: 2,
    firstName: "Min",
    lastName: "Min",
    image: 'https://robohash.org/hicveldicta.png',
    age: 21,
    company: {
        title: "IT Help Desk",
    },
}]


jest.mock('utils/api-requests')

jest.mock("store/hooks", () => ({
    ...jest.requireActual("react-redux"),
    useAppSelector: jest.fn(),
    useAppDispatch: jest.fn(),
}))

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}))

describe('User List', () => {
    beforeEach(() => {
        (useAppDispatch as jest.Mock).mockReturnValue(() => jest.fn());
        (useNavigate as jest.Mock).mockReturnValue(() => { });
        (useAppSelector as jest.Mock).mockReturnValue(() => { });
        (get as jest.Mock).mockResolvedValue({
            data: {
                users: []
            }
        });
    })

    afterAll(cleanup)

    it('should run its side effect', async () => {
        const onLoading = jest.fn();
        const offLoading = jest.fn();
        (useAppSelector as jest.Mock).mockReturnValue({
            users: []
        });
        (get as jest.Mock).mockResolvedValueOnce({
            data: {
                users: sampleUsers
            }
        });
        const { container, store } = renderWithRedux(<UserList />, { offLoading, onLoading });
        expect(get).toBeCalled();
        await waitFor(() => expect(onLoading).toBeCalled());
        expect(useAppDispatch).toBeCalled();
        store.dispatch(getUsers(sampleUsers))
        await waitFor(() => expect(offLoading).toBeCalled());
        const data = store.getState().users.users
        expect(data).toEqual(sampleUsers);
        expect(container).toMatchSnapshot();

    })
})