import { PizzaStatus } from "../pizza-status.enum";
import { IsNotEmpty } from "class-validator"



export class CreatePizzaDto{
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description:string;

    @IsNotEmpty()
    priceForSmall: number;

    @IsNotEmpty()
    priceForMedium: number;

    @IsNotEmpty()
    priceForLarge: number;
}

export class EditPizzaDto extends CreatePizzaDto{
    status: PizzaStatus
}

export class GetPizzaFilterDto{
    status: PizzaStatus;
    search: string;
}