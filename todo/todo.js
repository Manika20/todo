var display = document.getElementById('taskinput');
var list = document.getElementById('list');
var counter = document.getElementById('counter');
var tasks =[];
function addTaskToDom(task)
{
    const li = document.createElement('li');
    li.innerHTML =`
    <input type="checkbox" class="checkbox-custom" id="${task.id}" ${task.done ? "checked" : ""} >
    <label for="${task.id}">${task.text}</label>
    <button><img src="./bin.png" class="delete" id="${task.id}"/></button>
    `;
    list.append(li);
}
function renderList()
{
    list.innerHTML="";
    for(var i=0;i<tasks.length;i++)
    {
        addTaskToDom(tasks[i]);
    }
    counter.innerHTML=tasks.length;
}
function addTask()
{
  if(task)
  {
    tasks.push(task);
    renderList();
  }
}
function deleteTask(taskId)
{
    var arr = tasks.filter((task)=>
    {
        return task.id != taskId;
    })
    tasks = arr;
    renderList();
    showNotification("Task deleted Sucessfully");
};
function toggleTask(taskId)
{
  const task = tasks.filter((task)=>{
    return taskId=== task.id;
  })
  
  if(task.length>0)
  {
   
    task[0].done = !task[0].done;
    renderList();
    showNotification("Task Toggled ");
  }
  else{
    showNotification("Task cannot be Toggled");
  }
  
};
function showNotification(string)
{
    alert(string);
}
display.addEventListener("keyup",function(e)
{
    var text;
   if(e.key==="Enter")
   {
    text=e.target.value;
    if(text==="")
    {
     showNotification("Input cannot be empty");
    }
    else
    {
        task={
            text:text,
            id: Date.now().toString(),
            done:false
           }
           addTask(task);
           showNotification("Task added succesfully");
           e.target.value="";
    }
   }
})
document.addEventListener('click',function(e)
{
     var target = e.target.className;
     if(target==="delete")
     {
        deleteTask(e.target.id);
     }

     if(target==="checkbox-custom")
     {
         
        toggleTask(e.target.id); 
     }
})