import { Route, Routes } from "react-router-dom";
import { Event } from "./pages/Event";

export function Router() {
  return (
    <Routes>
      <Route path="/" />
      <Route path="/event/lesson/:slug" element={<Event />} />
      <Route path="/event" element={<Event />} />
    </Routes>
  )
}