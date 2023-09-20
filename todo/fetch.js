var display = document.getElementById('taskinput');
var list = document.getElementById('list');
var counter = document.getElementById('counter');
var tasks =[];
async function fetchData()
{
   /*fetch('https://jsonplaceholder.typicode.com/todos')
   .then((data)=>
   {
       return data.json(); //return a promise
   }).then((data)=>
   {
          tasks = data.slice(0,10);
          renderList();
   }).catch((err)=>
   {
    console.log(err);
   }) */
   try{
       const response = await fetch('https://jsonplaceholder.typicode.com/todos');
       const data = await response.json();
        tasks = data.slice(0,10);
        renderList();
   }catch(err)
   {
    console.log(err);
   }
}
function addTaskToDom(task)
{
    const li = document.createElement('li');
    li.innerHTML =`
    <input type="checkbox" class="checkbox-custom" id="${task.id}" ${task.completed ? "checked" : ""} >
    <label for="${task.id}">${task.title}</label>
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
function addTask(task)
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
        return Number(task.id) != taskId;
    })
    tasks = arr;
    renderList();
    showNotification("Task deleted Sucessfully");
};
function toggleTask(taskId)
{
  const task = tasks.filter((task)=>{
    //converting to number
    return Number(taskId)=== task.id;
  })
  
  if(task.length>0)
  {
   
    task[0].completed = !task[0].completed;
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
       var task={
            title:text,
            id: Date.now(),
            completed:false
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
fetchData();