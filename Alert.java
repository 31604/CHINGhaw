<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Alerts</title>
<style>
body{
  font-family:Arial,sans-serif;
  margin:0; padding:0;
  background:#f8fafc;
  color:#1e293b;
  transition: background 0.3s, color 0.3s;
}
body.dark{ background:#1e293b; color:white; }

.topbar{
  position:fixed; top:0; left:0; right:0;
  height:55px;
  background:#1e293b;
  color:white;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:0 20px;
  z-index:999;
  font-weight:600;
}

#menuButton, #themeButton{
  border:none; border-radius:5px; cursor:pointer;
}
#menuButton{
  background:#3b82f6; color:white; font-size:22px; padding:6px 10px;
}
#menuButton:hover{ background:#2563eb; }

#themeButton{
  background:#fbbf24; color:white; font-size:14px; padding:6px 10px;
}

#sidebar{
  position:fixed; top:0; left:-280px;
  width:280px; height:100%;
  background:#1e293b;
  color:white;
  padding:20px;
  transition:left 0.3s;
  z-index:1000;
  display:flex;
  flex-direction:column;
  gap:15px;
  overflow-y:auto;
}
#sidebar.active{ left:0; }
#sidebar a{
  color:white; text-decoration:none; padding:8px 12px; border-radius:5px;
}
#sidebar a:hover{ background:#334155; }

.container{
  padding:80px 20px;
  max-width:1200px;
  margin:auto;
}

.panel{
  background:white;
  padding:15px;
  border-radius:10px;
  box-shadow:0 2px 6px rgba(0,0,0,0.08);
  margin-bottom:20px;
}
.panel.dark{ background:#334155; color:white; }

ul#alertsList{
  list-style:none;
  padding:0;
}
ul#alertsList li{
  padding:10px;
  margin-bottom:8px;
  border-radius:5px;
  font-weight:bold;
}
li.critical{ background:#f87171; color:white; }
li.warning{ background:#facc15; color:black; }

h1{ margin-top:60px; margin-bottom:20px; text-align:center; }
</style>
</head>
<body>

<div class="topbar">
  <button id="menuButton" onclick="toggleSidebar()">☰</button>
  <div>IoT Monitoring System</div>
  <div>
    🟢 Connected
    <button id="themeButton" onclick="toggleTheme()">🌗</button>
  </div>
</div>

<div id="sidebar">
  <h2>Menu</h2>
  <a href="index.html">🏠 Dashboard</a>
  <a href="alerts.html">🚨 Alerts</a>
  <a href="devices.html">🖥️ Devices</a>
  <a href="settings.html">⚙️ Settings</a>
  <a href="help.html">❓ Help</a>
  <a href="about.html">ℹ️ About</a>
  <a href="logout.html">🔒 Logout</a>
</div>

<div class="container">
  <h1>Live Alerts</h1>
  <div class="panel">
    <ul id="alertsList">
      <li>No alerts</li>
    </ul>
  </div>
</div>

<script>
function toggleSidebar(){
  document.getElementById("sidebar").classList.toggle("active");
  document.getElementById("menuButton").classList.toggle("open");
}

function toggleTheme(){
  document.body.classList.toggle("dark");
  document.querySelectorAll(".panel").forEach(el=>el.classList.toggle("dark"));
  localStorage.setItem("theme", document.body.classList.contains("dark")?"dark":"light");
}

/* Raspberry Pi IP */
const raspberryIP = "192.168.43.180";

/* جلب التنبيهات */
async function fetchAlerts(){
  try{
    const response = await fetch(`http://${raspberryIP}/alerts`);
    const alerts = await response.json();
    renderAlerts(alerts);
  }catch(err){
    console.error("Failed to fetch alerts:", err);
    document.getElementById("alertsList").innerHTML = "<li>Failed to fetch alerts</li>";
  }
}

function renderAlerts(alerts){
  const list = document.getElementById("alertsList");
  if(alerts.length === 0){
    list.innerHTML = "<li>No alerts</li>";
    return;
  }
  list.innerHTML = "";
  alerts.forEach(a=>{
    const cls = a.level.toLowerCase()==="critical"?"critical":"warning";
    const time = new Date(a.time).toLocaleTimeString();
    list.innerHTML += `<li class="${cls}">[${time}] ${a.message}</li>`;
  });
}

/* تحديث تلقائي كل 5 ثواني */
fetchAlerts();
setInterval(fetchAlerts,5000);

/* تحميل الثيم */
const theme = localStorage.getItem("theme") || "light";
document.body.classList.toggle("dark", theme === "dark");
</script>

</body>
</html>