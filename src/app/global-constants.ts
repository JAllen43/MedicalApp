export class GlobalConstants {
    public static activeUser: boolean = false;
    public static currentUser: any = [];
    public static userLogins: any = [];
    public static counter: number;
    public static countdownTime = new Date();
    public static activeTimer: boolean = false;
    public static photos: Photo[]=[];

}
class Photo{
    name: any
    data: any
}