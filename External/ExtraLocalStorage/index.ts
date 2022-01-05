import { v4 } from "uuid"
import { Watcher } from "../Watcher"
import { StorageConnection } from "./StorageConnection"

interface Domain {
    wasAdded: string,
    wasRemoved: string,
    addedIds: string,
    removedIds: string,
    ids: string,
    onRemovedCallback?: (removedList: string[]) => void
    onAddedCallback?: (addedList: string[]) => void
}

export class ExtraLs {
    private localStorage: Storage
    private domains: {[name:string]: Domain}

    private id: string

    private static readonly DOMAINS_KEY: string = '__domains__'
    private static readonly LOCAL_STORAGE_PLACE = '__local_storage_place__'

    private watcher: Watcher

    constructor() {

        this.id = v4()

        this.login()

        this.localStorage = window.localStorage
        this.domains = {}
        this.watcher = new Watcher(50)
        this.watcher.watchCallback = ((ls: ExtraLs)=>{
            return ()=> {                
                for (let name in ls.domains) {
                    let handledRemove = false, handledAdd = false

                    if (ls.getAddedState(name) && ls.haveOnAddedCallback(name)) {
                        ls.domains[name].onAddedCallback(ls.getAddedIds(name))
                        handledAdd = true
                    }
                    if (ls.getRemovedState(name) && ls.haveOnRemovedCallback(name)) {
                        ls.domains[name].onRemovedCallback(ls.getRemovedIds(name))
                        handledRemove = true
                    }
                    
                    if (handledRemove || handledAdd) {
                        ls.commitAnDomain(name)
                        /**
                         *
                         * кароче как только главный стор полуичит информацию об изменениях
                         * он добавит всех в список на обновления и даст добро на обновление для всех
                         * получается все сторы должны зарегистрироваться как сторы, и должны проверять есть ои обновление и есть ли они в списке
                         * если обновление есть они должны 
                         */
                        
                    }
                }
                
            }
        })(this)
        this.watcher.watch()
    }

    private login() {
        this.AddToIdsStorage(ExtraLs.LOCAL_STORAGE_PLACE, this.id)
    }

    private logout() {
        this.RemoveIdsFromStorage(ExtraLs.LOCAL_STORAGE_PLACE, this.id)
    }

    public connectDomain(name: string) {
        if (!this.domains[name]) {

            this.domains[name] = {
                wasAdded: `${name}__wasAdded`,
                wasRemoved: `${name}__wasRemoved`,
                addedIds: `${name}__addedIds`,
                removedIds: `${name}__removedIds`,
                ids: `${name}__ids`
            }
        }

        if (!this.hasDomain(name)) {
            this.defineDomain(name)
        }

        return new StorageConnection(name, this)
    }

    public defineDomain(name: string) {
        this.addDomain(name)
        this.commitAnDomain(name)
        this.localStorage.setItem(this.domains[name].ids, '[]')
    }

    private hasDomain(name: string): boolean {
        const domainsStr: string = this.localStorage.getItem(ExtraLs.DOMAINS_KEY)
        const domainsSet = new Set<string>(JSON.parse(domainsStr))
        return domainsSet.has(name)
    }

    private addDomain(name: string) {
        this.AddToIdsStorage(ExtraLs.DOMAINS_KEY, name)
    }

    public setOnAddedCallback(name: string, callback: (ids: string[])=> void) {
        this.domains[name].onAddedCallback = callback
    }

    public setOnRemovedCallback(name: string, callback: (ids: string[])=> void) {
        this.domains[name].onRemovedCallback = callback
    }

    public getAddedIds(name: string): string[] {
        return this.getIdsByKey(this.domains[name].addedIds)
    }

    public getRemovedIds(name: string): string[]{
        return this.getIdsByKey(this.domains[name].removedIds)
    }

    private getIdsByKey(key: string): string[] {
        return JSON.parse(this.localStorage.getItem(key))
    }

    public haveOnAddedCallback(name: string): boolean {
        return this.domains[name].onAddedCallback !== undefined
    }

    public haveOnRemovedCallback(name: string): boolean {
        return this.domains[name].onRemovedCallback !== undefined
    }

    public setToDomainById(name: string, id: string, data: any) {
        if (!this.domains[name]) {
            return;
        }

        this.SetIn(name, id, data)
    }

    public getFromDomainById(name: string, id: string): any {
        if (!this.domains[name]) {
            return;
        }

        return JSON.parse(this.localStorage.getItem(id))

    }

