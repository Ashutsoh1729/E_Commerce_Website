

import { UserButton, auth } from "@clerk/nextjs"
import MainNav from "./main-nav"
import StoreSwitcher from "./store-switcher"
import { redirect } from "next/navigation"
import prismadb from "@/lib/prismadb"


const Navbar = async () => {


    const { userId } = auth()
    
    if (!userId) {
        redirect("/sign-in")
    }

    const store = await prismadb.store.findMany({
        where: {
            userId: userId
        }
    })

    // console.log(store);
    

    return (
        <div className=' border-b'>
            <div className="flex items-center h-16 px-4 ">
                <StoreSwitcher items={store} />
                <MainNav className="mx-6"/>

                <div className=" ml-auto flex items-center space-x-4">
                <UserButton />
                </div>
            </div>
        </div>
    )
}

export default Navbar