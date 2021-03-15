package com.boarding.app.handler;

public class FileNotFoundInBucketException extends RuntimeException{
    public FileNotFoundInBucketException(){
        super("The requested file does not exist. Please try another one");
    }
}