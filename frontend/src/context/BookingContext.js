import React, { createContext, useContext, useState } from "react";

const Ctx = createContext(null);

export function BookingProvider({ children }) {
  const [data, setData] = useState({
    service: "",
    service_label: "",
  });

  const update = (patch) => setData((d) => ({ ...d, ...patch }));

  return React.createElement (Ctx.Provider, {value: { data, update } }, children);
}

export const useBooking = () => useContext(Ctx);