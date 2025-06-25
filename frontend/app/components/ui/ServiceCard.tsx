import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "~/components/ui/card";
import { Link } from "react-router-dom";

type ServiceCardProps = {
  title: string;
  description: string;
  price: number;
  duration: string;
  isNegotiable: boolean;
};

export default function ServiceCard({
                                      title,
                                      description,
                                      price,
                                      duration,
                                      isNegotiable,
                                    }: ServiceCardProps) {
  return (
      <Card className="flex flex-col justify-between h-full">
        <CardHeader className="pb-2">
          <div className="flex justify-between text-xs font-semibold text-muted-foreground">
          <span className={isNegotiable ? "text-green-700" : "text-red-600"}>
            {isNegotiable ? "Negociável" : "Não negociável"}
          </span>
            <span className="text-[#366B2B]">{duration}</span>
          </div>
          <CardTitle className="text-center text-[#103A57] text-base leading-tight">
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-3">
          <img
              src="app/assets/CardImg.png"
              alt={title}
              className="rounded-md w-full h-[160px] object-cover"
          />
          <CardDescription>
              <p className="text-sm text-[#103A57] text-center h-[72px] overflow-hidden">
                  {description}
              </p>
          </CardDescription>
        </CardContent>

          <CardFooter className="flex justify-between items-center mt-auto">
        <span className="text-lg font-bold text-[#103A57]">
          R${" "}
          {price.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
          <Link
              to="/"
              className="bg-[#366B2B] hover:bg-white hover:text-[#366B2B] hover:border-[#366B2B] transition-colors duration-300 text-white text-sm font-bold px-5 py-2 rounded-lg border-2 border-[#366B2B]"
          >
            Ver
          </Link>
        </CardFooter>
      </Card>
  );
}
