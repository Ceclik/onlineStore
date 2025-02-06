import {makeAutoObservable} from "mobx";

export default class ProductStore {
    constructor() {
        this._types = []
        this._producers = []
        this._countries = [
            {id: 1, name: "Беларусь"}
        ]
        this._products = []
        this._searchQuery = "";
        this._selectedType = {}
        this._selectedProducer = {}
        this._selectedProduct = {}
        this._page = 1;
        this._totalCount = 0;
        this._limit = 0;
        makeAutoObservable(this);
    }

    setSearchQuery(query) {
        this._searchQuery = query;
    }

    setSelectedProduct(product){
        this._selectedProduct = product;
    }

    setLimit(limit){
        this._limit = limit;
    }

    setTotalCount(totalCount){
        this._totalCount = totalCount;
    }

    setPage(page){
        this._page = page;
    }

    setSelectedProducer(producer){
        this.setPage(1);
        this._selectedProducer = producer;
    }

    setSelectedType(type){
        this.setPage(1);
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

    get limit(){
        return this._limit;
    }

    get totalCount(){
        return this._totalCount;
    }

    get page(){
        return this._page;
    }

    get selectedProduct() {
        return this._selectedProduct;
    }

    get searchQuery() {
        return this._searchQuery;
    }

}