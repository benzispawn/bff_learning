export const homeSwaggerDoc = {
  status: 200,
  schema: {
    type: 'object',
    properties: {
      stories: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            backgroundColor: {
              type: 'string',
              description: 'Name of the story background color.',
            },
            imageName: {
              type: 'string',
              description: 'Name of the story image.',
            },
            description: {
              type: 'object',
              properties: {
                value: { type: 'string', description: 'Primary title text.' },
                typography: {
                  type: 'string',
                  description: 'Typography style for the primary title.',
                },
                replacements: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      match: {
                        type: 'string',
                        description: 'Text to be replaced.',
                      },
                      value: {
                        type: 'string',
                        description: 'Replacement text.',
                      },
                      typography: {
                        type: 'string',
                        description: 'Typography style for the replacement.',
                      },
                      color: {
                        type: 'string',
                        description: 'Color of the replacement text.',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      imageName: {
        type: 'string',
        description: 'Name of the main image.',
      },
      primarytitle: {
        type: 'object',
        properties: {
          value: { type: 'string', description: 'Primary title text.' },
          typography: {
            type: 'string',
            description: 'Typography style for the primary title.',
          },
          replacements: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                match: { type: 'string', description: 'Text to be replaced.' },
                value: { type: 'string', description: 'Replacement text.' },
                typography: {
                  type: 'string',
                  description: 'Typography style for the replacement.',
                },
                color: {
                  type: 'string',
                  description: 'Color of the replacement text.',
                },
              },
            },
          },
        },
      },
      primaryText: {
        type: 'object',
        properties: {
          value: { type: 'string', description: 'Primary text content.' },
          typography: {
            type: 'string',
            description: 'Typography style for the primary text.',
          },
          replacements: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                match: { type: 'string', description: 'Text to be replaced.' },
                value: { type: 'string', description: 'Replacement text.' },
                typography: {
                  type: 'string',
                  description: 'Typography style for the replacement.',
                },
                color: {
                  type: 'string',
                  description: 'Color of the replacement text.',
                },
              },
            },
          },
        },
      },
      secondTitle: {
        type: 'object',
        properties: {
          value: { type: 'string', description: 'Secondary title text.' },
          typography: {
            type: 'string',
            description: 'Typography style for the secondary title.',
          },
          replacements: {
            type: 'array',
            description: 'Array of replacements (if any).',
          },
        },
      },
      secondaryText: {
        type: 'object',
        properties: {
          value: { type: 'string', description: 'Secondary text content.' },
          typography: {
            type: 'string',
            description: 'Typography style for the secondary text.',
          },
          replacements: {
            type: 'array',
            description: 'Array of replacements (if any).',
          },
        },
      },
      carousel: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            imageName: {
              type: 'string',
              description: 'Name of the carousel image.',
            },
            title: {
              type: 'string',
              description: 'Title of the carousel item.',
            },
            typography: {
              type: 'string',
              description: 'Typography style for the carousel item title.',
            },
          },
        },
      },
      tertiaryText: {
        type: 'object',
        properties: {
          value: { type: 'string', description: 'Tertiary text content.' },
          typography: {
            type: 'string',
            description: 'Typography style for the tertiary text.',
          },
          replacements: {
            type: 'array',
            description: 'Array of replacements (if any).',
          },
        },
      },
      quaternaryText: {
        type: 'object',
        properties: {
          value: { type: 'string', description: 'Quaternary text content.' },
          typography: {
            type: 'string',
            description: 'Typography style for the quaternary text.',
          },
          replacements: {
            type: 'array',
            description: 'Array of replacements (if any).',
          },
        },
      },
    },
  },
};
