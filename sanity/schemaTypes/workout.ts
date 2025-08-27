import {defineField, defineType} from 'sanity'

export const workout = defineType({
  name: 'workout',
  title: 'Workout',
  type: 'document',
  fields: [
    defineField({
      name: 'userId',
      title: 'User ID',
      description: "The user's Clerk ID",
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      options: {timeStep: 60},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'durationSeconds',
      title: 'Duration (seconds)',
      type: 'number',
      validation: (Rule) => Rule.required().integer().positive(),
    }),
    defineField({
      name: 'exercises',
      title: 'Exercises',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'performedExercise',
          fields: [
            defineField({
              name: 'exercise',
              title: 'Exercise',
              type: 'reference',
              to: [{type: 'exercise'}],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'sets',
              title: 'Sets',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'set',
                  fields: [
                    defineField({
                      name: 'reps',
                      title: 'Reps',
                      type: 'number',
                      validation: (Rule) => Rule.required().integer().positive(),
                    }),
                    defineField({
                      name: 'weight',
                      title: 'Weight',
                      type: 'number',
                      description: 'Weight used for this set',
                      validation: (Rule) => Rule.required().positive(),
                    }),
                    defineField({
                      name: 'weightUnit',
                      title: 'Weight Unit',
                      type: 'string',
                      options: {
                        list: [
                          {title: 'Pounds (lbs)', value: 'lbs'},
                          {title: 'Kilograms (kg)', value: 'kg'},
                        ],
                        layout: 'radio',
                      },
                      initialValue: 'lbs',
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                  preview: {
                    select: {
                      reps: 'reps',
                      weight: 'weight',
                      unit: 'weightUnit',
                    },
                    prepare({reps, weight, unit}: {reps?: number; weight?: number; unit?: string}) {
                      const repsLabel = typeof reps === 'number' ? `${reps} reps` : 'Reps not set'
                      const weightLabel = typeof weight === 'number' ? `${weight} ${unit || ''}`.trim() : 'Weight not set'
                      return {
                        title: repsLabel,
                        subtitle: weightLabel,
                      }
                    },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: {
              exerciseName: 'exercise.name',
              sets: 'sets',
            },
            prepare({exerciseName, sets}: {exerciseName?: string; sets?: Array<unknown>}) {
              const numSets = Array.isArray(sets) ? sets.length : 0
              return {
                title: exerciseName || 'Exercise',
                subtitle: `${numSets} ${numSets === 1 ? 'set' : 'sets'}`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      date: 'date',
      duration: 'durationSeconds',
      exercises: 'exercises',
    },
    prepare(selection) {
      const {date, duration, exercises} = selection as {
        date?: string
        duration?: number
        exercises?: Array<{exercise?: {name?: string}; sets?: Array<{reps?: number; weight?: number; weightUnit?: string}>}>
      }

      const exerciseCount = Array.isArray(exercises) ? exercises.length : 0
      const minutes = typeof duration === 'number' ? Math.round(duration / 60) : undefined
      const dateStr = date ? new Date(date).toLocaleString() : 'No date'

      const title = `${dateStr}${minutes ? ` • ${minutes} min` : ''}`
      const subtitle = `${exerciseCount} ${exerciseCount === 1 ? 'exercise' : 'exercises'}`

      return {
        title,
        subtitle,
      }
    },
  },
  orderings: [
    {
      title: 'Date, newest first',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
    {
      title: 'Date, oldest first',
      name: 'dateAsc',
      by: [{field: 'date', direction: 'asc'}],
    },
  ],
})


