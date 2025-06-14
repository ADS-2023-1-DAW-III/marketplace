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
                    <Link to="/" className="font-poppins font-medium text-lg py-3 pl-10 hover:bg-white hover:text-[#307B8E] transition-colors duration-500">
                        Tela Inicial
                    </Link>
                    <Link to="/" className="font-poppins font-medium text-lg py-3 pl-10 hover:bg-white hover:text-[#307B8E] transition-colors duration-500">
                        Serviços prestados
                    </Link>
                    <Link to="/" className="font-poppins font-medium text-lg py-3 pl-10 hover:bg-white hover:text-[#307B8E] transition-colors duration-500">
                        Serviços contratados
                    </Link>
                    <Link to="/" className="font-poppins font-medium text-lg py-3 pl-10 hover:bg-white hover:text-[#307B8E] transition-colors duration-500">
                        Meus pagamentos
                    </Link>
                    <Link to="/" className="font-poppins font-medium text-lg py-3 pl-10 hover:bg-white hover:text-[#307B8E] transition-colors duration-500">
                        Perfil
                    </Link>
                </nav>
            </SheetContent>
        </Sheet>
    )
}