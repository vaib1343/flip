import { useState } from "react";
import "./App.scss";

function App() {
    const [state, setState] = useState("small");
    const getRect = (el) => {
        return el.getBoundingClientRect();
    };
    const flip = (doSomething, firstEl, getLastEl = () => firstEl) => {
        const firstRect = getRect(firstEl);

        doSomething();
        requestAnimationFrame(() => {
            const lastEl = getLastEl();
            const lastRect = getRect(lastEl);
            const dx = lastRect.x - firstRect.x;
            const dy = lastRect.y - firstRect.y;
            const dw = lastRect.width / firstRect.width;
            const dh = lastRect.height / firstRect.height;

            lastEl.dataset.flipping = true;

            lastEl.style.setProperty("--dx", dx);
            lastEl.style.setProperty("--dy", dy);
            lastEl.style.setProperty("--dh", dh);
            lastEl.style.setProperty("--dw", dw);

            // setTimeout(() => {
            //     delete lastEl.dataset.flipping;
            // }, 2000);

            requestAnimationFrame(() => {
                delete lastEl.dataset.flipping;
            });
        });
    };
    const handleClick = () => {
        // setExpand(!expand);
        const notificationEl = document.getElementById("notification");
        flip(() => {
            const newState = state === "small" ? "large" : "small";
            setState(newState);
        }, notificationEl);
    };
    return (
        <div className="App" id="app" data-state={state}>
            <div
                id="notification"
                className="notification"
                onClick={handleClick}
            >
                <div className="bg" />
                You have a notification
                <p>
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                    from 45 BC, making it over 2000 years old. Richard
                    McClintock, a Latin professor at Hampden-Sydney College in
                    Virginia, looked up one of the more obscure Latin words,
                    consectetur, from a Lorem Ipsum passage, and going through
                    the cites of the word in classical literature, discovered
                    the undoubtable source. Lorem Ipsum comes from sections
                    1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The
                    Extremes of Good and Evil) by Cicero, written in 45 BC. This
                    book is a treatise on the theory of ethics, very popular
                    during the Renaissance. The first line of Lorem Ipsum,
                    "Lorem ipsum dolor sit amet..", comes from a line in section
                    1.10.32.
                </p>
            </div>
            {/* <div
                id="notification"
                className="notification"
                data-flip="false"
                data-expand={expand}
                onClick={() => handleClick()}
            >
                <h5>You have a Notification</h5>
                
            </div> */}
        </div>
    );
}

export default App;
