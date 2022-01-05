import { ExtraLs } from "."

export class StorageConnection {
    constructor(private name:string, private els: ExtraLs) {
    }

    public add(id: string, data: any) {
        this.els.setToDomainById(this.name, id, data)
    }

    public get(id: string): any {
        return this.els.getFromDomainById(this.name, id)
    }

    public getAll(): any[] {
        return this.els.getAllDataFromModule(this.name)
    }

    public remove(id: string) {
        this.els.removeFromDomainById(this.name, id)
    }

    public clear() {
        this.els.clearModule(this.name)
    }

    public set OnAddCallback(callback: (ids: string[])=> void) {
        this.els.setOnAddedCallback(this.name, callback)
    }

    public set OnRemoveCallback(callback: (ids: string[])=> void) {
        this.els.setOnRemovedCallback(this.name, callback)
    }
}