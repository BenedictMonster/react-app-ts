import base64 from "base-64";
import logo from "./logo.svg";
import "./App.css";

function callApi() {
  console.log("Page!!!!");
  const response = fetch(
    "http://alb-redate-2125372616.ap-northeast-2.elb.amazonaws.com/health-check/"
  )
    // the JSON body is taken from the response
    .then((res) => res.json())
    .then((res) => {
      // The response has an `any` type, so we need to cast
      // it to the `User` type, and return it from the promise
      return res;
    });
  response.then((res) => console.log(res));
}

function getToken() {
  console.log("getToken!!!!");
  const payload = {
    username: "admin",
    password: "4321rewq",
  };
  const response = fetch(
    "http://alb-redate-2125372616.ap-northeast-2.elb.amazonaws.com/auth/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  )
    // the JSON body is taken from the response
    .then((res) => res.json())
    .then((res) => {
      // The response has an `any` type, so we need to cast
      // it to the `User` type, and return it from the promise
      let accessPayload = res.refresh.substring(
        res.refresh.indexOf(".") + 1,
        res.refresh.lastIndexOf(".")
      );
      let accessDecrypted = base64.decode(accessPayload);
      console.log(accessDecrypted);

      let refreshPayload = res.refresh.substring(
        res.refresh.indexOf(".") + 1,
        res.refresh.lastIndexOf(".")
      );
      let refrechDecrypted = base64.decode(refreshPayload);
      console.log(refrechDecrypted);
      return res;
    });
  response.then((res) => console.log(res));
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={callApi}>Call API</button>
        <button onClick={getToken}>getToken</button>
      </header>
    </div>
  );
}

export default App;
