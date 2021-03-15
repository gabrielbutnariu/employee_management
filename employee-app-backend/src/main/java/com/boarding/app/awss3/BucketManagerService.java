package com.boarding.app.awss3;

import com.amazonaws.AmazonClientException;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;


@Service
public class BucketManagerService {
    Logger logger = LoggerFactory.getLogger(getClass());

    private final AmazonS3 s3Client;

    public BucketManagerService(){
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

    public List<String> listPDFReports(String bucketName, String prefix){
        ObjectListing listing = s3Client.listObjects(bucketName, prefix);
        List<S3ObjectSummary> summaries = listing.getObjectSummaries();

        while(listing.isTruncated()){
            listing = s3Client.listNextBatchOfObjects(listing);
            summaries.addAll(listing.getObjectSummaries());
        }

        List<String> keysList = new ArrayList<>();

        for(S3ObjectSummary summary : summaries){
            logger.info(summary.getKey());
            String key = summary.getKey();
            keysList.add(key.substring(prefix.length(), key.length()));
        }

        keysList.remove(0);

        return keysList;
    }

    public ByteArrayOutputStream downloadFile(String bucketName,String keyName){

        try {
            S3Object s3object = s3Client.getObject(new GetObjectRequest(bucketName, keyName));

            InputStream inputStream = s3object.getObjectContent();
            ByteArrayOutputStream downloadFile = new ByteArrayOutputStream();
            int len;
            byte[] buffer = new byte[4096];
            while ((len = inputStream.read(buffer, 0, buffer.length)) != -1) {
                downloadFile.write(buffer, 0, len);
            }

            return downloadFile;
        } catch (IOException ioe) {
            logger.error("IOException: " + ioe.getMessage());
        } catch (AmazonServiceException ase) {
            logger.info("sCaught an AmazonServiceException from GET requests, rejected reasons:");
            logger.info("Error Message:    " + ase.getMessage());
            logger.info("HTTP Status Code: " + ase.getStatusCode());
            logger.info("AWS Error Code:   " + ase.getErrorCode());
            logger.info("Error Type:       " + ase.getErrorType());
            logger.info("Request ID:       " + ase.getRequestId());
            throw ase;
        } catch (AmazonClientException ace) {
            logger.info("Caught an AmazonClientException: ");
            logger.info("Error Message: " + ace.getMessage());
            throw ace;
        }


        return null;
    }
}
