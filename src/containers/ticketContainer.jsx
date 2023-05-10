import { Route, Routes } from "react-router-dom";

import TicketList from "../components/ticketComponent/ticketList"
import TicketCreate from "../components/ticketComponent/ticketCreate"
import TicketShow from "../components/ticketComponent/ticketShow"

function TicketContainer() {

    return (

        <Routes>

            <Route path="/list/:idSessio" element={<TicketList />} />
            {/* <Route path="/create" element={<TicketCreate />} /> */}
            <Route path="/show/:id" element={<TicketShow />} />

        </Routes>
    )

}
export default TicketContainer;