import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { PizzaService } from './pizza.service';
import { CreatePizzaDto, EditPizzaDto, GetPizzaFilterDto } from './dto/pizza-dto';
import { Pizza } from './pizza.entity';
import { AuthGuard } from '@nestjs/passport';


@Controller('pizza')
@UseGuards(AuthGuard())
export class PizzaController {
    constructor(private pizzaService: PizzaService) {}
       
     @Get()
     getPizza(@Query() filterDto: GetPizzaFilterDto): Promise<Pizza[]>{
        // if(Object.keys(filterDto).length){
        //     return this.pizzaService.getFilteredPizza(filterDto)
        // }

        return this.pizzaService.getFilteredPizza(filterDto)
     }

     @Post()
     createPizza(@Body() createPizzaDto: CreatePizzaDto) : Promise<Pizza>{
         return this.pizzaService.createPizza(createPizzaDto)
     }

     @Put('/:id')
     @UsePipes(ValidationPipe)
     updatePizza(@Param('id', ParseIntPipe)  id: number, @Body() editPizzaDto: EditPizzaDto) : Promise<Pizza>{
         return this.pizzaService.editPizza(id, editPizzaDto)
     }

     @Get('/:id')
     getPizzaById(@Param('id', ParseIntPipe)  id: number) : Promise<Pizza> {
        return this.pizzaService.getPizzaById(id)
     }

     @Delete('/:id')
      deletePizza(@Param('id') id: number) : Promise<void>{
        return this.pizzaService.deletePizza(id)
    }
    
}
