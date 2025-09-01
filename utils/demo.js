import mongoose from 'mongoose';
import Todo from '../models/todo-model.js';

export async function initDemo() {
  if (process.env.NODE_ENV === 'development') return;

  // Wipe todos
  await Todo.deleteMany({});

  await Todo.create({
    text: 'Hello world!',
  });
}
