import {observable, action, runInAction, makeObservable, autorun, computed, reaction} from 'mobx'
import { IPizza } from '../models/pizza'
import { createContext, SyntheticEvent } from 'react';
import agent from '../api/agent';
import { PizzaStatus } from '../models/pizzaStatus';
import { RootStore } from './rootStore';

export default class PizzaAdminStore{
    rootStore: RootStore;
    pizzaAdminRegistry = new Map();
    pizza: IPizza[]=[]

constructor( rootStore: RootStore) {
  this.rootStore = rootStore;
    makeObservable(this, {
        pizza: observable,
        createPizza: action,
        pizzaList: computed
    })
    
    autorun(() => this.loadPizza())
}
  get pizzaList() {
    return Array.from(this.pizzaAdminRegistry.values())
  }
       createPizza = async (pizzaItem: IPizza) => {
          //this.submitting = true;
          try {
            await agent.PizzaAdmin.create(pizzaItem);
            runInAction(() => {
              //this.pizzaAdminRegistry.set(pizzaItem.id, pizzaItem);
             // this.editMode = false;
              //this.submitting = false;
            })
          } catch (error) {
            runInAction(() => {
              //this.submitting = false;
            })
            console.log(error);
          }
        };

      loadPizza = async()=>{
                //  this.loadingInitial=true;
        try{
            const pizza = await agent.PizzaAdmin.list();
            runInAction(()=>
            pizza.forEach((pizzaItem) => {
            this.pizzaAdminRegistry.set(pizzaItem.id, pizzaItem);
            this.pizza=[...pizza]
            }))
                  // this.loadingInitial=false
        }
        catch (error) {
        // runInAction('load activities error', () => {
        //               this.loadingInitial = false;
        //  })
            throw error;
        }
        } 
        
}

