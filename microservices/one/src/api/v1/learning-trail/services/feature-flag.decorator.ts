import { ForbiddenException } from '@nestjs/common';

export function FeatureFlag(flagName: string) {
  return function (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: unknown[]) {
      const enabledFlags = (process.env.FEATURE_FLAGS ?? '')
        .split(',')
        .map((flag) => flag.trim())
        .filter(Boolean);

      if (!enabledFlags.includes(flagName)) {
        throw new ForbiddenException(`Feature flag ${flagName} is disabled`);
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
