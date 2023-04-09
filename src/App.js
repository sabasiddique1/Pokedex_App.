// import React from "react";
// import "./App.css";
// import Footer from "./sections/Footer/footer";
// // import Wrapper from "./sections/Wrapper/wrapper";
// import Background from "./components/Background/background";
// import { BrowserRouter, Route, Switch } from "react-router-dom";
// import Search from "./pages/Search/search";
// import Favorites from "./pages/Favorites/favorite";
// import Pokemon from "./pages/Pokemon/pokemon";
// import Navbar from "./sections/NavBar/navBar";
// // import Experiment from "./experiment/experiment";

// function App() {
//   return (
//     <>
//       <div className="main-container">
//         <Background />
//         {/* <Experiment/> */}
//       </div>
//       <div className="app">
//         <BrowserRouter>
//           <Switch>
//             <Route exact path="/">
//               <Navbar />
//               <Search />
//             </Route>
//             <Route exact path="/pokemon/:pokemon">
//               <Pokemon />
//             </Route>
//             <Route exact path="/favorites">
//               <Favorites />
//             </Route>
//           </Switch>
//           {/* <Footer/> */}
//         </BrowserRouter>
//       </div>
//     </>
//   );
// }

// export default App;

import React from "react";
import "./App.css";
// import Background from "./components/Background/background";
import { BrowserRouter, Route } from "react-router-dom";
import Wrapper from "./sections/Wrapper/wrapper";
import Search from "./pages/Search/search";
import Pokemon from "./pages/Pokemon/pokemon";
import Favorites from "./pages/Favorites/favorite";
import Footer from "./sections/Footer/footer";
function App() {
  return (
    <>
      <div className="main-container"></div>
      <div className="app">
        <BrowserRouter>
          <Wrapper className="wrapper">
            <Route exact path="/">
              <Search />
            </Route>
            <Route exact path="/pokemon/:pokemon">
              <Pokemon />
            </Route>
            <Route exact path="/favorites">
              <Favorites />
            </Route>
          </Wrapper>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
