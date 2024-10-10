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
      await this.client.connect(); // Bağlantıyı kur
      console.log("Connected to Redis"); // Başarıyla bağlandığında mesajı göster
    } catch (error) {
      console.error('Failed to connect to Redis:', error);
    }
  }

  async getCache(key) {  // Örnek metot
    try {
      const data = await this.client.get(key); // 'this.client' ile erişim
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

  async setCache(key, value) {  // Örnek metot
    try {
      await this.client.set(key, JSON.stringify(value)); // 'this.client' ile erişim
      console.log(`Cache set for key: ${key}`);
    } catch (error) {
      console.error('Error setting cache:', error);
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;
