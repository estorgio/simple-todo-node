import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import Todo from '../models/todo-model.js';

export const index = async (req, res) => {
  const todos = await Todo.find({});

  res.render('main/index', { todos });
};

export const create = async (req, res) => {
  res.render('main/create');
};

export const store = async (req, res) => {
  try {
    const { text } = req.body ?? {};
    const todo = await Todo.create({
      text,
    });
    console.log('New todo inserted:', todo);
    res.redirect('/');
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      console.error(error);
      req.flash('error', error);
      res.redirect('/create');
    } else {
      throw error;
    }
  }
};

export const edit = async (req, res, next) => {
  const { todoID } = req.params;
  const todo = await Todo.findById(todoID).exec();

  if (!todo) {
    // Skip route and display 404 not found
    return next('route');
  }

  res.render('main/edit', { todo });
};

export const update = async (req, res, next) => {
  const { todoID } = req.params;
  const { text, isDone } = req.body ?? {};
  try {
    const todo = await Todo.findById(todoID).exec();

    if (!todo) {
      // Skip route and display 404 not found
      return next('route');
    }

    if (!(text === null || text === undefined)) todo.text = text;
    if (!(isDone === null || isDone === undefined)) todo.isDone = isDone;
    await todo.save();

    res.redirect('/');
  } catch (error) {
    console.error(error);
    if (error instanceof mongoose.Error.ValidationError) {
      req.flash('error', error);
      res.redirect(`${todoID}/edit`);
    } else {
      throw error;
    }
  }
};

export const _delete = async (req, res, next) => {
  const { todoID } = req.params;
  const { text, isDone } = req.body ?? {};

  const todo_delete = await Todo.findByIdAndDelete(todoID).exec();
  console.log(todo_delete);

  res.redirect('/');
};

export const errorTest = (req, res) => {
  throw new Error('Test error here');
};
