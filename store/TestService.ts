export class Kek {
    name= "kik"
}
export class TestService {
    public title = "Allo";
    public kek = new Kek()
    setTitle(v) {
        this.title = v;
    }
}