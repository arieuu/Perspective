export default function abbreviateNumber(value:string) {
    let newValue = value;
    if (parseInt(value) >= 1000) {
        const suffixes = ["", "k", " million", " billion"," trillion"];
        const suffixNum = Math.floor( (""+value).length/3 );
        let shortValue = "";
        for (let precision = 2; precision >= 1; precision--) {
            shortValue = String(parseFloat(   (suffixNum != 0 ? (parseInt(value) / Math.pow(1000,suffixNum)) : parseInt(value)).toPrecision(precision)));
            const dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
            if (dotLessShortValue.length <= 2) { break; }
        }
        if (parseInt(shortValue) % 1 != 0)  shortValue = parseInt(shortValue).toFixed(1);
        newValue = shortValue+suffixes[suffixNum];
    }
    return newValue;
}