    public removeFromDomainById(name: string, id: string) {
        if (!this.domains[name]) {
            return;
        }

        this.localStorage.removeItem(id)
        this.setWasRemoved(name, true)
        this.AddToRemoved(name, id)
        this.removeFromIds(name, id)
        this.removeFromAddedIds(name, id)
        this.checkWasUpdatedStates(name)
    }

    public commitAnDomain(name: string) {
        if (!this.domains[name]) {
            return;
        }

        this.setWasAdded(name, false)
        this.setWasRemoved(name, false)
        this.localStorage.setItem(this.domains[name].addedIds, '[]')
        this.localStorage.setItem(this.domains[name].removedIds, '[]')
    }

    private SetIn(name: string, id: string, data: any) {
        this.localStorage.setItem(id, JSON.stringify(data))
        this.setWasAdded(name, true)
        this.AddToAdded(name, id)
        this.AddToIds(name, id)
        this.removeFromRemovedIds(name, id)
        this.checkWasUpdatedStates(name)

    }

    private setWasAdded(name: string, state: boolean) {
        this.SetWasState(this.domains[name].wasAdded, state)
    }

    private setWasRemoved(name: string, state: boolean) {
        this.SetWasState(this.domains[name].wasRemoved, state)
    }

    private SetWasState(key: string, state: boolean) {
        const _state: string = state ? '1' : '0'
        this.localStorage.setItem(key, _state)
    }

    private AddToAdded(name: string, id: string) {
        this.AddToIdsStorage(this.domains[name].addedIds, id)
    }

    private AddToRemoved(name: string, id: string) {
        this.AddToIdsStorage(this.domains[name].removedIds, id)
    }

    private AddToIds(name: string, id: string) {
        this.AddToIdsStorage(this.domains[name].ids, id)
    }

    private AddToIdsStorage(key: string, id: string) {
        const idsStr: string = this.localStorage.getItem(key)
        const idsSet = new Set<string>(JSON.parse(idsStr))
        idsSet.add(id)
        const ids: string[] = Array.from(idsSet)
        this.localStorage.setItem(key, JSON.stringify(ids))
    }

    // испытать декораторы
    private RemoveIdsFromStorage(key: string, id: string) {
        const idsStr: string = this.localStorage.getItem(key)
        const idsSet = new Set<string>(JSON.parse(idsStr))
        idsSet.delete(id)
        const ids: string[] = Array.from(idsSet)
        this.localStorage.setItem(key, JSON.stringify(ids))
    }

    public getIdsFromModule(name: string): string[] {
        return JSON.parse(this.localStorage.getItem(this.domains[name].ids))
    }

    public getAllDataFromModule(name: string): any[] {
        const ids: string[] = this.getIdsFromModule(name)

        return ids.map(id => JSON.parse(this.localStorage.getItem(id)))
    }

    private removeFromIds(name: string, id: string) {
        this.RemoveIdsFromStorage(this.domains[name].ids, id)
    }

    private removeFromAddedIds(name: string, id: string) {
        this.RemoveIdsFromStorage(this.domains[name].addedIds, id)
    }

    private removeFromRemovedIds(name: string, id: string) {
        this.RemoveIdsFromStorage(this.domains[name].removedIds, id)
    }

    public clearModule(name: string) {
        const ids:  string[] = this.getIdsFromModule(name)

        ids.forEach(id => this.removeFromDomainById(name, id))
    }

    public clearAll() {
        for (const name in this.domains) {
            this.clearModule(name)
        }
    }

    public getAddedState(name: string): boolean {
        return this.getState(this.domains[name].wasAdded)
    }

    public getRemovedState(name: string): boolean {
        return this.getState(this.domains[name].wasRemoved)
    }

    private getState(key: string): boolean {
        return this.localStorage.getItem(key) == '1'
    }

    private IsEmpty(key: string): boolean {
        const idsStr: string = this.localStorage.getItem(key)
        const idsSet = new Set<string>(JSON.parse(idsStr))
        return idsSet.size == 0
    }

    private addedIsEmpty(name: string): boolean {
        return this.IsEmpty(this.domains[name].addedIds)
    }

    private removedIsEmpty(name: string): boolean {
        return this.IsEmpty(this.domains[name].removedIds)
    }

    private checkWasUpdatedStates(name: string) {
        if (this.addedIsEmpty(name)) this.setWasAdded(name, false)
        else this.setWasAdded(name, true)

        if (this.removedIsEmpty(name)) this.setWasRemoved(name, false)
        else this.setWasRemoved(name, true)
    }
}