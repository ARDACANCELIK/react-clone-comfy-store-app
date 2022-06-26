import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";//bunlar tüm sayfalarda oluyor bunları Router içine yerleştiriyoruz 

//2 sürekli import About from abut , import cartPage from CarT PAGE, import home from home page diye yazacağımıza hepsini index diye pages içinde yeni bir yere yazıp toptan import ediyoruz
import {
  Home,
  SingleProduct,
  Cart,
  Checkout,
  Error,
  About,
  Products,
  PrivateRoute,
} from "./pages";
//END OF 2
//3 - App içine yerleştiriliyor  Navbar,Sidebar ve Footer Switch dışında onlara dikkat - şimdi navbar.js e gidiyoruz navbarı yapmaya bu bölüm bitince (component dosyasında)
function App() {
  // return (
  //   <Router>
  //     <Navbar />
  //     <Sidebar />
  //     <Switch>
  //       <Route exact path="/">
  //         <Home />
  //       </Route>
  //       <Route exact path="/about">
  //         <About />
  //       </Route>
  //       <Route exact path="/cart">
  //         <Cart />
  //       </Route>
  //       <Route exact path="/products">
  //         <Products />
  //       </Route>
  //       <Route exact path="/products/:id" children={<SingleProduct />} />
  //       {/* //158 Route u private Route yaptı ardından private route a git   */}
  //       <PrivateRoute exact path="/checkout">
  //         <Checkout />
  //       </PrivateRoute>
  //       <Route path="*">
  //         <Error />
  //       </Route>
  //     </Switch>
  //     <Footer />
  //   </Router>
  // );

  //Final 1 ardından private routea git 
  return (
    <Router>
      <Navbar/>
      <Sidebar/>
      <Routes>
        <Route path="/" element ={<Home/>}/>
        <Route path="/about" element ={<About/>}/>
        <Route path="/cart" element ={<Cart/>}/>
        <Route path="/products" element ={<Products/>}/>
        <Route path="/products/:id" element ={<SingleProduct/>}/>
        <Route path="/checkout" element ={<PrivateRoute>
          <Checkout/>
        </PrivateRoute>}/>
        <Route path="*" element ={<Error/>}/>
      </Routes>
      <Footer/>
    </Router>


  )
}

export default App;
