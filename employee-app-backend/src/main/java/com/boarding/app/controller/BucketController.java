package com.boarding.app.controller;

import com.boarding.app.awss3.BucketManagerService;
import com.boarding.app.handler.FileNotFoundInBucketException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayOutputStream;
import java.util.List;

@RestController
@RequestMapping("s3/")
public class BucketController {

    @Autowired
    private BucketManagerService bucketManagerService;

    @GetMapping("reports/all")
    private List<String> listAllFiles(){
        return bucketManagerService.listPDFReports("employeemanagement-bucket", "dailyTimesheetPDFS/");
    }


    @GetMapping("reports/{keyname}")
    private ResponseEntity getFileByKeyname(@PathVariable String keyname){

        ByteArrayOutputStream downloadInputStream = bucketManagerService.downloadFile("employeemanagement-bucket", "dailyTimesheetPDFS/" + keyname);

        if(downloadInputStream == null){
            throw new FileNotFoundInBucketException();
        }

        return ResponseEntity.ok()
                .contentType(contentType(keyname))
                .header(HttpHeaders.CONTENT_DISPOSITION,"attachment; filename=\"" + keyname + "\"")
                .body(downloadInputStream.toByteArray());


    }

    private MediaType contentType(String keyname) {
        String[] arr = keyname.split("\\.");
        String type = arr[arr.length-1];
        switch(type) {
            case "txt": return MediaType.TEXT_PLAIN;
            case "png": return MediaType.IMAGE_PNG;
            case "jpg": return MediaType.IMAGE_JPEG;
            case "pdf": return MediaType.APPLICATION_PDF;
            default: return MediaType.APPLICATION_OCTET_STREAM;
        }
    }

}
