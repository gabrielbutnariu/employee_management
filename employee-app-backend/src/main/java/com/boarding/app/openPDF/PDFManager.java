package com.boarding.app.openPDF;

import com.boarding.app.models.TimesheetDTO;
import com.google.gson.Gson;
import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Font;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.util.List;

public class PDFManager {
    Logger logger = LoggerFactory.getLogger(getClass());


    public void createTablePDF(List<TimesheetDTO> timesheetDTOList, String PDFPath){
        try{
            Font font = new Font(Font.TIMES_ROMAN, 14, Font.BOLD);
            Document document = new Document();
            PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(PDFPath));

            PdfPTable table = new PdfPTable(4);
            table.setWidthPercentage(100);
            table.setWidths(new float[] {6.0f, 6.0f, 6.0f, 6.0f});

            String[] cols = {"First Name", "Last Name", "Check-In Date", "Check-Out Date"};
            PdfPCell cell = new PdfPCell();
            for(String col: cols){
                cell.setPhrase(new Phrase(col, font));
                table.addCell(cell);
            }

            for(TimesheetDTO timesheetDTO: timesheetDTOList){
                table.addCell(timesheetDTO.getEmployeeDTO().getFirstName());
                table.addCell(timesheetDTO.getEmployeeDTO().getLastName());
                table.addCell(timesheetDTO.getCheckinDate().toString().substring(0,18));
                if(timesheetDTO.getCheckoutDate() == null){
                    table.addCell("Pending Check-Out");
                }
                else table.addCell(timesheetDTO.getCheckoutDate().toString().substring(0,18));
            }

            document.open();
            document.add(table);
            document.close();
            writer.close();
            logger.info("Daily Timesheet PDF Generated successfully");

        }
        catch (DocumentException | FileNotFoundException e){
            logger.error(e.getMessage(), e);
        }

    }
}
