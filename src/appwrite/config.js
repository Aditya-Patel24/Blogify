import conf from '../conf/conf'; // Ensure path is correct
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, feturedImage, status, userId }) {
        try {
            console.log("Creating Post:", { title, slug, content, feturedImage, status, userId });
            if (!/^[a-zA-Z0-9._-]{1,36}$/.test(userId)) {
                throw new Error('Invalid userId format');
            }
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    slug,
                    content,
                    feturedImage,
                    status,
                    userId,
                }
            );
        } catch (error) {
            console.error("Service :: createPost :: error", error.message);
            throw new Error("Failed to create post: " + error.message);
        }
    }
    
    async updatePost(postId, { title, slug, content, feturedImage, status }) {
        try {
            console.log("Updating Post:", { postId, title, slug, content, feturedImage, status });
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                postId,
                {
                    title,
                    slug,
                    content,
                    feturedImage,
                    status,
                }
            );
        } catch (error) {
            console.error("Service :: updatePost :: error", error.message);
            throw new Error("Failed to update post: " + error.message);
        }
    }
    
    async deletePost(postId) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                postId
            );
            return true;
        } catch (error) {
            console.error("Service :: deletePost :: error", error.message);
            return false;
        }
    }

    async getPost(postId) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                postId
            );
        } catch (error) {
            console.error("Service :: getPost :: error", error.message);
            throw new Error("Failed to fetch post: " + error.message);
        }
    }

    async getPosts(queries = []) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.error("Service :: getPosts :: error", error.message);
            throw new Error("Failed to fetch posts: " + error.message);
        }
    }

    async uploadFile(file) {
        try {
            const response = await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
            return response;
        } catch (error) {
            console.error("Service :: uploadFile :: error", error.message);
            throw new Error("File upload failed: " + error.message);
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.error("Service :: deleteFile :: error", error.message);
            return false;
        }
    }

    getFilePreview(fileId) {
        return `${conf.appwriteUrl}/storage/buckets/${conf.appwriteBucketId}/files/${fileId}/view?project=${conf.appwriteProjectId}`;
    }
}

const service = new Service();
export default service;
