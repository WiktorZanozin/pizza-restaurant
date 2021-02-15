import { Injectable, NotFoundException, Param, ParseIntPipe} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePizzaDto, EditPizzaDto, GetPizzaFilterDto } from './dto/pizza-dto';
import { PizzaStatus } from './pizza-status.enum';
import { Pizza } from './pizza.entity';
import { PizzaRepository } from './pizza.repository';


@Injectable()
export class PizzaService {
    constructor(
        @InjectRepository(PizzaRepository)
        private pizzaRepository: PizzaRepository
    ){}
    // private pizza: Pizza[] = [];

    // getAllPizza(): Pizza[]{
    //     return this.pizza
    // }

    getFilteredPizza(filterDto: GetPizzaFilterDto): Promise<Pizza[]>{
       // const {status, search} = filterDto

       // let pizza = this.getAllPizza();
        
        // if(status){
        //     pizza = pizza.filter(p  => p.status === status);
        // }

        // if(search){
        //     pizza = pizza.filter( pizza =>
        //        pizza.title.includes(search) ||
        //        pizza.description.includes(search)
        //     )
        // }
        return this.pizzaRepository.getPizza(filterDto);
    }

    async createPizza(createPizzaDto: CreatePizzaDto): Promise<Pizza>{
       return this.pizzaRepository.createPizza(createPizzaDto)
    }

      async getPizzaById(id:number): Promise<Pizza> {
         const found = await this.pizzaRepository.findOne(id) 
         if(!found){
             throw new NotFoundException(`Pizza with ID "${id}" doesn't exist`);
         }
         return found
     }
    

    async deletePizza(id: number): Promise<void> {
       const result = await this.pizzaRepository.delete(id)

       if(result.affected === 0){
         throw new NotFoundException(`Pizza with ID "${id}" doesn't exist`);
       }
    }

    async editPizza(id: number, editPizzaDto: EditPizzaDto): Promise<Pizza>{
        const{title, description, priceForLarge, priceForMedium, priceForSmall, status} = editPizzaDto;
        const pizza = await this.pizzaRepository.findOne(id) 
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
