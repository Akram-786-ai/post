import conf from '../conf/conf.js'
import { Client, Databases, ID, Storage, Query } from 'appwrite'
import authService from './Auth.js'

class Service {
    constructor() {
        this.client = new Client()
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    // Create a new post; slug defaults to a unique ID if not provided
    async createPost({ title, slug = ID.unique(), content, featuredImage, status }) {
        try {
            const user = await authService.getCurrentUser()
            if (!user || !user.$id) {
                throw new Error('User not authenticated')
            }

            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId: user.$id,
                }
            )
        } catch (error) {
            console.error('Appwrite service :: createPost :: error', error)

        }
    }

    // Update an existing post by document ID
    async updatePost(documentId, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                documentId,
                { title, content, featuredImage, status }
            )
        } catch (error) {
            console.error('Appwrite service :: updatePost :: error', error)

        }
    }

    // Delete a post by document ID
    async deletePost(documentId) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                documentId
            )
            return true
        } catch (error) {
            console.error('Appwrite service :: deletePost :: error', error)
            return false
        }
    }

    // Retrieve a single post by document ID
    async getPost(documentId) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                documentId
            )
        } catch (error) {
            console.error('Appwrite service :: getPost :: error', error)
            return false
        }
    }

    // List posts with optional filters (defaults to "active" status)
    async getPosts(queries = [Query.equal('status', 'active')]) {

        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.error('Appwrite service :: getPosts :: error', error)
            return false
        }
    }

    // Upload a file to storage
    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.error('Appwrite service :: uploadFile :: error', error)
            return false
        }
    }

    // Delete a file by file ID
    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(fileId)
            return true
        } catch (error) {
            console.error('Appwrite service :: deleteFile :: error', error)
            return false
        }
    }

    // Get a preview URL for a file
    getFilePreview(fileId) {
        return this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service()
export default service
