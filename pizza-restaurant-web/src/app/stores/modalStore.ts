import { RootStore } from "./rootStore";
import { observable, action, makeObservable } from "mobx";


export default class ModalStore{
    rootStore:RootStore;
    constructor(rootStore:RootStore) {
        this.rootStore=rootStore
        makeObservable(this, {
            modal: observable.shallow,
            openModal: action,
            closeModal: action
        })
    }
    modal = {
        open:false,
        body: null, 
        title: ""
    }

    openModal =(content:any, title:string)=>{
        this.modal.open=true;
        this.modal.body=content;
        this.modal.title = title;
    }

    closeModal=()=>{
        this.modal.open=false;
        this.modal.body=null;
    }
}