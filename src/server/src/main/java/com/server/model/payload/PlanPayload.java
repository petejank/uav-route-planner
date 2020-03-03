package com.server.model.payload;

import com.server.entity.Plan;

import java.util.List;

public class PlanPayload {
    private List<Plan> plans;

    public PlanPayload(List<Plan> plans) {
        setPlans(plans);
    }

    public List<Plan> getPlans() {
        return plans;
    }

    public void setPlans(List<Plan> plans) {
        this.plans = plans;
    }
}
