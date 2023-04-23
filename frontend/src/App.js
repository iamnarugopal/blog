import { Routes, Route } from "react-router-dom";
import Home from "./view/home";
import Header from "./component/common/header";
import Footer from "./component/common/footer";

const App = () => {
  return (
    <>
      <div className="bg-slate-900 flex flex-col h-full">
        <Header />
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
