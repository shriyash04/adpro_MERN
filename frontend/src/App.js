import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./components/Login";
import Landing from "./components/shared/Landing";
import Dashboard from "./components/dasboard/Dashboard";
import Employees from "./components/masters/Employees";
import Clients from "./components/masters/Clients";
import Radios from "./components/masters/Radios";
import Holidays from "./components/masters/Holidays";
import TaxPlannings from "./components/masters/TaxPlannings";
import Newspapers from "./components/masters/Newspapers";
import InvoiceForm from "./components/invoices/InvoiceForm";
import InvoicesList from "./components/invoices/InvoicesList";
import RoList from "./components/pmedia/RoList";
import RoForm from "./components/pmedia/RoForm";






function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Login />} />

          
          <Route path="user" element={<Landing />}>
        
            <Route path='' element={<Dashboard />}></Route>
            <Route path='dashboard' element={<Dashboard />}></Route>
            <Route path='master/employees' element={<Employees />}></Route>
            <Route path='master/clients' element={<Clients />}></Route>
            <Route path='master/radios' element={<Radios />}></Route>
            <Route path='master/newspapers' element={<Newspapers />}/>
            <Route path='master/holidays' element={<Holidays />}/>
            <Route path='master/tax_plannings' element={<TaxPlannings />}/>
            <Route path="InvoicesList" element={<InvoicesList/>}></Route>
            <Route path='InvoicesList/InvoiceForm' element={<InvoiceForm />}/>
            <Route path='P-media/ro-list' element={<RoList />}/>
            <Route path='P-media/ro-list/ro-form' element={<RoForm />}/>


            

          </Route>
        </Routes>
      </BrowserRouter>

      
        
     
    </div>
  );
}

export default App;
