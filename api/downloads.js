import { Redis } from '@upstash/redis';

// Initialize Redis from environment variables
// (UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN)
const redis = Redis.fromEnv();

export default async function handler(request, response) {
    if (request.method === 'GET') {
        // Fetch all keys started with wallpaper:
        // This is a simple approach, in a real app might want to optimize
        // For now we assume we know the IDs or just return them all

        // Actually, Vercel KV REST API might be easier used by specific keys.
        // Let's rely on the frontend passing IDs or just fetch specific known ones if list is small.
        // Better: Helper to get all.

        // Simplest: The frontend sends a request for the map of all downloads.
        // We can store a hash named 'wallpaper_downloads'

        try {
            const downloads = await redis.hgetall('wallpaper_downloads');
            return response.status(200).json(downloads || {});
        } catch (error) {
            console.error('Redis Error:', error);
            return response.status(500).json({ error: 'Failed to fetch data' });
        }
    }

    if (request.method === 'POST') {
        const { wallpaperId } = request.body;

        if (!wallpaperId) {
            return response.status(400).json({ error: 'Missing wallpaperId' });
        }

        try {
            // Increment the count for the specific wallpaper in the hash
            const newCount = await redis.hincrby('wallpaper_downloads', wallpaperId, 1);
            return response.status(200).json({ count: newCount });
        } catch (error) {
            console.error('Redis Error:', error);
            return response.status(500).json({ error: 'Failed to increment count' });
        }
    }

    return response.status(405).json({ error: 'Method not allowed' });
}
