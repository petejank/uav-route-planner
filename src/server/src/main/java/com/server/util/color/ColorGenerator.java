package com.server.util.color;

import java.awt.*;
import java.util.Random;


public class ColorGenerator {
    private static final float LUMINANCE = 0.9f;
    private static final int SATURATION_BOUND = 2000;
    private static final int SATURATION_PADDING = 1000;
    private static final float SATURATION_DIVIDER = 10000f;

    // Generates random pastel-like color
    public static Color random() {
        Random rand = new Random();

        float saturation = (rand.nextInt(SATURATION_BOUND) + SATURATION_PADDING) / SATURATION_DIVIDER;
        Color color = Color.getHSBColor(rand.nextFloat(), saturation, LUMINANCE);

        return color;
    }
}
