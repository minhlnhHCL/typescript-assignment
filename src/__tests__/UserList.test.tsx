import { renderWithRedux } from "test-util"
import UserList from "components/User/UserList"
import { useNavigate } from "react-router-dom"
import { cleanup, waitFor } from '@testing-library/react'
import { baseUrl, get } from "utils/api-requests"
import { useAppDispatch, useAppSelector } from "store/hooks"
import type { AppDispatch } from 'store/index'
import { useDispatch } from "react-redux"

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
        title: "Front End Engineer",
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
        (useAppDispatch as jest.Mock).mockImplementationOnce(() => jest.fn());
        (useNavigate as jest.Mock).mockReturnValue(() => { });
        (useAppSelector as jest.Mock).mockImplementation(() => { });
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
        const { container } = renderWithRedux(<UserList />, { offLoading, onLoading });
        expect(get).toBeCalled();
        await waitFor(() => expect(onLoading).toBeCalled());
        expect(useAppDispatch).toBeCalled();

        await waitFor(() => expect(offLoading).toBeCalled());
        expect(container).toMatchSnapshot();

    })
})