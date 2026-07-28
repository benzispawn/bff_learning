export const presentationSeed = {
  primaryText: 'We are committed to building a multicultural, inclusive company.',
  carousel: [],
  buttonText: 'Continue',
};

export async function runMigrations(presentationModel: { findOne: Function; insertMany: Function }) {
  const existing = await presentationModel.findOne({});
  if (!existing) {
    await presentationModel.insertMany([presentationSeed]);
  }
}
