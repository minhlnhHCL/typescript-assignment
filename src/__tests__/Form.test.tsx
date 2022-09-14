import Form from "components/Form/Form"
import {
    cleanup,
    fireEvent,
    screen,
    waitFor
} from "@testing-library/react"
import "@testing-library/jest-dom"
import { useNavigate, useParams } from "react-router-dom"
import { renderWithRedux } from "test-util"
import { get, post, put } from "utils/api-requests"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { IUser } from "components/User/UserInterface"
import { addUser, editUser, getUsers } from "store/userSlice"

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


const addUserData: IUser = {
    firstName: "Bi",
    lastName: "Bi",
    image: 'https://robohash.org/hicveldicta.png',
    age: 0,
    company: {
        title: "Front End Engineer",
    },
}

const sampleUsers: IUser[] = [{
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

const sampleEditUser: IUser[] = [{
    id: 1,
    firstName: "Ter",
    lastName: "Med",
    image: 'https://robohash.org/hicveldicta.png',
    age: 25,
    company: {
        title: "IT Help Desk",
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

describe("User Form", () => {
    beforeEach(() => {
        (useAppDispatch as jest.Mock).mockImplementationOnce(() => jest.fn());
        (useNavigate as jest.Mock).mockReturnValue(() => { });
        (useAppSelector as jest.Mock).mockImplementation(() => { });
    })

    afterAll(cleanup);

    it("should display an empty form", async () => {
        (useParams as jest.Mock).mockReturnValue({ userId: null });
        (useAppSelector as jest.Mock).mockReturnValue({
            users: []
        });
        const { container } = renderWithRedux(<Form />);
        expect(container).toMatchSnapshot();
    })

    it("should add a new user", async () => {
        (useParams as jest.Mock).mockReturnValue({ userId: null });
        (useAppSelector as jest.Mock).mockReturnValue({
            users: [],
        });

        const onLoading = jest.fn();
        const offLoading = jest.fn();
        const navigate = jest.fn();
        const newInput = {
            ...addUserData,
            id: 31
        };
        (useNavigate as jest.Mock).mockReturnValue(navigate);
        (post as jest.Mock).mockResolvedValue({
            data: newInput
        });

        const { store } = renderWithRedux(<Form />, { onLoading, offLoading });

        fireEvent.change(screen.getByLabelText('First Name'), {
            target: { value: newInput.firstName, name: 'firstName' }
        });

        fireEvent.change(screen.getByLabelText('Last Name'), {
            target: { value: newInput.lastName, name: 'lastName' }
        });

        fireEvent.change(screen.getByLabelText('Company Title'), {
            target: { value: newInput.company?.title, name: 'companyTitle' }
        });

        expect(screen.getByRole('button', { name: 'submit' }));
        fireEvent.click(screen.getByRole('button', { name: 'submit' }));
        await waitFor(() => expect(onLoading).toBeCalled());
        expect(post).toBeCalled();
        expect(post).toBeCalledWith({ url: '/add', body: newInput });
        await waitFor(() => expect(offLoading).toBeCalled());
        expect(useAppDispatch).toBeCalled();
        store.dispatch(addUser(newInput))
        const data = store.getState().users.users
        expect(data).toEqual([newInput])

    });

    it("should submit edit user", async () => {
        (useParams as jest.Mock).mockReturnValue({ userId: '1' });
        (useAppSelector as jest.Mock).mockReturnValue({
            users: sampleUsers
        });

        const onLoading = jest.fn();
        const offLoading = jest.fn();
        const navigate = jest.fn();
        const newInput = {
            ...editUserData,
            firstName: 'Ter',
            lastName: 'Med',
            company: {
                title: 'IT Help Desk'
            }
        };

        (get as jest.Mock).mockResolvedValueOnce({
            data: editUserData
        });

        (put as jest.Mock).mockResolvedValue({
            data: newInput
        });

        (useNavigate as jest.Mock).mockReturnValue(navigate);


        const { store } = renderWithRedux(<Form />, { onLoading, offLoading });
        store.dispatch(getUsers(sampleUsers))
        await waitFor(() => expect(onLoading).toBeCalled());
        expect(get).toBeCalled();
        expect(get).toBeCalledWith({ url: `/${editUserData.id}` });
        await waitFor(() => expect(offLoading).toBeCalled());
        fireEvent.change(screen.getByLabelText('First Name'), {
            target: { value: newInput.firstName, name: 'firstName' }
        });

        fireEvent.change(screen.getByLabelText('Last Name'), {
            target: { value: newInput.lastName, name: 'lastName' }
        });

        fireEvent.change(screen.getByLabelText('Company Title'), {
            target: { value: newInput.company.title, name: 'companyTitle' }
        });

        fireEvent.click(screen.getByRole('button', { name: 'submit' }));
        await waitFor(() => expect(onLoading).toBeCalled());
        expect(put).toBeCalled();
        expect(put).toBeCalledWith({ url: `/${newInput.id}`, body: newInput });
        await waitFor(() => expect(offLoading).toBeCalled());
        expect(useAppDispatch).toBeCalled();
        store.dispatch(editUser(newInput));
        const data = store.getState().users.users;
        expect(data).toEqual(sampleEditUser)
    })
})
