package com.zpi.backend.configuration;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.*;
import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.image.exception.InvalidFileTypeException;
import com.zpi.backend.image.dto.FileDTO;
import com.zpi.backend.image.exception.FileWriteException;
import com.zpi.backend.image.exception.GCPFileUploadException;
import net.bytebuddy.utility.RandomString;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.concurrent.ThreadLocalRandom;

@Component
public class DataBucketUtil {

    private static final String URL = "https://storage.googleapis.com/";

    @Value("${gcp.config.file}")
    private String gcpConfigFile;

    @Value("${gcp.project.id}")
    private String gcpProjectId;

    @Value("${gcp.bucket.id}")
    private String gcpBucketId;

    @Value("${gcp.dir.name}")
    private String gcpDirectoryName;


    public FileDTO uploadFile(MultipartFile multipartFile, String fileName, String contentType) {

        try{

            File file = convertFile(multipartFile);
            byte[] fileData = FileUtils.readFileToByteArray(file);
            // Delete file that saves itself in project
            file.delete();

            InputStream inputStream = new ClassPathResource(gcpConfigFile).getInputStream();

            StorageOptions options = StorageOptions.newBuilder()
                    .setProjectId(gcpProjectId)
                    .setCredentials(GoogleCredentials.fromStream(inputStream))
                    .build();

            Storage storage = options.getService();
            Bucket bucket = storage.get(gcpBucketId,Storage.BucketGetOption.fields());

            RandomString id = new RandomString(6, ThreadLocalRandom.current());
            String extension = checkFileExtension(fileName);

            String blobName = gcpDirectoryName + "/" +
                    fileName.replaceFirst(extension, "")
                            .replaceAll(" ", "-")
                    + "-" + id.nextString() + extension;
            BlobInfo blobInfo = BlobInfo.newBuilder(bucket.getName(),blobName)
                    .setContentType(contentType)
                    .setContentDisposition("inline")
                    .build();

            Blob blob = storage.create(blobInfo, fileData);

            if(blob != null){
                String image_url = URL+gcpBucketId+"/"+blobName;
                return new FileDTO(blob.getName(), image_url);
            } else {
                throw new GCPFileUploadException("An error occurred while storing data to GCS");
            }
        } catch (FileWriteException | InvalidFileTypeException e){
            throw e;
        } catch (Exception e){
            throw new GCPFileUploadException(e.getMessage());
        }
    }

    private File convertFile(MultipartFile file) throws FileWriteException{

        try{
            if(file.getOriginalFilename() == null){
                throw new BadRequestException("Original file name is null");
            }
            File convertedFile = new File(file.getOriginalFilename());
            FileOutputStream outputStream = new FileOutputStream(convertedFile);
            outputStream.write(file.getBytes());
            outputStream.close();
            return convertedFile;
        }catch (Exception e){
            throw new FileWriteException("An error has occurred while converting the file");
        }
    }

    private String checkFileExtension(String fileName) {
        if(fileName != null && fileName.contains(".")){
            String[] extensionList = {".png", ".jpeg", ".jpg"};

            for(String extension: extensionList) {
                if (fileName.endsWith(extension)) {
                    return extension;
                }
            }
        }
        throw new InvalidFileTypeException("Not a permitted file type");
    }
}