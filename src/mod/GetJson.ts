import {file_url,assets_url} from '../var'


interface postIdInfo {
        "id": number,
        "tags": string,
        "created_at": number,
        "updated_at": number,
        "creator_id": number,
        "approver_id": number|null,
        "author": string,
        "change": number,
        "source": string|null,
        "score": number,
        "md5": string,
        "file_size": number,
        "file_ext": string,
        "file_url": string,
        "is_shown_in_index": boolean,
        "preview_url": string,
        "preview_width": number,
        "preview_height": number,
        "actual_preview_width": number,
        "actual_preview_height": number,
        "sample_url": string,
        "sample_width": number,
        "sample_height": number,
        "sample_file_size": number,
        "jpeg_url": string,
        "jpeg_width": number,
        "jpeg_height": number,
        "jpeg_file_size": number,
        "rating": string,
        "is_rating_locked": false,
        "has_children": false,
        "parent_id": number,
        "status": string,
        "is_pending": false,
        "width": number,
        "height": number,
        "is_held": boolean,
        "frames_pending_string": string|null,
        "frames_pending": [],
        "frames_string": string,
        "frames": [],
        "is_note_locked": boolean,
        "last_noted_at": number,
        "last_commented_at": number
    
}


export async function GetJson(link:string):Promise<postIdInfo[]> {
    const req = await fetch(link)
    //console.log(await req.text())
    var re= (await req.text())
    .replaceAll("files.yande.re", file_url)
    .replaceAll("assets.yande.re", assets_url)
    
    return JSON.parse(re)
        
}