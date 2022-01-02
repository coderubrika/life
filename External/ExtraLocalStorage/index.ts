interface Module {
    isAdded: string,
    isRemoved: string,
    addList: string,
    removeList: string,
    list: string
}

export class ExtraLs {
    private localStorage: Storage
    private modules: {[name:string]: Module}
    constructor() {
        this.localStorage = window.localStorage
        this.modules = {}
    }

    public defineModule(name: string) {
        if (!this.modules[name]) {

            this.modules[name] = {
                isAdded: `${name}__isAdded`,
                isRemoved: `${name}__isRemoved`,
                addList: `${name}__addList`,
                removeList: `${name}__removeList`,
                list: `${name}__list`
            }

            this.commitAnModule(name)
            this.localStorage.setItem(this.modules[name].list, '[]')
        }
    }

    public setToModuleById(name: string, id: string, data: any) {
        if (!this.modules[name]) {
            return;
        }

        this.SetIn(name, id, data)
    }

    public getFromModuleById(name: string, id: string): any {
        if (!this.modules[name]) {
            return;
        }

        return JSON.parse(this.localStorage.getItem(id))

    }

    public removeFromModuleById(name: string, id: string) {
        if (!this.modules[name]) {
            return;
        }

        this.localStorage.removeItem(id)
        this.setIsRemoved(name, true)
        this.AddToRemoved(name, id)
    }

    public commitAnModule(name: string) {
        if (!this.modules[name]) {
            return;
        }

        this.setIsAdded(name, false)
        this.setIsRemoved(name, false)
        this.localStorage.setItem(this.modules[name].addList, '[]')
        this.localStorage.setItem(this.modules[name].removeList, '[]')
    }

    private SetIn(name: string, id: string, data: any) {
        this.localStorage.setItem(id, JSON.stringify(data))
        this.setIsAdded(name, true)
        this.AddToAdded(name, id)
        this.AddToList(name, id)
    }

    private setIsAdded(name: string, state: boolean) {
        this.SetIsState(this.modules[name].isAdded, state)
    }

    private setIsRemoved(name: string, state: boolean) {
        this.SetIsState(this.modules[name].isRemoved, state)
    }

    private SetIsState(key: string, state: boolean) {
        const _state: string = state ? '1' : '0'
        this.localStorage.setItem(key, _state)
    }

    private AddToAdded(name: string, id: string) {
        this.AddToListStorage(this.modules[name].addList, id)
    }

    private AddToRemoved(name: string, id: string) {
        this.AddToListStorage(this.modules[name].removeList, id)
    }

    private AddToList(name: string, id: string) {
        this.AddToListStorage(this.modules[name].list, id)
    }

    private AddToListStorage(key: string, id: string) {
        const listStr: string = this.localStorage.getItem(key)
        const listSet = new Set<string>(JSON.parse(listStr))
        listSet.add(id)
        const list: string[] = Array.from(listSet)
        this.localStorage.setItem(key, JSON.stringify(list))
    }

    public getIdsFromModule(name: string): string[] {
        return JSON.parse(this.localStorage.getItem(this.modules[name].list))
    }

    public getAllDataFromModule(name: string): any[] {
        const ids: string[] = this.getIdsFromModule(name)

        return ids.map(id => JSON.parse(this.localStorage.getItem(id)))
    }

    public clearModule(name: string) {
        const ids:  string[] = this.getIdsFromModule(name)

        ids.forEach(id => this.removeFromModuleById(name, id))
    }

    public clearAll() {
        for (const name in this.modules) {
            this.clearModule(name)
        }
    }
}