import { api_url, api_key } from "../../url";

export default async function deleteNote(note) {
    const options = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "x-api-key": api_key
        },
        body: JSON.stringify(note)
    }

    const response = await fetch(`${api_url}/api/notes/${note.note_id}`, options);
    const data = await response.json();

    if (response.ok)
        return Promise.resolve(data);
    else 
        return Promise.reject(data);
}