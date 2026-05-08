const token = "nJeB6ukQH4Yngrp2jXuW";

const url =
"https://obsessive-unwitting-ambition.ngrok-free.dev/api/v1/" +
token +
"/telemetry";

async function loadData() {
    try {
        const res = await fetch(url);
        const data = await res.json();

        console.log(data);

        document.getElementById("temp").innerText =
            data.temperature ?? "--";

        document.getElementById("hum").innerText =
            data.humidity ?? "--";

    } catch (err) {
        console.log("error", err);
    }
}

setInterval(loadData, 5000);
loadData();
