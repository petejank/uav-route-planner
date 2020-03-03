package com.server.model;

import com.server.entity.Plan;
import com.server.util.color.ColorFormatter;
import com.server.util.color.ColorGenerator;
import com.server.model.payload.PlanPayload;

import java.util.List;

public class PlanModel {
    public static Plan create() {
        Plan plan = new Plan();
        plan.setColor(ColorFormatter.formatToHex(ColorGenerator.random()));

        return plan;
    }

    public static PlanPayload createPayload(List<Plan> plans) {
        return new PlanPayload(plans);
    }
}
