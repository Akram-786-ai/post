import conf from '../conf/conf.js'
import { Client, Databases, ID, Storage, Query } from 'appwrite'


export class Service {
    Client = new this.Client();
    databases;
    bucket;

    constructor() {
        this.Client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.databases = new Databases(this.Client);
        this.bucket = new Storage(this.Client);

    }

    async createPost(title, slug, content, featuredImage, status, userId) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, {
                title,
                content,
                featuredImage,
                status,
                userId,
            }
            )
        } catch (error) {
            console.log('Appwrite service :: getCurrentUser :: error', error);

        }
    }

    async updatePost(slug, { title, content, featuredImage, status, userId }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log('Appwrite service :: getCurrentUser :: error', error);

        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
            return true
        } catch (error) {
            console.log('Appwrite service :: getCurrentUser :: error', error);
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteCollectionId,
                conf.appwriteDatabaseId,
                slug,
            )
        } catch (error) {
            console.log('Appwrite service :: getCurrentUser :: error', error);
            return false
        }
    }

    async getPosts(Queries = [Query.equal('status', "active")]) {
        try {

            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                Queries,
            )
        } catch (error) {
            console.log('Appwrite service :: getCurrentUser :: error', error);
            return false
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log('Appwrite service :: getCurrentUser :: error', error);
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                fileId
            )
            return true

        } catch (error) {
            console.log('Appwrite service :: getCurrentUser :: error', error);
            return false
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service()
export default service