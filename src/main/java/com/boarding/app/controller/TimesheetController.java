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
    @RequestMapping("{emp_id}")
    public List<TimesheetDTO> listByEmployeeId(@PathVariable Long emp_id){
        return timesheetService.getByEmpId(emp_id);
    }

    //this one can be used to add checkin and checkout or just checkin
    @PostMapping("{emp_id}/checkin")
    @ResponseStatus(HttpStatus.CREATED)
    public Timesheet addEntry(@RequestBody final Timesheet timesheet){
        return timesheetService.addCheckinDate(timesheet);
    }

    @RequestMapping(value = "{emp_id}/checkout",method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)

    public Timesheet updateCheckoutDate(@PathVariable Long emp_id,@RequestBody Timesheet timesheet){
        return timesheetService.addCheckoutDate(emp_id,timesheet);
    }

    //deleting all the entry for a specific employee
    @Transactional
    @RequestMapping(value = "{emp_id}/all",method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    public void deleteByEmployeeId(@PathVariable Long emp_id){
        timesheetService.deleteTimesheetByEmpId(emp_id);
    }

    //deleting one entry for a employee
    @RequestMapping(value = "{id}",method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    public void deleteById(@PathVariable Long id){
        timesheetService.deleteTimesheetById(id);
    }

}
