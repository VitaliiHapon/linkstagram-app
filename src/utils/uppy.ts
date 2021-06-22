import AwsS3 from "@uppy/aws-s3";
import Uppy from "@uppy/core";

export function createUppy(maxFiles: number) {
    const uppy = Uppy({
        meta: { type: "avatar" },
        restrictions: {
            maxNumberOfFiles: 8,
            allowedFileTypes: ["image/*"],
        },
        autoProceed: true,
    });

    uppy.use(AwsS3, {
        resume: true,
        retryDelays: [0, 1000, 3000, 5000],
        endpoint: "https://linkstagram-api.ga/",
        companionUrl: "https://linkstagram-api.ga/",
    });

    return uppy;
}

export type PhotosAttribute = {
    image: {
        id: string
        storage: string
        metadata: {
            size: number
            mime_type: string
            filename: string 
        }
    }
}

export function uploadFiles(uppy: any, files: any, onReady: (data: PhotosAttribute[]) => void) {

    files.forEach((file: any) => {
        const { name, type } = file;
        uppy.addFile({
            name,
            type,
            data: file,
            source: "cache",
        });
    });

    uppy.upload().then((x: any) => {
        let data: any = x.successful;
        let result = data.map((img: any) => {
            const { key, name, type } = img.meta;
            let id = key.split("/")[1];

            return {
                image: {
                    id,
                    storage: "cache",
                    metadata: {
                        size: img.size,
                        mime_type: type,
                        filename: name
                    }
                }
            };
            
        });
        onReady(result);
        uppy.cancelAll();
    });
}