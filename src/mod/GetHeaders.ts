export function GetHeaders(type: string): object {

    var Header = new Headers()

    switch (type) {
        case "html":
            Header.set('Content-Type', 'text/html;charset=UTF-8')
            break;
        case "txt":
            Header.set('Content-Type', 'text;charset=UTF-8')
            break;
        default:
            break;
    }

    var H:object = { headers: Header }
    return H
}
