import { getDatabase, ref, onValue, update } from "firebase/database";
import { Task } from "./types";

export async function getAllTasks(){
  const db = getDatabase();
  const tasksRef = ref(db, 'tasks');
  onValue(tasksRef, (snapshot) => {
    const data = snapshot.val();
    return data;
  });
}

export async function updateTask(id: string, data: Task) {
    const db = getDatabase();
    const tasksRef = ref(db, 'tasks/' + id);
    update(tasksRef, data);
 }  
    