export const find = async (coords: { lat: number, lng: number}, distance: number) => {
    const url = `http://localhost:1235/find`
    let response = await fetch(url, {
        method: 'POST',
        // cache: 'no-cache',
        // mode: 'no-cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [coords.lat, coords.lng]
            },
            "x-distance": distance
        })
    })
    /* curl test
    curl -d '{"type": "Feature","geometry": {"type": "Point","coordinates": [43.032, -120.012]},"x-distance": 100000}' -H "Content-Type: application/json" -X POST http://localhost:1235/find
    curl works but we're running into cors issues.
    */
    if (response.ok) {
        return response.json()
    } else {
        console.log("Something went wrong")
        console.error(response)
    }
}