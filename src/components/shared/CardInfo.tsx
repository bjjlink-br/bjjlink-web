import Image from "next/image";
import { Card, CardContent, CardHeader } from "../ui/card";

type CardInfoProps = {
    title: string;
    img: string;
    bgColor: string;
}

export const CardInfo = ({ title, img, bgColor }: CardInfoProps) => {
  return (
    <Card 
        className="bg-gray-900 border-gray-700 flex items-center gap-4 p-4"
    >
        <CardHeader className="p-0">
            <div 
                className="w-10 h-10 rounded-md flex justify-center items-center bg-gray-900"
                style={{
                    backgroundColor: bgColor
                }}
            >
                <Image src={img} alt={title} width={20} height={25} />
            </div>
        </CardHeader>
        <CardContent className="p-0">
            <p className="text-base leading-5 text-gray-50">{title}</p>
        </CardContent>
    </Card>
  );
};
