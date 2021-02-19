import { EntityRepository, Repository } from "typeorm";
import { Pizza } from "./pizza.entity";
import { CreatePizzaDto, EditPizzaDto, GetPizzaFilterDto } from './dto/pizza-dto';
import { PizzaStatus } from "./pizza-status.enum";

@EntityRepository(Pizza)
export class PizzaRepository extends Repository<Pizza>{
    async getPizza(filterDto: GetPizzaFilterDto): Promise<Pizza[]>{
        const{ status, search} = filterDto;
        const query = this.createQueryBuilder('pizza');

        if(status){
            query.andWhere('pizza.status =:status', {status:'AVAILABLE'})
        }
      
        if(search){
            query.andWhere('(pizza.title LIKE :search OR pizza.description LIKE :search)', {search: `%${search}%`})
        }

        const pizza = await query.getMany();
        return pizza;
    }

    async createPizza(createPizzaDto: CreatePizzaDto): Promise<Pizza>{
        const{title, description, priceForLarge, priceForMedium, priceForSmall} = createPizzaDto;

        const pizza = new Pizza();
            pizza.title=title,
            pizza.description = description,
            pizza.priceForSmall = priceForSmall,
            pizza.priceForMedium = priceForMedium,
            pizza.priceForLarge = priceForLarge,
            pizza.status = PizzaStatus.AVAILABLE
        await pizza.save();
        
        return pizza
    }

    async editPizza(id: number, editPizzaDto: EditPizzaDto): Promise<Pizza>{
        const{title, description, priceForLarge, priceForMedium, priceForSmall, status} = editPizzaDto;
        const pizza = await this.findOne(id) 

        pizza.title=title;
        pizza.description=description;
        pizza.priceForLarge= priceForLarge;
        pizza.priceForMedium = priceForMedium;
        pizza.priceForSmall = priceForSmall;
        pizza.status = status;
        
        await pizza.save();
        return pizza;
    }
}