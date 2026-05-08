// رابط ngrok الخاص بك
const baseUrl = "https://obsessive-unwitting-ambition.ngrok-free.dev";

// Device ID الذي أعطيتني إياه
const deviceId = "f7575be0-4af0-11f1-837c-a5e33e2622a3";

// API من ThingsBoard
const url = baseUrl +
"/api/plugins/telemetry/" +
deviceId +
"/values/timeseries?keys=temperature,humidity";

async function loadData() {
    try {
        const res = await fetch(url);
        const data = await res.json();

        document.getElementById("temp").innerText =
            data.temperature?.[0]?.value ?? "no data";

        document.getElementById("hum").innerText =
            data.humidity?.[0]?.value ?? "no data";

    } catch (err) {
        console.log("Error:", err);
    }
}

// تحديث كل 5 ثواني
setInterval(loadData, 5000);
loadData();