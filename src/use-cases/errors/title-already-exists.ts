export class TitleAlreadyExists extends Error {
    constructor(){
        super("Title already exists")
    }
}