import {
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { FEATURE_FLAG_METADATA, FeatureFlagGuard } from './feature-flag.guard';

describe('FeatureFlagGuard', () => {
  let guard: FeatureFlagGuard;
  let reflector: { get: jest.Mock };
  let previousFeatureFlags: string | undefined;

  beforeEach(() => {
    previousFeatureFlags = process.env.FEATURE_FLAGS;
    reflector = {
      get: jest.fn(),
    };
    guard = new FeatureFlagGuard(reflector as unknown as Reflector);
  });

  afterEach(() => {
    if (previousFeatureFlags === undefined) {
      delete process.env.FEATURE_FLAGS;
      return;
    }

    process.env.FEATURE_FLAGS = previousFeatureFlags;
  });

  it('returns true when the feature flag is enabled', () => {
    process.env.FEATURE_FLAGS = 'premium';
    reflector.get.mockReturnValue('premium');

    const context = {
      getHandler: jest.fn(),
    } as unknown as ExecutionContext;

    expect(guard.canActivate(context)).toBe(true);
    expect(reflector.get).toHaveBeenCalledWith(FEATURE_FLAG_METADATA, context.getHandler());
  });

  it('throws ForbiddenException when the feature flag is disabled', () => {
    delete process.env.FEATURE_FLAGS;
    reflector.get.mockReturnValue('premium');

    const context = {
      getHandler: jest.fn(),
    } as unknown as ExecutionContext;

    let thrownError: unknown;

    try {
      guard.canActivate(context);
    } catch (error) {
      thrownError = error;
    }

    expect(thrownError).toBeInstanceOf(ForbiddenException);
    expect(thrownError).not.toBeInstanceOf(UnauthorizedException);
  });

  it('returns true when no feature flag metadata is present', () => {
    reflector.get.mockReturnValue(undefined);

    const context = {
      getHandler: jest.fn(),
    } as unknown as ExecutionContext;

    expect(guard.canActivate(context)).toBe(true);
    expect(reflector.get).toHaveBeenCalledWith(FEATURE_FLAG_METADATA, context.getHandler());
  });
});