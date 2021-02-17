import { PizzaStatus } from "./pizzaStatus";

export interface IPizza{
    id:number;
    title: string;
    description:string;
    priceForSmall: number;
    priceForMedium: number;
    priceForLarge: number;
    status: PizzaStatus;
}

export interface IPizzaFormValues{
    title: string;
    description:string;
    priceForSmall: number;
    priceForMedium: number;
    priceForLarge: number;
}

export class PizzaFormValues implements IPizzaFormValues {
    title: string = '';
    description: string = '';
    priceForSmall: number = 2;
    priceForMedium: number = 0;
    priceForLarge: number = 0;

    constructor(init?: IPizzaFormValues) {
        Object.assign(this, init);
    }
  
}