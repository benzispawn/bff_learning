export class CacheService {
  private readonly cache = new Map<string, { value: unknown; expiresAt: number }>();

  get<T>(key: string): T | undefined {
    const entry = this.cache.get(key);
    if (!entry) {
      return undefined;
    }

    if (entry.expiresAt <= Date.now()) {
      this.cache.delete(key);
      return undefined;
    }

    return entry.value as T;
  }

  getOrSet<T>(key: string, factory: () => T, ttlSeconds = 30): T {
    const cached = this.get<T>(key);
    if (cached !== undefined) {
      return cached;
    }

    const value = factory();
    this.cache.set(key, { value, expiresAt: Date.now() + ttlSeconds * 1000 });
    return value;
  }

  invalidate(key: string): void {
    this.cache.delete(key);
  }
}
