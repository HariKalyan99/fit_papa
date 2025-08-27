import {defineField, defineType} from 'sanity'

export const exercise = defineType({
  name: 'exercise',
  title: 'Exercise',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      description: 'The name of the exercise that will be displayed in the app',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'A short summary of the exercise and how it is performed',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty',
      description: 'Select the difficulty level for this exercise',
      type: 'string',
      options: {
        list: [
          {title: 'Beginner', value: 'beginner'},
          {title: 'Intermediate', value: 'intermediate'},
          {title: 'Advanced', value: 'advanced'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      description: 'An image illustrating the exercise (used in lists and details)',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt text',
          description: 'Short, accessible description of the image for screen readers',
        },
      ],
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      description: 'A link to a demo video for this exercise',
      type: 'string',
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      description: 'Toggle to show or hide this exercise in the app',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'difficulty',
      media: 'image',
    },
  },
})


