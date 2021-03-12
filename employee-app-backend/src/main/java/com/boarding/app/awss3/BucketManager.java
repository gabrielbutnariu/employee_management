package com.boarding.app.awss3;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.lowagie.text.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;

public class BucketManager {
    Logger logger = LoggerFactory.getLogger(getClass());

    private final AmazonS3 s3Client;

    public BucketManager(){
        BasicAWSCredentials awsCredentials = new BasicAWSCredentials(AWSCredentials.ACCESS_KEY_ID,AWSCredentials.SECRET_ACCESS_KEY);
        Regions region = Regions.EU_CENTRAL_1;
        s3Client = AmazonS3ClientBuilder.standard()
                .withRegion(region)
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .build();
    }

    public void addFile(String s3Path, String fileName){

        PutObjectRequest request = new PutObjectRequest(AWSCredentials.BUCKET_NAME, s3Path, new File(fileName));
        s3Client.putObject(request);
        logger.info("Upload File Request Completed");
    }
}
