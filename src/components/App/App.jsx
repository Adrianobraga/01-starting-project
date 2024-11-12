
import Header from "../Header/Header.jsx";
import Shop from "../Shop/Shop.jsx";
import  StoreContextProvider from "../Context/Context.jsx";
function App() {

  return (
    <>
      <StoreContextProvider>
        <Header />
        <Shop />
      </StoreContextProvider>
    </>
  );
}

export default App;
