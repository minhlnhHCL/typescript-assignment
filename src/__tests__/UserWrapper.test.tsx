import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import '@testing-library/jest-dom'
import { IUser } from "components/User/UserInterface"
import UserWrapper from "components/User/UserWrapper/UserWrapper"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { renderWithRedux } from "test-util"
import { deleteReq } from "utils/api-requests"
import Modal from 'components/common/Modal/Modal'

jest.mock("store/hooks", () => ({
    ...jest.requireActual("react-redux"),
    useAppSelector: jest.fn(),
    useAppDispatch: jest.fn(),
}))

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
    useParams: jest.fn()
}))

jest.mock('utils/api-requests')

const editUserData: IUser = {
    id: 1,
    firstName: "Minh",
    lastName: "Luong",
    image: 'https://robohash.org/hicveldicta.png',
    age: 25,
    company: {
        title: "Front End Engineer",
    },
}

describe('User Wrapper', () => {
    beforeEach(() => {
        (useAppDispatch as jest.Mock).mockImplementationOnce(() => jest.fn());
        (useNavigate as jest.Mock).mockReturnValue(() => { });
        (useAppSelector as jest.Mock).mockImplementation(() => { });
    });

    it('should render user info', async () => {
        const { getByText } = renderWithRedux(<UserWrapper data={editUserData} />);
        expect(getByText('Front End Engineer')).toBeInTheDocument();
    })


    it('should delete selected user', async () => {
        const onLoading = jest.fn();
        const offLoading = jest.fn();
        const successCb = jest.fn();
        (deleteReq as jest.Mock).mockResolvedValue({
            data: editUserData
        });
        (useAppSelector as jest.Mock).mockResolvedValue({
            modal: {
                title: 'Confirmation',
                children: 'Are you sure you want to delete this user ?',
                open: true,
                successCb: successCb
            }
        })
        renderWithRedux(<UserWrapper data={editUserData} />, { onLoading, offLoading });
        fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
        expect(useAppDispatch).toBeCalled();
        renderWithRedux(<Modal />);
        fireEvent.click(screen.getByRole('button', { name: 'OK' }));
    });
})