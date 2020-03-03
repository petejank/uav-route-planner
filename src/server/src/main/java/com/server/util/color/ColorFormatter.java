package com.server.util.color;

import java.awt.*;

public class ColorFormatter {
    private final static String hexFormat = "#%02x%02x%02x";

    public static String formatToHex(Color color) {
        return String.format(hexFormat, color.getRed(), color.getGreen(), color.getBlue());
    }
}
