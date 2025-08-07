import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Link } from "react-router-dom";
import type { Categoria } from "~/types/Categoria";
import { getImage } from "~/lib/utils";

type ServiceCardProps = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly price: string;
  readonly duration: string;
  readonly isNegotiable: boolean;
  readonly categoria?: Categoria;
  readonly image?: string;
};

export default function ServiceCard({
  id,
  title,
  description,
  price,
  duration,
  isNegotiable,
  categoria,
  image,
}: ServiceCardProps) {
  return (
    <Card className="w-full h-[300px] flex flex-col justify-between rounded-xl border border-gray-200 shadow-sm p-4">
      {/* Top section */}
      <div>
        <div className="flex justify-between text-xs font-medium text-muted-foreground mb-1">
          <span className={isNegotiable ? "text-green-600" : "text-red-500"}>
            {isNegotiable ? "Negociável" : "Não negociável"}
          </span>
          <span className="text-[#366B2B]">{duration}</span>
        </div>
        <CardTitle className="text-center text-[#103A57] text-base mb-2">
          {title}
        </CardTitle>
        <div className="w-full h-[100px] mb-2">
          <img
            src={
              image
                ? getImage(image.slice(1))
                : "/app/assets/CardImg.png"
            }
            alt={title}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <CardDescription className="text-sm text-[#103A57] text-center max-h-[40px] overflow-hidden leading-snug mb-1">
          {description}
        </CardDescription>
        {categoria?.nome && (
          <p className="text-sm font-semibold text-[#103A57] text-center">
            {categoria.nome}
          </p>
        )}
      </div>

      {/* Footer section */}
      <CardFooter className="flex justify-between items-center mt-2 p-0">
        <span className="text-base font-bold text-[#103A57]">
          R$ {price}
        </span>
        <Link
          to="/"
          className="bg-[#366B2B] text-white text-sm font-semibold px-4 py-1.5 rounded-lg border border-[#366B2B] hover:bg-white hover:text-[#366B2B] transition-colors duration-300"
        >
          Ver
        </Link>
      </CardFooter>
    </Card>
  );
}