import {makeAutoObservable} from "mobx";

export default class ProductStore {
    constructor() {
       this._types = [
           {id: 1, name: "Веник"},
           {id: 2, name: "Сковорода"},
           {id: 3, name: "Гвоздь"},
           {id: 4, name: "Молоток"}
       ]
        this._producers = [
            {id: 1, name: "Веник Гуд Компани"},
            {id: 2, name: "Нагар Про"}
        ]

        this._countries = [
            {id: 1, name: "Беларусь"}
        ]

        this._products = [
            {id: 1, name: "Соломенный веник", price: 51, rating: 8, img: "", producerId: 1, typeId: 1, countryId: 1},
            {id: 2, name: "Сковорода для макарон", price: 143, rating: 5, img: "", producerId: 2, typeId: 2, countryId: 1},
            {id: 3, name: "Сковорода для макарон", price: 143, rating: 5, img: "", producerId: 2, typeId: 2, countryId: 1},
            {id: 4, name: "Сковорода для макарон", price: 143, rating: 5, img: "", producerId: 2, typeId: 2, countryId: 1},
            {id: 5, name: "Сковорода для макарон", price: 143, rating: 5, img: "", producerId: 2, typeId: 2, countryId: 1},
            {id: 6, name: "Сковорода для макарон", price: 143, rating: 5, img: "", producerId: 2, typeId: 2, countryId: 1}
        ]

        this._selectedType = {}
        this._selectedProducer = {}
        makeAutoObservable(this);
    }

    setSelectedProducer(producer){
        this._selectedProducer = producer;
    }

    setSelectedType(type){
        this._selectedType = type;
    }

    setTypes(types) {
        this._types = types;
    }

    setProducers(producers) {
        this._producers = producers;
    }

    setCountries(countries){
        this._countries = countries;
    }

    setProducts(products){
        this._products = products;
    }

    get types(){
        return this._types;
    }

    get producers(){
        return this._producers;
    }

    get countries(){
        return this._countries;
    }

    get products() {
        return this._products;
    }

    get selectedType(){
        return this._selectedType;
    }

    get selectedProducer(){
        return this._selectedProducer;
    }

}