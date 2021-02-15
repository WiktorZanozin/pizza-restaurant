import PizzaAdminStore from './pizzaStore';
import { createContext } from 'react';
import { configure } from 'mobx';
import ModalStore from './modalStore';


configure({enforceActions:'always'});
export class RootStore{
    pizzaStore:PizzaAdminStore;
    //userStore:UserStore;
   // commonStore:CommonStore;
    modalStore:ModalStore;
   // profileStore:ProfileStore;

    constructor(){
        this.pizzaStore=new PizzaAdminStore(this);
       // this.userStore=new UserStore(this);
      //  this.commonStore=new CommonStore(this);
        this.modalStore=new ModalStore(this);
        //this.profileStore=new ProfileStore(this);
    }
}
export const RootStoreContext=createContext(new RootStore())