import * as SQLite from 'expo-sqlite';
import { ReactNode } from 'react';

const db = SQLite.openDatabaseSync('census');

export interface Person {
  citizenship: string;
  householdRoles: string;
  id: number;
  firstName: string;
  lastName: string;
  date: string; // Consider using a Date type depending on your date format
  age: string;
  gender: string;
  martialStatus: string;
}

export const initializeDB = async () => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS person (
      id INTEGER PRIMARY KEY NOT NULL,
      firstName TEXT NOT NULL,
      gender TEXT NOT NULL,
      date TEXT NOT NULL,
      age TEXT NOT NULL,
      lastName TEXT NOT NULL,
      martialStatus TEXT NOT NULL
    );
  `);
};

export const addPerson = async (firstName: string, lastName: string, date: string, age: string, gender: string, maritalStatus: string, citizenship: string, householdRole: string) => {
  try {
    const result = await db.runAsync('INSERT INTO person (firstName, lastName, date, age,  gender, maritalStatus) VALUES (?, ?, ?, ?, ?, ?)', firstName, lastName, date, age, gender, maritalStatus);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error adding person:", error);
  }
};

export const updatePerson = async (id: number, firstName: string, lastName: string, date: string, age: string, gender: string, martialStatus: string, citizenship: string, householdRole: string) => {
  try {
    await db.runAsync('UPDATE person SET firstName = ?, lastName = ?, date = ?, age = ?, gender = ?, maritalStatus = ? WHERE id = ?', firstName, lastName, date, age, gender, martialStatus, id);
  } catch (error) {
    console.error("Error updating person:", error);
  }
};

export const deletePerson = async (id: number) => {
  try {
    await db.runAsync('DELETE FROM person WHERE id = ?', id);
  } catch (error) {
    console.error("Error deleting person:", error);
  }
};

export const getPersons = async () => {
  try {
    const allRows = await db.getAllAsync('SELECT * FROM person') as Person[];
    return allRows;
  } catch (error) {
    console.error("Error getting persons:", error);
    return [];
  }
};
