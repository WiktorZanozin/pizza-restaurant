import { PizzaStatus } from "../pizza-status.enum";


export class CreatePizzaDto{
    title: string;
    description:string;
    priceForSmall: number;
    priceForMedium: number;
    priceForLarge: number;
}

export class EditPizzaDto extends CreatePizzaDto{
    status: PizzaStatus
}

export class GetPizzaFilterDto{
    status: PizzaStatus;
    search: string;
}