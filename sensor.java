package com.iot.dashboard;

import java.util.ArrayList;
import java.util.List;

public class Sensor {
    private int id;
    private String name;
    private double value;
    private String unit;
    private double min;
    private double max;
    private List<Double> history = new ArrayList<>();
    private List<String> labels = new ArrayList<>();

    public Sensor(int id, String name, double value, String unit, double min, double max) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.unit = unit;
        this.min = min;
        this.max = max;
    }

    // Getters & Setters
    public int getId() { return id; }
    public String getName() { return name; }
    public double getValue() { return value; }
    public void setValue(double value) { this.value = value; }
    public String getUnit() { return unit; }
    public double getMin() { return min; }
    public void setMin(double min) { this.min = min; }
    public double getMax() { return max; }
    public void setMax(double max) { this.max = max; }
    public List<Double> getHistory() { return history; }
    public List<String> getLabels() { return labels; }
}