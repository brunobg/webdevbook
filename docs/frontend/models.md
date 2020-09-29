# Models and collections

The larger your application are, the more types of objects you'll have. It's wise to use a model system in the frontend, and not only the backend. This makes it easier to manage data and view it, and scales as your application grows.

In general the operations you have with a model are CRUD:

- create a model
- read a model
- update a model
- delete a model

This translates, in the frontend, to four view components per model, each on the `[Typename]` directory in `src/components`:

- View.vue: view details
- Card.vue: a card (summary) for collection views
- List.vue: the actual collection view, a list of cards, which might have filters and sort models
- Edit.vue: the creation form (used for creating and updating)

Deletion is often made through a button in one of the components, so it doesn't require a separate component for itself. We'll structure our application with this set of view components for each model.

## Models

There is a [project called VueMC](https://vuemc.io) with a structure for models and collections compatible with Vue if you are looking for a ready-made solution. We'll design our model class from scratch

TODO

## Forms

TODO

## Validation

Vue has several libs for form validation.

# Collections

TODO
