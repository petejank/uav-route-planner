package com.server.controller.plan.point;

import com.server.configuration.authentication.annotation.IsAuthenticated;
import com.server.controller.plan.exception.NoPlanFoundException;
import com.server.controller.plan.point.request.PostRequest;
import com.server.controller.session.SessionController;
import com.server.entity.Plan;
import com.server.entity.Point;
import com.server.model.PlanModel;
import com.server.model.PointModel;
import com.server.repository.PlanRepository;
import com.server.repository.PointRepository;
import com.server.model.payload.PlanPayload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/plan/{planId}/point")
@Transactional
public class PointController {
    private static final String controllerName = SessionController.class.toString();

    @Autowired
    private PointRepository pointRepository;

    @Autowired
    private PlanRepository planRepository;

    @PostMapping
    @IsAuthenticated
    public PlanPayload post(@PathVariable String planId, @Valid @RequestBody PostRequest req)
            throws NoPlanFoundException {
        Optional<Plan> planOpt = planRepository.findById(planId);
        if (!planOpt.isPresent()) throw new NoPlanFoundException(controllerName, planId);

        Point point = PointModel.create(req.lat, req.lng);
        point.setPlan(planOpt.get());
        pointRepository.save(point);

        return PlanModel.createPayload(planRepository.findAllOrderByCreatedAt());
    }
}
