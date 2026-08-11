import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

export const FEATURE_FLAG_METADATA = 'feature_flag';

export function FeatureFlag(flagName: string) {
  return (target: object, key?: string | symbol, descriptor?: PropertyDescriptor) => {
    Reflect.defineMetadata(FEATURE_FLAG_METADATA, flagName, descriptor ? descriptor.value : target);
  };
}

@Injectable()
export class FeatureFlagGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const flagName = this.reflector.get<string>(FEATURE_FLAG_METADATA, context.getHandler());
    if (!flagName) {
      return true;
    }

    const enabled = (process.env.FEATURE_FLAGS ?? '').split(',').map((flag) => flag.trim()).filter(Boolean);
    if (!enabled.includes(flagName)) {
      throw new ForbiddenException(`Feature flag ${flagName} is disabled`);
    }

    return true;
  }
}
