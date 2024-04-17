import { createContext, useContext, useState } from "react";

const SideBarContext = createContext()

export function useSideBarContext () {
    return useContext(SideBarContext)
}

export default function SideBarContextProvider ({Children}) {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false)

    function toggleSideBar () {
        setIsSideBarOpen(!isSideBarOpen)
    }

    const values={
        isSideBarOpen,
        toggleSideBar
    }

    return (
        <SideBarContext.Provider value={values}>
            {Children}
        </SideBarContext.Provider>
    )


}