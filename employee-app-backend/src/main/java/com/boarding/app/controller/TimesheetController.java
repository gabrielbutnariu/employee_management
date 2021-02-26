package com.boarding.app.controller;

        import com.boarding.app.models.Timesheet;
        import com.boarding.app.models.TimesheetDTO;
        import com.boarding.app.services.TimesheetService;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.http.HttpStatus;
        import org.springframework.web.bind.annotation.*;

        import javax.transaction.Transactional;
        import java.util.List;

@RestController
@RequestMapping("/timesheet")
public class TimesheetController {
    @Autowired
    private TimesheetService timesheetService;

    @GetMapping
    public List<TimesheetDTO> listAll(){
        return timesheetService.list();
    }

    @GetMapping
    @RequestMapping("{UUID}")
    public List<TimesheetDTO> listByEmployeeId(@PathVariable String UUID){
        return timesheetService.getByEmpUUID(UUID);
    }

    //this one can be used to add checkin and checkout or just checkin
    @PostMapping("{UUID}/checkin")
    @ResponseStatus(HttpStatus.CREATED)
    public Timesheet addEntry(@RequestBody final Timesheet timesheet,@PathVariable String UUID){
        return timesheetService.addCheckinDate(timesheet,UUID);
    }

    @RequestMapping(value = "{UUID}/checkout",method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)

    public Timesheet updateCheckoutDate(@PathVariable String UUID,@RequestBody Timesheet timesheet){
        return timesheetService.addCheckoutDate(UUID,timesheet);
    }

    //deleting all the entry for a specific employee
    @Transactional
    @RequestMapping(value = "{UUID}/all",method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    public void deleteByEmployeeId(@PathVariable String UUID){
        timesheetService.deleteTimesheetByEmpUUID(UUID);
    }

    //deleting one entry for a employee
    @RequestMapping(value = "{id}",method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    public void deleteById(@PathVariable Long id){
        timesheetService.deleteTimesheetById(id);
    }

}
