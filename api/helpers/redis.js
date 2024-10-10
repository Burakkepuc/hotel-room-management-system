import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

class RedisClient {
  constructor() {
    this.client = createClient();
    this.connect();
  }



  async connect() {
    try {
      await this.client.connect();
      console.log("Connected to Redis");
    } catch (error) {
      console.error('Failed to connect to Redis:', error);
    }
  }

  async getCache(key) {
    try {
      const data = await this.client.get(key);
      if (data) {
        console.log(`Cache hit for key: ${key}`);
        return JSON.parse(data);
      } else {
        console.log(`Cache miss for key: ${key}`);
        return null;
      }
    } catch (error) {
      console.error('Error getting cache:', error);
      return null;
    }
  }

  async setCache(key, value) {
    try {
      await this.client.set(key, JSON.stringify(value));
      console.log(`Cache set for key: ${key}`);
    } catch (error) {
      console.error('Error setting cache:', error);
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;
