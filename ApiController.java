package com.iot.dashboard;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@RestController
public class ApiController {

    // مؤقتًا بيانات حساسات وهمية
    private List<Sensor> sensors = Arrays.asList(
        new Sensor(1, "Temperature", 25, "°C", 15, 30),
        new Sensor(2, "Humidity", 60, "%", 30, 70),
        new Sensor(3, "Gas", 200, "ppm", 100, 300),
        new Sensor(4, "Pressure", 1013, "hPa", 980, 1050)
    );

    @GetMapping("/devices")
    public List<Sensor> getDevices() {
        // هنا يمكنك إضافة منطق لجلب البيانات من Raspberry Pi عبر الشبكة
        sensors.forEach(s -> {
            s.setValue(Math.round((s.getMin() + Math.random() * (s.getMax()-s.getMin()))*10)/10.0);
            s.getHistory().add(s.getValue());
            s.getLabels().add(LocalDateTime.now().toLocalTime().toString());
        });
        return sensors;
    }

    @GetMapping("/alerts")
    public List<Alert> getAlerts() {
        // تنبيهات وهمية
        Alert a1 = new Alert("Critical", "Temperature above max!", LocalDateTime.now());
        Alert a2 = new Alert("Warning", "Humidity below min!", LocalDateTime.now());
        return Arrays.asList(a1, a2);
    }
}