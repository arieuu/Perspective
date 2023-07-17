// Function to check if an array already has an object

export default function containsObject(obj: object, list: object[]) {
    
    let i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
}