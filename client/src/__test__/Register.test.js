import React from 'react';
import ReactDOM from 'react';
// import { Provider } from 'react-redux';
// import configureStore from 'redux-mock-store';
//import {
//    checkName,
//    checkEmail,
//    checkPassword,
//} from "../components/authentication/FormValidation";
import { Register } from "../components/authentication/Register";
//import { render as rtlRender, screen } from "@testing-library/react";
import { reducer, screen } from '../test-utils';


describe("Test the Register component", () => {

    const render = (component) => rtlRender(
        <Provider store={store}>
            {component}
        </Provider>
    );

    const initialState = { output: false }
    const mockStore = configureStore();
    let store;

    let signUpButton;
    beforeEach(() => {
        store = mockStore(initialState);
        ReactDOM.render(
            <Provider store={store}>
                <Register />
            </Provider>
        ),
            document.getElementById("root") || document.createElement('div');
    });

    test("The SUBMIT button should be in the document", () => {
        let signUpButton = screen.getByRole("button", { name: /SUBMIT/i });
        expect(signUpButton).toBeInTheDocument();
    });

    //test("Should fail on invalid username", () => {
    //    const name = "na";
    //    expect(checkName(name)).toBe(false);
    //});
    //
    //test("should fail on invalid email", () => {
    //    const email = "email.com";
    //    expect(checkEmail(email)).toBe(false);
    //});
    //
    //test("should fail on invalid password", () => {
    //    const password = "passwo";
    //    expect(checkPassword(password)).toBe(false);
    //});

    test("test the button component", async () => {
        store = mockStore(initialState);
        ReactDOM.render(
            <Provider store={store}>
                <Register />
            </Provider>
        ),
            document.getElementById("root") || document.createElement('div');
        const buttonList = await screen.findAllByRole("button");
        expect(buttonList).toHaveLength(1);
    });
});