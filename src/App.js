import React from "react";
import Main from "./components/Main";

export const MessageContext = React.createContext();


function App(props) {
  return (
    <div>
      <Main />
    </div>
  );
}
export default App;