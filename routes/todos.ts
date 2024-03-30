import {Router} from 'express';
import {Todo} from '../models/todos'

const router=Router();

let todos:Todo[]=[]
type RequestParams={todoId:string}
type RequestBody={text:string}

router.get('/',(req, res, next)=>{
    res.status(200).json({todos:todos})

})

router.post('/todo',(req, res, next)=>{
    const body=req.body as RequestBody
    const newTodo:Todo={
        id:new Date().toISOString(),
        text:body.text 

    }

    todos.push(newTodo);
    res.status(201).json({ message: "added", todo: newTodo });
})

router.put("/todo/:todoId", (req, res, next) => {
    const params= req.params as RequestParams
    const body=req.body as RequestBody
   
    const tid = params.todoId
    const todoIndex = todos.findIndex((todoItem) => todoItem.id == tid);
    if (todoIndex >= 0) {
      todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
      return res.status(200).json({ message: "updated todo", todos: todos });
    }
    res.status(404).json({ message: "could not find" });
  });
  router.delete("/todo/:todoId", (req, res, next) => {
    const params= req.params as RequestParams
    
   
    const tid = params.todoId
     todos = todos.filter((todoItem) => todoItem.id !== tid);
   
    res.status(404).json({ message: "item is deleted" });
  });


export default Router;