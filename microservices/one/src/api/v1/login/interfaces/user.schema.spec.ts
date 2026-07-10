import { Schema } from 'mongoose';
import { UserSchema } from './user.schema'; // Adjust the import path as necessary

describe('UserSchema', () => {
  it('should be defined', () => {
    expect(UserSchema).toBeDefined();
  });

  it('should be an instance of Schema', () => {
    expect(UserSchema).toBeInstanceOf(Schema);
  });

  describe('username field', () => {
    it('should exist', () => {
      expect(UserSchema.path('username')).toBeDefined();
    });

    it('should be of type String', () => {
      expect(UserSchema.path('username')).toBeInstanceOf(Schema.Types.String);
    });

    it('should be unique', () => {
      expect(UserSchema.path('username').options.unique).toBe(true);
    });
  });

  describe('hashedPassword field', () => {
    it('should exist', () => {
      expect(UserSchema.path('hashedPassword')).toBeDefined();
    });

    it('should be of type String', () => {
      expect(UserSchema.path('hashedPassword')).toBeInstanceOf(
        Schema.Types.String,
      );
    });
  });

  it('should only have two fields', () => {
    const paths = Object.keys(UserSchema.paths);
    expect(paths).toHaveLength(3); // 2 defined fields + _id (added automatically by Mongoose)
    expect(paths).toEqual(
      expect.arrayContaining(['username', 'hashedPassword', '_id']),
    );
  });
});
