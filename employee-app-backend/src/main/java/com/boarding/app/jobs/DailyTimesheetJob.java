package com.boarding.app.jobs;
import com.boarding.app.awss3.BucketManagerService;
import com.boarding.app.models.TimesheetDTO;
import com.boarding.app.openPDF.PDFManager;
import com.boarding.app.services.TimesheetService;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Component
public class DailyTimesheetJob implements Job{
    Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private  TimesheetService timesheetService;
    @Autowired
    private BucketManagerService bucketManagerService;


    @Override
    public void execute(JobExecutionContext jobExecutionContext){


        Date date;
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);

        calendar.add(Calendar.DATE, -10);
        date = calendar.getTime();
        Timestamp todayTimestamp = new Timestamp(date.getTime());

        calendar.add(Calendar.DATE, 1);
        date = calendar.getTime();
        Timestamp tomorrowTimestamp = new Timestamp(date.getTime());

        List<TimesheetDTO> list = timesheetService.getBetweenTimestamps(todayTimestamp,tomorrowTimestamp);

        PDFManager pdfManager = new PDFManager();
        String pdfPath = "GeneratedPDFS\\DailyTimesheet_" + todayTimestamp.toString().substring(0,10) + ".pdf";
        String s3Path = "dailyTimesheetPDFS/DailyTimesheet_" + todayTimestamp.toString().substring(0,10) + ".pdf";
        pdfManager.createTablePDF(list, pdfPath);
        logger.info(pdfPath);

        bucketManagerService.addFile(s3Path, pdfPath);
        bucketManagerService.listPDFReports("employeemanagement-bucket", "dailyTimesheetPDFS/");
    }
}