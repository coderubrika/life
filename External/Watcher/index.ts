export class Watcher {

    private watchInterval: number
    private watchRate: number
    private isWatched: boolean

    constructor(watchRate: number) {
        this.watchRate = watchRate
    }

    public watch() {
        if (this.isWatched) return 
        this.watchInterval = setInterval(this.watchCallback, this.watchRate)
    }

    public watchCallback: Function

    public stopWatch() {
        clearInterval(this.watchInterval)
    }
}