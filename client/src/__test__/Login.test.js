import { render, screen, cleanup } from "@testing-library/react";
import { ReactDOM } from "react";
import { Provider } from "react-redux";
import { Login } from "../components/authentication/Login";
import store from "../store/index"

test("should render Login component", () => {
    ReactDOM.render(
        (<Provider store={store}>
            <Login/>
        </Provider>),
         document.getElementById('root') || document.createElement('div') // for testing purposes
    );
    const loginWord = screen.getAllByText(/login/i);
    expect(loginWord).toBeInTheDocument();
});