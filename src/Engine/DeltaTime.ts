export class Time {
    public static deltaTime: number

    private static oldTime: number

    public static init() {
        Time.oldTime = Date.now()
    }  

    public static tickQuery() {
        const newTime = Date.now()
        Time.deltaTime = (newTime - Time.oldTime) / 1000
        Time.oldTime = newTime
    }
}