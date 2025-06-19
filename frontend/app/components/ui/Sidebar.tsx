import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "~/components/ui/sheet"
import { Menu } from "lucide-react"
import {Link} from "react-router-dom";

export default function Sidebar() {
    return (
        <Sheet>
            <SheetTrigger className="p-2 text-white flex items-end cursor-pointer">
                <Menu size={28} />
            </SheetTrigger>

            <SheetContent side="left" className="bg-[#307B8E] text-white">
                <SheetHeader>
                    <SheetTitle className="text-3xl mt-10 mr-auto ml-auto font-bold text-white cursor-default">Market<span className="text-[#307B8E] bg-white">Place</span></SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col gap-4 mx-2">
                    <Link to="/" className="flex items-center font-poppins font-medium text-lg py-3 pl-10 hover:bg-white hover:text-[#307B8E] hover:stroke-[#307B8E] transition-colors duration-500 stroke-white">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-5">
                            <path d="M15 21V13C15 12.7348 14.8946 12.4804 14.7071 12.2929C14.5196 12.1054 14.2652 12 14 12H10C9.73478 12 9.48043 12.1054 9.29289 12.2929C9.10536 12.4804 9 12.7348 9 13V21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M3 9.99997C2.99993 9.70904 3.06333 9.42159 3.18579 9.15768C3.30824 8.89378 3.4868 8.65976 3.709 8.47197L10.709 2.47297C11.07 2.16788 11.5274 2.00049 12 2.00049C12.4726 2.00049 12.93 2.16788 13.291 2.47297L20.291 8.47197C20.5132 8.65976 20.6918 8.89378 20.8142 9.15768C20.9367 9.42159 21.0001 9.70904 21 9.99997V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V9.99997Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                        Tela Inicial
                    </Link>
                    <Link to="/" className="flex items-center font-poppins font-medium text-lg py-3 pl-10 hover:bg-white hover:text-[#307B8E] hover:stroke-[#307B8E] transition-colors duration-500 stroke-white">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-5">
                            <path d="M12 12H12.01" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16 6V4C16 3.46957 15.7893 2.96086 15.4142 2.58579C15.0391 2.21071 14.5304 2 14 2H10C9.46957 2 8.96086 2.21071 8.58579 2.58579C8.21071 2.96086 8 3.46957 8 4V6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M22 13C19.0328 14.959 15.5555 16.0033 12 16.0033C8.44445 16.0033 4.96721 14.959 2 13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M20 6H4C2.89543 6 2 6.89543 2 8V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V8C22 6.89543 21.1046 6 20 6Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Serviços prestados
                    </Link>
                    <Link to="/" className="flex items-center font-poppins font-medium text-lg py-3 pl-10 hover:bg-white hover:text-[#307B8E] hover:stroke-[#307B8E] transition-colors duration-500 stroke-white">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-5">
                            <path d="M22 18H6C5.46957 18 4.96086 17.7893 4.58579 17.4142C4.21071 17.0391 4 16.5304 4 16V7C4 6.46957 3.78929 5.96086 3.41421 5.58579C3.03914 5.21071 2.53043 5 2 5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M17 14V4C17 3.46957 16.7893 2.96086 16.4142 2.58579C16.0391 2.21071 15.5304 2 15 2H14C13.4696 2 12.9609 2.21071 12.5858 2.58579C12.2107 2.96086 12 3.46957 12 4V14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M20 6H9C8.44772 6 8 6.44772 8 7V13C8 13.5523 8.44772 14 9 14H20C20.5523 14 21 13.5523 21 13V7C21 6.44772 20.5523 6 20 6Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M18 22C19.1046 22 20 21.1046 20 20C20 18.8954 19.1046 18 18 18C16.8954 18 16 18.8954 16 20C16 21.1046 16.8954 22 18 22Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M9 22C10.1046 22 11 21.1046 11 20C11 18.8954 10.1046 18 9 18C7.89543 18 7 18.8954 7 20C7 21.1046 7.89543 22 9 22Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Serviços contratados
                    </Link>
                    <Link to="/" className="flex items-center font-poppins font-medium text-lg py-3 pl-10 hover:bg-white hover:text-[#307B8E] hover:stroke-[#307B8E] transition-colors duration-500 stroke-white">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-5">
                            <path d="M11 17H14V19C14 19.2652 14.1054 19.5196 14.2929 19.7071C14.4804 19.8946 14.7348 20 15 20H17C17.2652 20 17.5196 19.8946 17.7071 19.7071C17.8946 19.5196 18 19.2652 18 19V16C18.4658 15.8449 18.8891 15.5834 19.2363 15.2363C19.5834 14.8891 19.8449 14.4658 20 14H21C21.2652 14 21.5196 13.8946 21.7071 13.7071C21.8946 13.5196 22 13.2652 22 13V11C22 10.7348 21.8946 10.4804 21.7071 10.2929C21.5196 10.1054 21.2652 10 21 10H20C20 9.22377 19.8193 8.45821 19.4721 7.76393C19.125 7.06966 18.621 6.46574 18 6V3C17.379 3 16.7666 3.14458 16.2111 3.42229C15.6557 3.7 15.1726 4.10322 14.8 4.6L14.5 5H11C9.4087 5 7.88258 5.63214 6.75736 6.75736C5.63214 7.88258 5 9.4087 5 11V12C5 12.7762 5.18073 13.5418 5.52786 14.2361C5.875 14.9303 6.37902 15.5343 7 16V19C7 19.2652 7.10536 19.5196 7.29289 19.7071C7.48043 19.8946 7.73478 20 8 20H10C10.2652 20 10.5196 19.8946 10.7071 19.7071C10.8946 19.5196 11 19.2652 11 19V17Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16 10H16.01" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M2 8V9C2 9.53043 2.21071 10.0391 2.58579 10.4142C2.96086 10.7893 3.46957 11 4 11H5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Meus pagamentos
                    </Link>
                    <Link to="/" className="flex items-center font-poppins font-medium text-lg py-3 pl-10 hover:bg-white hover:text-[#307B8E] hover:stroke-[#307B8E] transition-colors duration-500 stroke-white">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-5">
                            <path d="M19 21V19C19 17.9391 18.5786 16.9217 17.8284 16.1716C17.0783 15.4214 16.0609 15 15 15H9C7.93913 15 6.92172 15.4214 6.17157 16.1716C5.42143 16.9217 5 17.9391 5 19V21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Perfil
                    </Link>
                </nav>
            </SheetContent>
        </Sheet>
    )
}