package com.boarding.app.controller;

import com.boarding.app.models.TimesheetDTO;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class TimesheetControllerTest {

    @Test
    void listAll() {
        TimesheetController timesheetController = new TimesheetController();
        List<TimesheetDTO> response = timesheetController.listAll();
        //assertArrayEquals(,response);
    }
}