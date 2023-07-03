import { Navbar } from "./components/Navbar";
import { Homepage } from "./routes/Homepage";
import { Fainas } from "./routes/Fainas";
import { Footer } from "./components/Footer"
import { Home } from "./components/Home";
import { CreateTodo } from "./routes/CreateTodo";
import { EditTodo } from "./routes/EditTodo";
import { unstable_HistoryRouter as HistoryRouter, Routes, Route } from "react-router-dom";
import { Login } from "./routes/Login";
import { Myself } from "./routes/Myself";
import { browserHistory } from "./browserHistory";
import { LoadAuthUser } from "./LoadAuthUser";
import { CreateAccount } from "./routes/CreateAccount";
import { EmailVerificationModal } from "./EmailVerificationModal";
import { UserView } from "./routes/UserView";
import { Resenha } from "./routes/Resenha";

function App() {
 

  return (
    <HistoryRouter history={browserHistory}>
      <Navbar />
      <LoadAuthUser />
      <EmailVerificationModal />
      <main className="flex flex-row justify-center min-h-[80vh] shadow-lg">
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/fainas" element={<Fainas/>} />
          <Route path="/criar-faina" element={<CreateTodo/>} />
          <Route path="/editar-faina/:id" element={<EditTodo/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/criar-conta" element={<CreateAccount/>} />
          <Route path="/usuario" element={<Myself/>} />
          <Route path="/usuarios/:id" element={<UserView/>} />
          <Route path="/resenha" element={<Resenha/>} />
        </Routes>
      </main>
      <Footer />
    </HistoryRouter>
  );
}

export default App;
