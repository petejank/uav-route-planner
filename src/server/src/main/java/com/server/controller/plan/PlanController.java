package com.server.controller.plan;

import com.server.configuration.authentication.annotation.IsAuthenticated;
import com.server.controller.plan.exception.NoPlanFoundException;
import com.server.entity.Plan;
import com.server.model.PlanModel;
import com.server.repository.PlanRepository;
import com.server.model.payload.PlanPayload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/plan")
public class PlanController {
    private static final String controllerName = "PLAN";

    @Autowired
    private PlanRepository planRepository;

    @GetMapping
    @IsAuthenticated
    public PlanPayload get() {
        return PlanModel.createPayload(planRepository.findAllOrderByCreatedAt());
    }

    @PostMapping
    @IsAuthenticated
    public PlanPayload post() {
        Plan plan = PlanModel.create();
        planRepository.save(plan);

        return PlanModel.createPayload(planRepository.findAllOrderByCreatedAt());
    }

    @DeleteMapping("/{planId}")
    @IsAuthenticated
    public PlanPayload delete(@PathVariable String planId) throws NoPlanFoundException {
        Optional<Plan> planOpt = planRepository.findById(planId);
        if (!planOpt.isPresent()) throw new NoPlanFoundException(controllerName, planId);

        planRepository.delete(planOpt.get());

        return PlanModel.createPayload(planRepository.findAllOrderByCreatedAt());
    }
}
