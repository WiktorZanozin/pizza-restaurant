import {observable, action, runInAction, makeObservable, autorun, computed, reaction} from 'mobx'
import { IPizza } from '../models/pizza'
import { createContext, SyntheticEvent } from 'react';
import { toast } from 'react-toastify';
import agent from '../api/agent';
import { PizzaStatus } from '../models/pizzaStatus';
import { RootStore } from './rootStore';

export default class PizzaAdminStore{
    rootStore: RootStore;
    pizzaAdminRegistry = new Map();
    pizzaItem: IPizza | null = null;
    pizza: IPizza[]=[]
    loadingInitial = false;
    target = '';
    submitting = false;

constructor( rootStore: RootStore) {
  this.rootStore = rootStore;
    makeObservable(this, {
        target: observable,
        pizza: observable,
        pizzaItem: observable,
        loadingInitial:observable,
        submitting: observable,
        createPizza: action,
        editPizza: action,
        deletePizza: action,
        pizzaList: computed
    })
    
    autorun(() => this.loadPizza())
}
    get pizzaList() {
      return Array.from(this.pizzaAdminRegistry.values())
     }
       createPizza = async (pizzaItem: IPizza) => {
          this.submitting = true;
          try {
            await agent.PizzaAdmin.create(pizzaItem);
            runInAction(() => {
              this.pizzaAdminRegistry.set(pizzaItem.id, pizzaItem);
              this.submitting = false;
            })
          } catch (error) {
            runInAction(() => {
              this.submitting = false;
            })
            console.log(error);
          }
        };

      loadPizza = async()=>{
        this.loadingInitial = true;
        try{
            const pizza = await agent.PizzaAdmin.list();
            runInAction(()=>
            pizza.forEach((pizzaItem) => {
            this.pizzaAdminRegistry.set(pizzaItem.id, pizzaItem);
            this.pizza=[...pizza]
            }))
            this.loadingInitial=false
        }
        catch (error) {
        runInAction(() => {
            this.loadingInitial = false;
        })
            throw error;
        }
        } 

        editPizza= async (pizzaItem: IPizza) => {
          this.submitting = true;
          try {
            await agent.PizzaAdmin.update(pizzaItem);
            runInAction(() => {
              this.pizzaAdminRegistry.set(pizzaItem.id, pizzaItem);
              this.pizzaItem = pizzaItem;
              this.submitting = false;
            });
          } catch (error) {
            runInAction(() => {
              this.submitting = false;
            });
            toast.error('Problem submitting data');
            console.log(error);
          }
        };

       deletePizza = async (
          event: SyntheticEvent<HTMLButtonElement>,
          id: number
        ) => {
          this.submitting = true;
          this.target = event.currentTarget.name;
          try {
            await agent.PizzaAdmin.delete(id);
            runInAction(() => {
              this.pizzaAdminRegistry.delete(id);
              this.submitting = false;
              this.target = '';
            });
          } catch (error) {
            runInAction(() => {
              this.submitting = false;
              this.target = '';
            });
            console.log(error);
          }
        };
        
}

