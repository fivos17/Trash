// https://giscience.github.io/openrouteservice/documentation/Geometry-Decoding.html
const decodePolyline = (encodedPolyline) => {
    let points = [];
    let index = 0;
    const len = encodedPolyline.length;
    let lat = 0;
    let lng = 0;
    while (index < len) {
        let b;
        let shift = 0;
        let result = 0;
        do {
            b = encodedPolyline.charAt(index++).charCodeAt(0) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
        lat += (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
        shift = 0;
        result = 0;
        do {
            b = encodedPolyline.charAt(index++).charCodeAt(0) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
        lng += (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
        try {
            let location = [lat / 1e5, lng / 1e5];
            points.push(location);
        } catch (e) {
            console.log(e);
        }
    }
    return points;
};

// https://asbnotebook.com/fetch-google-spread-sheet-data-using-javascript/
const organizeResponse = (response) => {
    const jsonData = JSON.parse(response.substring(47).slice(0, -2));
    const data = [];
    const colz = [];
    jsonData.table.cols.forEach((heading) => {
        if (heading.label) {
            let column = heading.label;
            colz.push(column);
        }
    });
    jsonData.table.rows.forEach((rowData) => {
        const row = {};
        colz.forEach((ele, ind) => {
            row[ele] = rowData.c[ind] != null ? rowData.c[ind].v : "";
        });
        data.push(row);
    });
    return data;
}

// https://stackoverflow.com/questions/70822260/how-to-retrieve-the-last-unique-object-in-an-array
const uniqueArray = (arr) => {
    return Object.values(
        arr.reduce((accumulator, item) => {
            const { ID, ...rest } = item;
            return {
                ...accumulator,
                [ID]: { ID, ...rest },
            };
        }, {})
    )
};

const calcPercent = (num) => {
    return Math.ceil((150 - num) * 0.66);
};

const parseResults = (str) => {
    const parsed = str.split(",").map((elem) => {
        return parseFloat(elem);
    });
    parsed.reverse();
    return parsed;
};

// https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp
const hide = (idName) => {
    var x = document.getElementById(idName);
    x.style.display = "none";
}
const show = (idName) => {
    var x = document.getElementById(idName);
    x.style.display = "block";
}

const round = (num) => {
    return Math.round(num * 10) / 10;
}